import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

interface EditPostProps {
  postId: string
  initialContent: string
  open: boolean
  onClose: () => void
  onConfirm: (postId: string, content: string) => Promise<void>
  loading: boolean
}

export default function EditPost({
  postId,
  initialContent,
  open,
  onClose,
  onConfirm,
  loading,
}: EditPostProps) {
  const [content, setContent] = useState(initialContent)

  const handleUpdate = async () => {
    await onConfirm(postId, content)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <div className='space-y-3'>
          <Input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Update your post...'
          />
        </div>
        <DialogFooter>
          <Button variant='secondary' onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

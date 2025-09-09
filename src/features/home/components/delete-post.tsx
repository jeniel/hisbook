import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

interface DeletePostProps {
  postId: string
  open: boolean
  onClose: () => void
  onConfirm: (postId: string) => Promise<void>
  loading: boolean
}

export default function DeletePost({ 
  postId, 
  open, 
  onClose, 
  onConfirm, 
  loading 
}: DeletePostProps) {
  const handleDelete = async () => {
    await onConfirm(postId)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Delete Post</DialogTitle>
        </DialogHeader>
        <p className='text-sm text-gray-600'>
          Are you sure you want to delete this post? This action cannot be
          undone.
        </p>
        <DialogFooter>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

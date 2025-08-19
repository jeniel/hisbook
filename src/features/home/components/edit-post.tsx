/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { UPDATE_POST } from '@/graphql/operation/mutation/post'
import { GET_POSTS } from '@/graphql/operation/query/posts'
import { useMutation } from '@apollo/client'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Mutation } from '@/graphql/codegen/graphql'

interface EditPostProps {
  postId: string
  initialContent: string
  open: boolean
  onClose: () => void
}

export default function EditPost({
  postId,
  initialContent,
  open,
  onClose,
}: EditPostProps) {
  const [content, setContent] = useState(initialContent)
  const [updatePost, { loading }] = useMutation<Mutation>(UPDATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  })

  const handleUpdate = async () => {
    try {
      await updatePost({
        variables: { postId, data: { content } },
      })
      toast.success('Post updated successfully')
      onClose()
    } catch (error) {
      toast.error('Failed to update ticket')
    }
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

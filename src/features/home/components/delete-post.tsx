import { DELETE_POST } from '@/graphql/operation/mutation/post'
import { GET_POSTS } from '@/graphql/operation/query/posts'
import { useMutation } from '@apollo/client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { Mutation } from '@/graphql/codegen/graphql'

interface DeletePostProps {
  postId: string
  open: boolean
  onClose: () => void
}

export default function DeletePost({ postId, open, onClose }: DeletePostProps) {
  const [deletePost, { loading }] = useMutation<Mutation>(DELETE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  })

  const handleDelete = async () => {
    try {
      await deletePost({ variables: { postId } })
      toast.error('Post deleted')
      onClose()
    } catch (_error) {
      toast.error("Failed to delete post");
    }
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

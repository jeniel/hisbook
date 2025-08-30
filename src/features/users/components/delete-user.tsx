import { useState } from 'react'
import { Mutation } from '@/graphql/codegen/graphql'
import { DELETE_USER } from '@/graphql/operation/mutation/user'
import { useMutation } from '@apollo/client'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'

// Props
type DeleteUserProps = {
  user: { id: string; username: string }
  onDelete?: () => void
}

export default function DeleteUser({ user, onDelete }: DeleteUserProps) {
  const [open, setOpen] = useState(false)
  const [deleteUserMutation] = useMutation<Mutation>(DELETE_USER)

  const handleDelete = async () => {
    try {
      await deleteUserMutation({
        variables: { deleteUserId: user.id },
      })

      toast.error('User deleted')
      if (onDelete) onDelete()
      setOpen(false)
    } catch (_error) {
      toast.error('Failed to delete user')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'} size='sm'>
          <Trash2 className='text-red-500' />
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-sm'>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{' '}
            <span className='font-semibold'>{user.username}</span>? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='flex justify-end gap-2'>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

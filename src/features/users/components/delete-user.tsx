import { useState } from 'react'
import { Trash2 } from 'lucide-react'
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
import useUserMutation from '../hooks/useUserMutation'

// Props
type DeleteUserProps = {
  user: { id: string; username: string }
  onDelete?: () => void
}

export default function DeleteUser({ user, onDelete }: DeleteUserProps) {
  const [open, setOpen] = useState(false)
  const { deleteUser, deleting } = useUserMutation(onDelete)

  const handleDelete = async () => {
    await deleteUser(user.id)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm' disabled={deleting}>
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
          <Button onClick={handleDelete} disabled={deleting}>
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

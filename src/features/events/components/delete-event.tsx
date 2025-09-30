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
import useEventsMutation from '../hooks/useEventMutation'

interface DeleteEventProps {
  event: { id: string; title: string }
  onDeleted?: () => void
}

export default function DeleteEvent({ event, onDeleted }: DeleteEventProps) {
  const [open, setOpen] = useState(false)
  const { deleteEvent, deleting } = useEventsMutation(onDeleted)

  const handleDelete = async () => {
    await deleteEvent(event.id)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>
        <Button variant={'outline'} size='sm'>
          <Trash2 className='text-red-500' />
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-sm' aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Delete Event</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{' '}
            <span className='font-semibold'>{event.title}</span>? This action
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

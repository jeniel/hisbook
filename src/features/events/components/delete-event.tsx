import { useState } from 'react'
import { Mutation } from '@/graphql/codegen/graphql'
import { DELETE_EVENT } from '@/graphql/operation/mutation/event'
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

interface DeleteEventProps {
  event: { id: string; title: string }
  onDelete?: () => void
}

export default function DeleteEvent({ event, onDelete }: DeleteEventProps) {
  const [open, setOpen] = useState(false)
  const [deleteEvent] = useMutation<Mutation>(DELETE_EVENT)

  const handleDelete = async () => {
    try {
      await deleteEvent({
        variables: { deleteEventId: event.id },
      })

      toast.error('Event deleted')
      if (onDelete) onDelete()
      setOpen(false)
    } catch (_error) {
      toast.error('Failed to delete event')
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
          <Button onClick={handleDelete}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useTicket } from '@/hooks/useTicket'
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

type DeleteTicketProps = {
  ticketId: string
  onDelete?: () => void
}

export default function DeleteTicket({
  ticketId,
  onDelete,
}: DeleteTicketProps) {
  const [open, setOpen] = useState(false)
  const { deleteTicket } = useTicket({}) // only use mutation here

  const handleDelete = async () => {
    try {
      await deleteTicket(ticketId)

      toast.success(`Ticket successfully deleted`)
      if (onDelete) onDelete() // trigger parent refetch
      setOpen(false)
    } catch (_error) {
      toast.error('Failed to delete ticket')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <Trash2 className='text-red-500' />
        </Button>
      </DialogTrigger>

      <DialogContent className='max-h-[90vh] w-full max-w-lg overflow-y-auto sm:max-w-2xl lg:max-w-4xl'>
        <DialogHeader>
          <DialogTitle>Delete Ticket</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this ticket? This cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='flex justify-end gap-2'>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleDelete} className='bg-red-600 text-white'>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

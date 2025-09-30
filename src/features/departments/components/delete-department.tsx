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
import useDepartmentsMutation from '../hooks/useDepartmentsMutation'

type DeleteDepartmentProps = {
  department: { id: string; name: string }
  onDeleted?: () => void
}

export default function DeleteDepartment({
  department,
  onDeleted,
}: DeleteDepartmentProps) {
  const [open, setOpen] = useState(false)
  const { deleteDepartment, deleting } = useDepartmentsMutation(onDeleted)

  const handleDelete = async () => {
    await deleteDepartment(department.id)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>
        <Button variant='destructive' size='sm'>
          <Trash2 />
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-sm' aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Delete Department</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{' '}
            <span className='font-semibold'>{department.name}</span>? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='flex justify-end gap-2'>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant='destructive'
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

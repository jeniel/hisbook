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
import useDepartments from '../hooks/useDepartments'

type DeleteDepartmentProps = {
  department: { id: string; name: string }
  onDelete?: () => void
}

export default function DeleteDepartment({
  department,
  onDelete,
}: DeleteDepartmentProps) {
  const [open, setOpen] = useState(false)
  const { deleteDepartment, deleting } = useDepartments()

  const handleDelete = async () => {
    await deleteDepartment(department.id)
    if (onDelete) onDelete()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='destructive' size='sm'>
          <Trash2 />
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-sm'>
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

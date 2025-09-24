import { useState } from 'react'
import { Mutation } from '@/graphql/codegen/graphql'
import { DELETE_DEPARTMENT } from '@/graphql/operation/mutation/department'
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
type DeleteDepartmentProps = {
  department: { id: string; name: string }
  onDelete?: () => void
}

export default function DeleteDepartment({
  department,
  onDelete,
}: DeleteDepartmentProps) {
  const [open, setOpen] = useState(false)
  const [deleteDepartment] = useMutation<Mutation>(DELETE_DEPARTMENT)

  // Delete Functionality
  const handleDelete = async () => {
    try {
      await deleteDepartment({
        variables: { deleteDepartmentId: department.id },
      })

      toast.error('Department deleted')
      if (onDelete) onDelete()
      setOpen(false)
    } catch (_error) {
      toast.error('Failed to delete department')
    }
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
          <Button onClick={handleDelete}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

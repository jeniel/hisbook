import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { PencilLine } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import useDepartmentsMutation, {
  DepartmentPayload,
} from '../hooks/useDepartmentsMutation'

// Props
type EditDepartmentProps = {
  department: {
    id: string
    name: string
    description: string
    isSupport?: boolean
  }
  onUpdated?: () => void
}

export default function EditDepartment({
  department,
  onUpdated,
}: EditDepartmentProps) {
  const [open, setOpen] = useState(false)

  const { updateDepartment, updating } = useDepartmentsMutation(onUpdated)

  const form = useForm<DepartmentPayload>({
    defaultValues: {
      name: department.name,
      description: department.description,
      isSupport: department.isSupport ?? false,
    },
  })

  const onSubmit = async (data: DepartmentPayload) => {
    try {
      await updateDepartment(department.id, data)
      setOpen(false)
    } catch {
      toast.error('Failed to update department')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <PencilLine className='text-blue-500' /> Edit
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-md' aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Edit Department</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          {/* Name */}
          <div className='space-y-2'>
            <Label>Department Name</Label>
            <Input {...form.register('name')} />
          </div>

          {/* Description */}
          <div className='space-y-2'>
            <Label>Description</Label>
            <Input {...form.register('description')} />
          </div>

          {/* Is Support */}
          <div className='flex items-center justify-between'>
            <Label>Is Support Department?</Label>
            <Controller
              control={form.control}
              name='isSupport'
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          <Button type='submit' className='w-full' disabled={updating}>
            {updating ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

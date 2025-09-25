import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Building2, SquareCheckBig } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useDepartments from '../hooks/useDepartments'

// ✅ Schema
const FormSchema = z.object({
  department: z.string().min(1, { message: 'Department is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
})

interface CreateDepartmentProps {
  onCreated: () => void
}

export default function CreateDepartment({ onCreated }: CreateDepartmentProps) {
  const [open, setOpen] = useState(false)
  const { createDepartment, creating } = useDepartments()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { department: '', description: '' },
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await createDepartment({
      name: data.department,
      description: data.description,
    })
    form.reset()
    setOpen(false)
    onCreated()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className='flex items-center gap-2 font-semibold'
          variant='outline'
        >
          <Building2 className='h-5 w-5 text-purple-500' />
          Create
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>Create New Department</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='department'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input placeholder='MIS' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='MANAGEMENT INFORMATION SYSTEM'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className='flex justify-end'>
              <Button
                type='submit'
                className='flex items-center gap-2'
                variant='outline'
                disabled={creating}
              >
                <SquareCheckBig className='h-4 w-4 text-green-500' />
                {creating ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

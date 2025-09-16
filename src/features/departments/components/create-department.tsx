import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mutation } from '@/graphql/codegen/graphql'
import { CREATE_DEPARTMENT } from '@/graphql/operation/mutation/department'
import { FIND_ALL_DEPARTMENTS } from '@/graphql/operation/query/department'
import { useMutation } from '@apollo/client'
import { Building2, SquareCheckBig } from 'lucide-react'
import { toast } from 'sonner'
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

// Input Validation
const FormSchema = z.object({
  department: z.string().min(1, { message: 'Department is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
})

export default function CreateDepartment() {
  const [open, setOpen] = useState(false)

  const [createDepartment] = useMutation<Mutation>(CREATE_DEPARTMENT, {
    refetchQueries: [FIND_ALL_DEPARTMENTS], // After Submiting Refetch
    awaitRefetchQueries: true,
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      department: '',
      description: '',
    },
  })

  // Submit Functionality
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await createDepartment({
        variables: {
          payload: {
            name: data.department,
            description: data.description,
          },
        },
      })

      toast.success(res.data?.createDepartment?.message ?? 'Department created')
      form.reset()
      setOpen(false) // close modal after success
    } catch (_error) {
      toast.error('Failed to Create Department')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className='flex items-center gap-2 font-semibold'
          variant={'outline'}
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
                    <Input
                      placeholder='MIS'
                      {...field}
                      value={field.value || ''}
                    />
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
                      value={field.value || ''}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Submit button spans full width */}
            <div className='flex justify-end md:col-span-2'>
              <Button
                type='submit'
                className='flex items-center gap-2'
                variant={'outline'}
              >
                <SquareCheckBig className='h-4 w-4 text-green-500' />
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

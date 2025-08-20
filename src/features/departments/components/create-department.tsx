/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mutation } from '@/graphql/codegen/graphql'
import { CREATE_DEPARTMENT } from '@/graphql/operation/mutation/department'
import { useMutation } from '@apollo/client'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
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
  const [createDepartment] = useMutation<Mutation>(CREATE_DEPARTMENT)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      department: '',
      description: '',
    },
  })

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
    } catch (error) {
      toast.error('Failed to Create Department')
    }
  }

  return (
    <>
      <p className='text-lg font-semibold mb-4'>Create New Department</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='max-w-4xl space-y-6'
        >
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
                    placeholder='Management Information System'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </>
  )
}

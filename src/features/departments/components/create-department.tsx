import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mutation } from '@/graphql/codegen/graphql'
import { CREATE_DEPARTMENT } from '@/graphql/operation/mutation/department'
import { FIND_ALL_DEPARTMENTS } from '@/graphql/operation/query/department'
import { useMutation } from '@apollo/client'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
    } catch (_error) {
      toast.error('Failed to Create Department')
    }
  }

  return (
    <>
      <Card>
        <CardContent>
          <p className='mb-4 text-lg font-semibold'>
            ➕ Create A New Department
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='grid grid-cols-1 gap-6 md:grid-cols-2'
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

              {/* Submit button spans full width */}
              <div className='md:col-span-2'>
                <Button variant='outline' type='submit'>
                  ✅ Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}

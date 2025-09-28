import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Building2, SquareCheckBig } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import useDepartmentsMutation from '../hooks/useDepartmentsMutation'

// ✅ Schema
const FormSchema = z.object({
  department: z.string().min(1, { message: 'Department is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  isSupport: z.boolean(),
})

type CreateDepartmentProps = {
  onCreated?: () => void
}

export default function CreateDepartment({ onCreated }: CreateDepartmentProps) {
  const { createDepartment, creating } = useDepartmentsMutation(onCreated)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { department: '', description: '', isSupport: false },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const payload = {
        name: data.department,
        description: data.description,
        isSupport: data.isSupport,
      }

      await createDepartment(payload)
      form.reset()
    } catch {
      toast.error('Failed to create Department')
    }
  }

  return (
    <Card className='shadow-sm'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-lg font-semibold'>
          <Building2 className='h-5 w-5 text-purple-500' />
          Create New Department
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {/* Department Name */}
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

            {/* Description */}
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

            {/* Is Support */}
            <FormField
              control={form.control}
              name='isSupport'
              render={() => (
                <FormItem className='flex items-center justify-between'>
                  <FormLabel>Is Support Department?</FormLabel>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name='isSupport'
                      render={({ field: switchField }) => (
                        <Switch
                          checked={switchField.value}
                          onCheckedChange={switchField.onChange}
                        />
                      )}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Submit Button */}
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
      </CardContent>
    </Card>
  )
}

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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

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
      setOpen(false) // auto-close after success
    } catch (_error) {
      toast.error('Failed to Create Department')
    }
  }

  return (
    <Card>
      <CardContent>
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-between text-lg font-semibold"
            >
              <span>➕ Create A New Department</span>
              {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-6 md:grid-cols-2"
              >
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input placeholder="MIS" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Management Information System"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Submit button spans full width */}
                <div className="md:col-span-2">
                  <Button variant="outline" type="submit">
                    ✅ Submit
                  </Button>
                </div>
              </form>
            </Form>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}

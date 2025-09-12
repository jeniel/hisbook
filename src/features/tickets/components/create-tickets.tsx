/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Status } from '@/graphql/codegen/graphql'
import { FIND_ALL_DEPARTMENTS } from '@/graphql/operation/query/department'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useQuery } from '@apollo/client'
import { ChevronDown, ChevronRight, SquareCheckBig } from 'lucide-react'
import { toast } from 'sonner'
import { useTicket } from '@/hooks/useTicket'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import Spinner from '@/components/spinner'

// Input Validation
const TicketSchema = z.object({
  floor: z.string().min(1, { message: 'Location is required' }),
  subject: z.string().min(1, { message: 'Subject is required' }),
  message: z.string().optional(),
  departmentId: z.string().min(1, { message: 'Department is required' }),
})

export default function CreateTickets() {
  const [open, setOpen] = useState(false)

  const { createTicket } = useTicket({
    departmentId: '',
    page: 1,
    perPage: 1,
  })

  // ✅ Queries
  const { data: meData, loading: meLoading } = useQuery(ME_QUERY)
  const { data: deptData, loading: deptLoading } = useQuery(
    FIND_ALL_DEPARTMENTS,
    {
      variables: { page: 1, perPage: 50 }, // get enough to filter from
    }
  )

  const user = meData?.meQuery?.user
  const userId = user?.id

  // ✅ Filter only HR, ENGR, MIS
  const allowed = ['HR', 'ENGR', 'MIS']
  const departments =
    deptData?.findAllDepartments?.data?.filter((dept: any) =>
      allowed.includes(dept.name)
    ) || []

  const form = useForm<z.infer<typeof TicketSchema>>({
    resolver: zodResolver(TicketSchema),
    defaultValues: {
      subject: '',
      floor: '',
      message: '',
      departmentId: '',
    },
  })

  async function onSubmit(data: z.infer<typeof TicketSchema>) {
    if (!userId) {
      toast.error('User not found. Please log in again.')
      return
    }

    try {
      await createTicket({
        subject: data.subject,
        floor: data.floor,
        screenshot: null,
        status: Status.Pending,
        createdById: userId,
        message: data.message,
        departmentId: data.departmentId,
      })

      toast.success('Ticket Created')
      form.reset()
      setOpen(false)
    } catch (_error) {
      toast.error('Failed to create ticket')
    }
  }

  if (meLoading || deptLoading) return <Spinner />

  return (
    <Card>
      <CardContent>
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant='ghost'
              className='flex w-full items-center justify-between text-lg font-semibold'
            >
              <span>Create Ticket / Request A Service</span>
              {open ? (
                <ChevronDown className='h-4 w-4' />
              ) : (
                <ChevronRight className='h-4 w-4' />
              )}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className='data-[state=open]:animate-collapse-down data-[state=closed]:animate-collapse-up mt-4 overflow-hidden transition-all'>
            {/* Instructions */}
            <div className='mb-4 border-b border-b-gray-500'>
              <p className='font-bold'>Instructions:</p>
              <p className='mb-4 text-sm italic'>
                Please fill out the form carefully. Use the{' '}
                <strong>Subject</strong> field to briefly describe your request
                or issue.
                <br />
                Select the correct <strong>Department</strong> (HR, Engineering,
                or MIS) so your request is routed properly.
                <br />
                <br />
                Note: Once the form is submitted, you cannot edit it again.
              </p>
            </div>

            <p className='mb-2 text-lg'>
              <span className='font-medium'>Requested by:</span>{' '}
              {user?.profile?.firstName} {user?.profile?.lastName}
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-2'
              >
                <div className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='subject'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='e.g. CCTV Review, Aircon Leaking, Printer Issue'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='floor'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location / Department</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='e.g. 8th Floor, ER, Basement 1'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='departmentId'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Send to Department</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Select Department' />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept: any) => (
                              <SelectItem key={dept.id} value={dept.id}>
                                {dept.name} - {dept.description}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name='message'
                  render={({ field }) => (
                    <FormItem className='mb-4'>
                      <FormLabel>Message (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Additional details or context'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  variant='outline'
                  type='submit'
                  className='mb-4 shadow-md'
                >
                  <SquareCheckBig className='text-green-500' /> Submit
                </Button>
              </form>
            </Form>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}

import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mutation, Status } from '@/graphql/codegen/graphql'
import { CREATE_TICKET } from '@/graphql/operation/mutation/ticket'
import { FIND_ALL_TICKETS_BY_USER } from '@/graphql/operation/query/ticket'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useMutation, useQuery } from '@apollo/client'
import { ChevronDown, ChevronRight, SquareCheckBig } from 'lucide-react'
import { toast } from 'sonner'
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
import Spinner from '@/components/spinner'

// Department select
const departments = [
  {
    id: '12396f13-00d2-4865-8964-9babd9aa11d1',
    name: 'HR',
    description: 'Human Resources',
  },
  {
    id: '51f3fb0d-037d-4791-ada9-48d3c2b18ff9',
    name: 'ENGR',
    description: 'Engineering and Maintenance',
  },
  {
    id: 'fcd8ef97-9612-45d2-9afe-05c1d1e266b3',
    name: 'MIS',
    description: 'Management Information System',
  },
]

// Input Validation
const TicketSchema = z.object({
  date: z.string().min(1, { message: 'Date is required' }),
  floor: z.string().min(1, { message: 'Location is required' }),
  subject: z.string().min(1, { message: 'Subject is required' }),
  remarks: z.string().optional(),
  departmentId: z.string().min(1, { message: 'Department is required' }),
})

export default function CreateTickets() {
  const [open, setOpen] = useState(false)
  const [createTicket] = useMutation<Mutation>(CREATE_TICKET, {
    refetchQueries: [FIND_ALL_TICKETS_BY_USER],
    awaitRefetchQueries: true,
  })

  const { data: meData, loading: meLoading } = useQuery(ME_QUERY)
  const user = meData?.meQuery?.user
  const userId = user?.id

  const form = useForm<z.infer<typeof TicketSchema>>({
    resolver: zodResolver(TicketSchema),
    defaultValues: {
      subject: '',
      date: '',
      floor: '',
      remarks: '',
      departmentId: '',
    },
  })

  // Submit Functionality
  async function onSubmit(data: z.infer<typeof TicketSchema>) {
    if (!userId) {
      toast.error('User not found. Please log in again.')
      return
    }

    try {
      await createTicket({
        variables: {
          payload: {
            missedAt: data.date,
            subject: data.subject,
            floor: data.floor,
            screenshot: null,
            status: Status.Pending,
            createdById: userId,
            remarks: data.remarks,
            departmentId: data.departmentId,
          },
        },
      })

      toast.success('Ticket Created')
      form.reset()
      setOpen(false)
    } catch (_error) {
      toast.error('Failed to create ticket')
    }
  }

  if (meLoading) return <Spinner />

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
            <p className='mb-2 text-lg'>
              <span className='font-medium'>Requested By:</span>{' '}
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
                    name='date'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
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
                            {departments.map((dept) => (
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
                  name='remarks'
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

                {/* Instructions */}
                <p className='font-bold'>Instructions:</p>
                <p className='mb-4 text-sm italic'>
                  Please fill out the form carefully. Use the{' '}
                  <strong>Subject</strong> field to briefly describe your
                  request or issue (e.g., <em>"CCTV Review"</em>,{' '}
                  <em>"Aircon Leaking"</em>, <em>"Printer Not Working"</em>).
                  <br />
                  Select the correct <strong>Department</strong> (HR,
                  Engineering, or MIS) so your request is routed properly.
                  <br />
                  <br />
                  Note: Once the form is submitted, you cannot edit it again.
                  Please double check your details before submitting.
                </p>
              </form>
            </Form>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}

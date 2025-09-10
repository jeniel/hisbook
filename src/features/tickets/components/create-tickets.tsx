import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
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

// Input Validation
const TicketSchema = z.object({
  time: z.string().min(1, { message: 'Time is required' }),
  date: z.string().min(1, { message: 'Date is required' }),
  floor: z.string().min(1, { message: 'Floor is required' }),
  subject: z.string().optional(),
  remarks: z.string().optional(),
})

export default function CreateTickets() {
  const [open, setOpen] = useState(false)
  const [createTicket] = useMutation<Mutation>(CREATE_TICKET, {
    refetchQueries: [FIND_ALL_TICKETS_BY_USER], // After Submiting Refetch
    awaitRefetchQueries: true,
  })

  const { data: meData, loading: meLoading } = useQuery(ME_QUERY)
  const user = meData?.meQuery?.user
  const userId = user?.id

  const form = useForm<z.infer<typeof TicketSchema>>({
    resolver: zodResolver(TicketSchema),
    defaultValues: {
      subject: '',
      time: '',
      date: '',
      floor: '',
      remarks: '',
    },
  })

  // Submit Functionality
  async function onSubmit(data: z.infer<typeof TicketSchema>) {
    if (!userId) {
      toast.error('User not found. Please log in again.')
      return
    }

    try {
      const missedAt = `${data.date}T${data.time}`
      await createTicket({
        variables: {
          payload: {
            missedAt,
            subject: data.subject,
            floor: data.floor,
            screenshot: null,
            status: Status.Pending,
            createdById: userId,
            remarks: data.remarks,
          },
        },
      })

      toast.success('Ticket Created')
      form.reset()
      setOpen(false) // auto-close after success
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
              <span>Create Ticket</span>
              {open ? (
                <ChevronDown className='h-4 w-4' />
              ) : (
                <ChevronRight className='h-4 w-4' />
              )}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className='data-[state=open]:animate-collapse-down data-[state=closed]:animate-collapse-up mt-4 overflow-hidden transition-all'>
            <p className='mb-2 text-lg'>
              <span className='font-medium'>Name:</span>{' '}
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
                            placeholder='e.g. CCTV Review, Confidential'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='time'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time of Missed Log</FormLabel>
                        <FormControl>
                          <Input type='time' {...field} />
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
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder='e.g. 8th, ER or B1' {...field} />
                        </FormControl>
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
                      <FormLabel>Message</FormLabel>
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

                <Button variant='outline' type='submit' className='shadow-md'>
                  <SquareCheckBig className='text-green-500' /> Submit
                </Button>
                <p className='mb-4 text-sm italic'>
                  Note: Once a ticket is submitted you cannot edit it. Please
                  double check.
                </p>
              </form>
            </Form>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}

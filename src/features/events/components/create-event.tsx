import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mutation } from '@/graphql/codegen/graphql'
import { CREATE_EVENT } from '@/graphql/operation/mutation/event'
import { GET_ALL_EVENT } from '@/graphql/operation/query/event'
import { useMutation } from '@apollo/client'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

// Validation Schema
const FormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  startDate: z.string().min(1, { message: 'Start Date is required' }),
  endDate: z.string().optional().or(z.literal('')),
  detailsUrl: z.string().optional().or(z.literal('')),
})

export default function CreateEvent() {
  const [open, setOpen] = useState(false)

  const [createEvent] = useMutation<Mutation>(CREATE_EVENT, {
    refetchQueries: [GET_ALL_EVENT], // After Submiting Refetch
    awaitRefetchQueries: true,
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      location: '',
      startDate: '',
      endDate: '',
      detailsUrl: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const payload = {
        ...data,
        endDate: data.endDate || undefined, // convert empty string to undefined
        detailsUrl: data.detailsUrl || undefined, // convert empty string to undefined
      }

      const res = await createEvent({
        variables: { payload },
      })

      toast.success(res.data?.createEvent?.message ?? 'Event created')
      form.reset()
      setOpen(false)
    } catch (_error) {
      toast.error('Failed to create Event')
    }
  }

  return (
    <Card>
      <CardContent>
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant='ghost'
              className='flex w-full items-center justify-between text-lg font-semibold'
            >
              <span>➕ Create A New Event</span>
              {open ? (
                <ChevronDown className='h-4 w-4' />
              ) : (
                <ChevronRight className='h-4 w-4' />
              )}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className='mt-4'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='grid grid-cols-1 gap-6 md:grid-cols-2'
              >
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder='Christmas Party' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='location'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder='ACE' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='startDate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input
                          type='date'
                          placeholder='August 4, 2025'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='endDate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type='date'
                          placeholder='August 7, 2025'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='detailsUrl'
                  render={({ field }) => (
                    <FormItem className='md:col-span-2'>
                      <FormLabel>Details URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder='https://google.com' {...field} />
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
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}

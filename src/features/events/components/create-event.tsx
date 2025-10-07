import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SquareCheckBig, CalendarPlus } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useEventsMutation from '../hooks/useEventMutation'

const FormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  startDate: z.string().min(1, { message: 'Start Date is required' }),
  endDate: z.string().optional().or(z.literal('')),
  detailsUrl: z.string().optional().or(z.literal('')),
})

type CreateEventProps = {
  onCreated?: () => void
}

export default function CreateEvent({ onCreated }: CreateEventProps) {
  const { createEvent, creating } = useEventsMutation(onCreated)
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
        endDate: data.endDate || undefined,
        detailsUrl: data.detailsUrl || undefined,
      }

      await createEvent(payload)
      form.reset()
    } catch {
      toast.error('Failed to create Event')
    }
  }

  return (
    <Card className='shadow-md'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <CalendarPlus className='text-primary h-6 w-6' />
          Create New Event
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {/* Title */}
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Christmas Party' {...field} />
                  </FormControl>
                  <FormMessage /> {/* ✅ Shows "Title is required" */}
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder='ACE' {...field} />
                  </FormControl>
                  <FormMessage /> {/* ✅ Shows "Location is required" */}
                </FormItem>
              )}
            />

            {/* Start Date */}
            <FormField
              control={form.control}
              name='startDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type='date' {...field} />
                  </FormControl>
                  <FormMessage /> {/* ✅ Shows "Start Date is required" */}
                </FormItem>
              )}
            />

            {/* End Date */}
            <FormField
              control={form.control}
              name='endDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date (Optional)</FormLabel>
                  <FormControl>
                    <Input type='date' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Details URL */}
            <FormField
              control={form.control}
              name='detailsUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details URL (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='https://google.com'
                      {...field}
                      className='lowercase'
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='w-full shadow-md'
              disabled={creating}
            >
              <SquareCheckBig className='h-4 w-4' />
              {creating ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

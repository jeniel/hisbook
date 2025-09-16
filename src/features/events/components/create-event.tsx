import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mutation } from '@/graphql/codegen/graphql'
import { CREATE_EVENT } from '@/graphql/operation/mutation/event'
import { GET_ALL_EVENT } from '@/graphql/operation/query/event'
import { useMutation } from '@apollo/client'
import { CalendarPlus, SquareCheckBig } from 'lucide-react'
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
    refetchQueries: [GET_ALL_EVENT],
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
        endDate: data.endDate || undefined,
        detailsUrl: data.detailsUrl || undefined,
      }

      const res = await createEvent({ variables: { payload } })

      toast.success(res.data?.createEvent?.message ?? 'Event created')
      form.reset()
      setOpen(false)
    } catch {
      toast.error('Failed to create Event')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='flex items-center gap-2' variant={'outline'}>
          <CalendarPlus className='h-5 w-5 text-red-500' />
          Create
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
        </DialogHeader>

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
                    <Input
                      placeholder='CHRISTMAS PARTY'
                      {...field}
                      value={field.value?.toUpperCase() || ''}
                      onChange={(e) =>
                        field.onChange(e.target.value.toUpperCase())
                      }
                      className='uppercase'
                    />
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
                    <Input
                      placeholder='ACE'
                      {...field}
                      value={field.value?.toUpperCase() || ''}
                      onChange={(e) =>
                        field.onChange(e.target.value.toUpperCase())
                      }
                      className='uppercase'
                    />
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
                    <Input type='date' {...field} />
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
                    <Input type='date' {...field} />
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
                    <Input
                      placeholder='https://google.com'
                      {...field}
                      className='lowercase'
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className='md:col-span-2'>
              <Button variant='outline' type='submit' className='shadow-md'>
                <SquareCheckBig className='mr-2 text-green-500' />
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

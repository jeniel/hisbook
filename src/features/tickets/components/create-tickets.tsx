import { useState, useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Status } from '@/graphql/codegen/graphql'
import { Send, TicketPlus } from 'lucide-react'
import { toast } from 'sonner'
import useDepartments from '@/hooks/useDepartmentDropdown'
import useMeQuery from '@/hooks/useMeQuery'
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
import { Textarea } from '@/components/ui/textarea'
import useTicketMutation from '../hooks/useTicketMutation'

// ---------------- Validation ----------------
const TicketSchema = z.object({
  floor: z.string().min(1, { message: 'Location is required' }),
  subject: z.string().min(1, { message: 'Subject is required' }),
  message: z.string().optional(),
  departmentId: z.string().min(1, { message: 'Department is required' }),
})

type CreateTicketProps = {
  onCreated?: () => void
}

export default function CreateTickets({ onCreated }: CreateTicketProps) {
  const [open, setOpen] = useState(false)

  // Hooks
  const { createTicket, creating } = useTicketMutation(onCreated)
  const { user, userId } = useMeQuery()
  const { fetchDepartments, departments } = useDepartments({
    onlySupport: true,
  })

  useEffect(() => {
    if (open) {
      fetchDepartments()
    }
  }, [open, fetchDepartments])

  const form = useForm<z.infer<typeof TicketSchema>>({
    resolver: zodResolver(TicketSchema),
    defaultValues: {
      subject: '',
      floor: '',
      message: '',
      departmentId: '',
    },
  })

  // ---------------- Submit ----------------
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
      form.reset()
      setOpen(false)
    } catch (_error) {
      toast.error('Failed to create ticket')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className='flex items-center gap-2 font-semibold'
          variant='outline'
        >
          <TicketPlus className='h-5 w-5 text-green-500' />
          Create Ticket
        </Button>
      </DialogTrigger>

      <DialogContent
        className='max-h-[90vh] max-w-6xl overflow-y-auto'
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>Create Ticket</DialogTitle>
        </DialogHeader>

        <p className='mb-4 text-sm italic'>
          Please fill out the form carefully. Use the <strong>Subject</strong>{' '}
          field to briefly describe your request or issue.
          <br />
          <strong>Note:</strong> Once submitted, you cannot edit it again.
        </p>

        <p className='mb-2 text-lg'>
          <span className='font-medium'>Requested by:</span>{' '}
          {user?.profile?.firstName} {user?.profile?.lastName}
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid gap-6 md:grid-cols-2'
          >
            {/* Left Column */}
            <div className='space-y-4'>
              {/* Subject */}
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

              {/* Floor */}
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
                      <SelectTrigger className='w-full sm:w-80'>
                        <SelectValue placeholder='Select Department' />
                      </SelectTrigger>
                      <SelectContent className='max-h-60 w-[var(--radix-select-trigger-width)] overflow-y-auto sm:w-80'>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id}>
                            <div className='flex flex-col'>
                              <span className='font-medium'>{dept.name}</span>
                              {dept.description && (
                                <span className='text-muted-foreground truncate text-xs'>
                                  {dept.description}
                                </span>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Right Column */}
            <div className='space-y-4'>
              {/* Message */}
              <FormField
                control={form.control}
                name='message'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Additional details or context'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <Button
              type='submit'
              variant='outline'
              disabled={creating}
              className='flex items-center gap-2'
            >
              <Send className='h-4 w-4 text-green-500' />
              {creating ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

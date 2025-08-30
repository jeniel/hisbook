import { useState } from 'react'
import { Mutation } from '@/graphql/codegen/graphql'
import { UPDATE_EVENT } from '@/graphql/operation/mutation/event'
import { useMutation } from '@apollo/client'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PencilLine } from 'lucide-react'

// Props
type EditEventProps = {
  event: {
    id: string
    title: string
    location: string
    startDate?: string
    endDate?: string | null
    detailsUrl?: string | null
  }
  onUpdated?: () => void
}

export default function EditEvent({ event, onUpdated }: EditEventProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: event.title,
    location: event.location,
    startDate: event.startDate,
    endDate: event.endDate ?? '',
    detailsUrl: event.detailsUrl ?? '',
  })

  const [updateEvent, { loading }] = useMutation<Mutation>(UPDATE_EVENT)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateEvent({
        variables: {
          updateEventId: event.id,
          payload: {
            title: formData.title,
            location: formData.location,
            startDate: formData.startDate,
            endDate: formData.endDate || null, // optional
            detailsUrl: formData.detailsUrl || null, // optional
          },
        },
      })

      toast.success('Event updated')
      if (onUpdated) onUpdated()
      setOpen(false)
    } catch (_error) {
      toast.error('Failed to update event')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'} size='sm'>
          <PencilLine className='text-blue-500' /> Edit
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </div>

          <div className='space-y-2'>
            <Label>Location</Label>
            <Input
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
            />
          </div>

          <div className='space-y-2'>
            <Label>Start Date</Label>
            <Input
              type='date'
              value={formData.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
            />
          </div>

          <div className='space-y-2'>
            <Label>End Date (Optional)</Label>
            <Input
              type='date'
              value={formData.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
            />
          </div>

          <div className='space-y-2'>
            <Label>Details URL (Optional)</Label>
            <Input
              value={formData.detailsUrl}
              onChange={(e) => handleChange('detailsUrl', e.target.value)}
            />
          </div>

          <Button type='submit' className='w-full' disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

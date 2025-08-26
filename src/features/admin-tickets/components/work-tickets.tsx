/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { Mutation } from '@/graphql/codegen/graphql'
import { EDIT_TICKET } from '@/graphql/operation/mutation/ticket'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useMutation, useQuery } from '@apollo/client'
import { toast } from 'sonner'
import { useUpload } from '@/hooks/useUpload'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Props
type WorkTicketProps = {
  ticket: any
  onUpdated?: () => void
}

export default function WorkTicket({ ticket, onUpdated }: WorkTicketProps) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(ticket.status)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const { data: meData } = useQuery(ME_QUERY)
  const currentUser = meData?.meQuery?.user
  const updatedBy = `${currentUser?.profile?.firstName || ''} ${currentUser?.profile?.lastName || ''} - ${currentUser?.profile?.title || ''}`

  const [updateTicket, { loading }] = useMutation<Mutation>(EDIT_TICKET)
  const { uploadFile, getFile } = useUpload()

  // Fetch existing screenshot when modal opens
  useEffect(() => {
    if (open && ticket.screenshot) {
      const fetchScreenshot = async () => {
        const url = await getFile(
          'acebook',
          'tickets',
          ticket.screenshot.split('/').pop()!
        )
        if (url) setPreview(url)
      }
      fetchScreenshot()
    }
  }, [open, ticket.screenshot, getFile])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleSubmit = async () => {
    try {
      let screenshotUrl = preview // fallback if no new file

      if (file) {
        const uploadResult = await uploadFile(file, 'tickets')
        if (!uploadResult.success) throw new Error(uploadResult.message)
        screenshotUrl = uploadResult.url!
      }

      await updateTicket({
        variables: {
          updateMissedLogoutTicketId: ticket.id,
          payload: {
            missedAt: ticket.missedAt,
            floor: ticket.floor,
            screenshot: screenshotUrl,
            status,
            updatedBy, // automatically set
          },
        },
      })

      toast.success('Ticket updated successfully')
      if (onUpdated) onUpdated()
      setOpen(false)
    } catch (_error) {
      toast.error('Failed to update ticket')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm'>
          Work on Ticket
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-5xl'>
        <DialogHeader>
          <DialogTitle>Work on Ticket</DialogTitle>
          <DialogDescription>Review and update this ticket.</DialogDescription>
        </DialogHeader>

        {/* Ticket Info */}
        <div className='space-y-2 text-sm'>
          <p>
            <span className='mr-2 font-semibold'>Name:</span>{' '}
            {ticket.createdBy?.profile
              ? `${ticket.createdBy.profile.firstName} ${ticket.createdBy.profile.lastName}`
              : 'Unknown'}
          </p>
          <p>
            <span className='mr-2 font-semibold'>Subject:</span>{' '}
            {ticket.subject || '-'}
          </p>
          <p>
            <span className='mr-2 font-semibold'>Remarks:</span>{' '}
            {ticket.remarks || '-'}
          </p>
        </div>

        {/* Status Dropdown */}
        <div className='mt-4 space-y-2'>
          <Label>Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Pending'>Pending</SelectItem>
              <SelectItem value='Approved'>Approved</SelectItem>
              <SelectItem value='Completed'>Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* File Upload */}
        <div className='mt-4 space-y-2'>
          <Label>Attach CCTV Screenshot</Label>
          <Input type='file' accept='image/*' onChange={handleFileChange} />
          {file && (
            <p className='text-muted-foreground text-xs'>
              Selected: {file.name}
            </p>
          )}
          {preview && (
            <div className='mt-2'>
              <img
                src={preview}
                alt='CCTV Screenshot Preview'
                className='max-h-full w-full rounded border object-cover'
              />
            </div>
          )}
        </div>

        {/* Reviewed By Auto Add*/}
        <div className='mt-4 space-y-2'>
          <Label>Reviewed By</Label>
          <Input value={updatedBy} readOnly placeholder='Name' />
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

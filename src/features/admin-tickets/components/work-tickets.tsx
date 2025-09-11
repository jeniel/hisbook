/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { Mutation } from '@/graphql/codegen/graphql'
import { EDIT_TICKET } from '@/graphql/operation/mutation/ticket'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useMutation, useQuery } from '@apollo/client'
import { PencilLine } from 'lucide-react'
import { toast } from 'sonner'
import { useUpload } from '@/hooks/useUpload'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
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
      let active = true
      const fetchScreenshot = async () => {
        const filename = ticket.screenshot.split('/').pop()!
        const bucket = import.meta.env.VITE_MINIO_BUCKET
        const url = await getFile('tickets', filename, bucket)
        if (url && active) {
          setPreview((prev) => {
            if (prev) URL.revokeObjectURL(prev) // cleanup old blob URL
            return url
          })
        }
      }
      fetchScreenshot()
      return () => {
        active = false
      }
    }
  }, [open, ticket.screenshot])

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
          updateTicketId: ticket.id, // match the mutation variable
          payload: {
            missedAt: ticket.missedAt,
            floor: ticket.floor,
            screenshot: screenshotUrl,
            status,
            updatedBy,
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
        <Button variant={'outline'} size='sm'>
          <PencilLine className='text-blue-500' /> Update
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-6xl'>
        <DialogHeader>
          <DialogTitle className='flex flex-row items-center gap-2'>
            <PencilLine className='font-semibold text-blue-500' />
            Update Ticket / Service
          </DialogTitle>
        </DialogHeader>
        {/* Two-column grid */}
        <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
          {/* Left Column */}
          <div className='space-y-4'>
            {/* Ticket Info */}
            <div className='text-md space-y-2'>
              <p>
                <strong className='mr-2'>Name:</strong>{' '}
                {ticket.createdBy?.profile
                  ? `${ticket.createdBy.profile.firstName} ${ticket.createdBy.profile.lastName}`
                  : 'Unknown'}
              </p>
              <p>
                <strong className='mr-2'>Subject:</strong>{' '}
                {ticket.subject || '-'}
              </p>
              <p>
                <strong className='mr-2'>Department / Location:</strong>{' '}
                {ticket.floor || '-'}
              </p>
              <p>
                <strong className='mr-2'>Message:</strong>{' '}
                {ticket.remarks || '-'}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className='text-md space-y-4'>
            {/* Reviewed By */}
            <div className='space-y-2'>
              <strong>Reviewed By</strong>
              <Input value={updatedBy} readOnly placeholder='Name' />
            </div>

            {/* Status Dropdown */}
            <div className='space-y-2'>
              <strong>Status</strong>
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
          </div>
        </div>
        {/* File Upload */}
        <div className='space-y-2'>
          <strong>Attach File / Image</strong>
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
                className='max-h-80 w-full rounded border object-cover'
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>

          <Button
            type='button'
            variant='outline'
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

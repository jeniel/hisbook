import { useState, useEffect } from 'react'
import { Ticket } from '@/graphql/codegen/graphql'
import { PencilLine } from 'lucide-react'
import { toast } from 'sonner'
import useDepartments from '@/hooks/useDepartmentDropdown'
import useMeQuery from '@/hooks/useMeQuery'
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
import useTicketMutation from '@/features/tickets/hooks/useTicketMutation'

type UpdateTicketProps = {
  ticket: Ticket
  onUpdated?: () => void
}

export default function UpdateTicket({ ticket, onUpdated }: UpdateTicketProps) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<string>(ticket.status)
  const [file, setFile] = useState<File | null>(null)
  const [updatedBy, setUpdatedBy] = useState('')
  const [remarks, setRemarks] = useState(ticket.remarks || '')
  const [departmentId, setDepartmentId] = useState(ticket.departmentId || '')

  const { user } = useMeQuery()
  const { fetchDepartments, departments } = useDepartments({
    onlySupport: true,
  })
  const { uploadFile } = useUpload()
  const { updateTicket, updating } = useTicketMutation(onUpdated)

  useEffect(() => {
    if (open) {
      fetchDepartments()
      setUpdatedBy(
        `${user?.profile?.firstName || ''} ${user?.profile?.lastName || ''} - ${
          user?.profile?.title || ''
        }`
      )
    }
  }, [open, user, fetchDepartments, setUpdatedBy])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async () => {
    try {
      let screenshotUrl = ticket.screenshot // keep existing unless replaced

      if (file) {
        const uploadResult = await uploadFile(file, 'tickets')
        if (!uploadResult.success) throw new Error(uploadResult.message)
        screenshotUrl = uploadResult.url!
      }

      await updateTicket(ticket.id, {
        missedAt: ticket.missedAt,
        screenshot: screenshotUrl,
        status,
        updatedBy,
        remarks,
        departmentId,
      })

      setOpen(false)
    } catch (_error) {
      toast.error('Failed to update ticket')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <PencilLine className='text-blue-500' /> Update
        </Button>
      </DialogTrigger>

      <DialogContent
        className='max-h-[90vh] w-full max-w-lg overflow-y-auto sm:max-w-2xl lg:max-w-4xl'
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle className='flex flex-row items-center gap-2'>
            <PencilLine className='font-semibold text-blue-500' />
            Update Ticket / Service
          </DialogTitle>
        </DialogHeader>

        {/* Ticket Details */}
        <div className='mb-4 rounded-lg border bg-gray-50 p-4 dark:bg-zinc-950'>
          <h2 className='mb-3 text-lg font-semibold'>Ticket Details</h2>
          <div className='space-y-2 text-sm'>
            <p>
              <strong className='mr-2'>Name:</strong>
              {ticket.createdBy?.profile
                ? `${ticket.createdBy.profile.firstName} ${ticket.createdBy.profile.lastName}`
                : 'Unknown'}
            </p>
            <p>
              <strong className='mr-2'>Subject:</strong>
              {ticket.subject || '-'}
            </p>
            <p>
              <strong className='mr-2'>Department / Location:</strong>
              {ticket.floor || '-'}
            </p>
            <p>
              <strong className='mr-2'>Message:</strong>
            </p>
            <p className='mr-2 ml-4'>{ticket.message || '-'}</p>
          </div>
        </div>

        {/* Update Section */}
        <div className='grid grid-cols-1 gap-4 space-y-6 md:grid-cols-2'>
          {/* Reviewed By */}
          <div className='space-y-2'>
            <strong>Reviewed By</strong>
            <Input value={updatedBy} readOnly placeholder='Name' />
          </div>

          {/* Status */}
          <div className='space-y-2'>
            <strong>Status</strong>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Approved'>Approved</SelectItem>
                <SelectItem value='Completed'>Completed</SelectItem>
                <SelectItem value='OnHold'>On Hold</SelectItem>
                <SelectItem value='InProgress'>In Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Department */}
          <div className='space-y-2'>
            <strong>Send to Department (Optional)</strong>
            <Select value={departmentId} onValueChange={setDepartmentId}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select department' />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name} - {dept.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
          </div>
        </div>

        {/* Remarks */}
        <div className='space-y-2'>
          <strong>Remarks</strong>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder='Enter remarks...'
            className='w-full rounded border p-2 text-sm'
            rows={3}
          />
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={updating}>
            {updating ? 'Saving...' : 'Save'}
          </Button>
          <Button
            type='button'
            variant='outline'
            onClick={() => setOpen(false)}
            disabled={updating}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

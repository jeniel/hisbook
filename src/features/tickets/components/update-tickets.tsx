/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { Mutation } from '@/graphql/codegen/graphql'
import { EDIT_TICKET } from '@/graphql/operation/mutation/ticket'
import { FIND_ALL_DEPARTMENTS } from '@/graphql/operation/query/department'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useMutation, useLazyQuery } from '@apollo/client'
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
import Spinner from '@/components/spinner'

type UpdateTicketProps = {
  ticket: any
  onUpdated?: () => void
}

export default function UpdateTicket({ ticket, onUpdated }: UpdateTicketProps) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(ticket.status)
  const [file, setFile] = useState<File | null>(null)
  const [updatedBy, setUpdatedBy] = useState('')
  const [remarks, setRemarks] = useState(ticket.remarks || '')
  const [departmentId, setDepartmentId] = useState(ticket.departmentId || '')

  const [fetchMe, { data: meData }] = useLazyQuery(ME_QUERY)
  const [updateTicket, { loading }] = useMutation<Mutation>(EDIT_TICKET)
  const { uploadFile } = useUpload()

  // ✅ Fetch departments
  const [fetchDepartments, { data: deptData, loading: deptLoading }] =
    useLazyQuery(FIND_ALL_DEPARTMENTS, {
      variables: { page: 1, perPage: 50 },
      fetchPolicy: 'network-only', // ensures fresh data every time
    })

  // Run department fetch when modal opens
  useEffect(() => {
    if (open) {
      fetchMe()
      fetchDepartments()
    }
  }, [open])

  const departments = deptData?.findAllDepartments?.data || []

  // Fetch user only when modal opens
  useEffect(() => {
    if (open) {
      fetchMe()
    }
  }, [open])

  // Build updatedBy once we have user data
  useEffect(() => {
    if (meData?.meQuery?.user) {
      const user = meData.meQuery.user
      setUpdatedBy(
        `${user?.profile?.firstName || ''} ${user?.profile?.lastName || ''} - ${
          user?.profile?.title || ''
        }`
      )
    }
  }, [meData])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
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

      await updateTicket({
        variables: {
          updateTicketId: ticket.id,
          payload: {
            missedAt: ticket.missedAt,
            floor: ticket.floor,
            screenshot: screenshotUrl,
            status,
            updatedBy,
            remarks,
            departmentId,
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

  if (deptLoading) return <Spinner />

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

        {/* Ticket Details Section */}
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
              {ticket.message || '-'}
            </p>
          </div>
        </div>

        {/* Update Section */}
        <div className='grid grid-cols-2 gap-4 space-y-6'>
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
                {departments.map((dept: any) => (
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

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { Eye } from 'lucide-react'
import { useUpload } from '@/hooks/useUpload'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Spinner from '@/components/spinner'

type ViewTicketProps = {
  ticket: any
}

export default function ViewTicket({ ticket }: ViewTicketProps) {
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const { getFile } = useUpload()

  // ✅ Fetch screenshot only when modal opens
  useEffect(() => {
    if (open && ticket.screenshot) {
      let active = true
      let objectUrl: string | null = null

      const fetchScreenshot = async () => {
        try {
          const filename = ticket.screenshot.split('/').pop()!
          const bucket = import.meta.env.VITE_MINIO_BUCKET
          const url = await getFile('tickets', filename, bucket)
          if (url && active) {
            objectUrl = url
            setPreview(url)
          }
        } catch (e) {
          console.error('Error loading screenshot', e)
        }
      }

      fetchScreenshot()

      return () => {
        active = false
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl) // ✅ cleanup old blob URL
        }
      }
    } else if (!open) {
      setPreview(null) // ✅ reset when modal closes
    }
  }, [open, ticket.screenshot])

  if (!ticket) return <Spinner />

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <Eye className='text-green-500' /> View
        </Button>
      </DialogTrigger>

      <DialogContent className='max-h-[90vh] w-full max-w-lg overflow-y-auto sm:max-w-2xl lg:max-w-4xl'>
        <DialogHeader>
          <DialogTitle className='flex flex-row items-center gap-2'>
            <Eye className='font-semibold text-green-500' />
            Ticket Details
          </DialogTitle>
        </DialogHeader>

        {/* Ticket Info */}
        <div className='space-y-4 text-sm'>
          <div className='rounded-lg border bg-gray-50 p-4 dark:bg-zinc-950'>
            <h2 className='mb-3 text-lg font-semibold'>General Information</h2>
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

          <div className='rounded-lg border bg-gray-50 p-4 dark:bg-zinc-950'>
            <h2 className='mb-3 text-lg font-semibold'>Status & Updates</h2>
            <p>
              <strong className='mr-2'>Status:</strong>
              {ticket.status || '-'}
            </p>
            <p>
              <strong className='mr-2'>Reviewed By:</strong>
              {ticket.updatedBy || '-'}
            </p>
            <p>
              <strong className='mr-2'>Remarks:</strong>
              {ticket.remarks || '-'}
            </p>
            <p>
              <strong className='mr-2'>Department Assigned:</strong>
              {ticket.department?.name || '-'}
            </p>
          </div>

          {/* Screenshot if available */}
          {preview && (
            <div className='rounded-lg border bg-gray-50 p-4 dark:bg-zinc-950'>
              <h2 className='mb-3 text-lg font-semibold'>Attached File</h2>
              <img
                src={preview}
                alt='Ticket Screenshot'
                className='max-h-96 w-full rounded border object-contain'
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

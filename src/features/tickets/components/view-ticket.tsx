/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import {
  Eye,
  User,
  FileText,
  Building2,
  MessageSquare,
  Tag,
  UserCheck,
  StickyNote,
  ClipboardList,
  FileImage,
  Calendar,
  Barcode,
  Hash,
} from 'lucide-react'
import { formatDate } from '@/utils/formatDate'
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
  if (!ticket) return <Spinner />

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>
        <Button size='sm'>
          <Eye /> View
        </Button>
      </DialogTrigger>

      <DialogContent
        className='max-h-[90vh] w-full max-w-4xl overflow-y-auto'
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Eye className='text-green-500' /> Ticket Details
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-4 text-lg'>
          {/* General Info */}
          <div className='rounded-lg border bg-gray-50 p-4 dark:bg-zinc-950'>
            <h2 className='mb-3 flex items-center gap-2 text-lg font-semibold'>
              <User className='text-blue-500' /> General Information
            </h2>
            <p>
              <strong>
                <User className='mr-1 inline h-4 w-4' /> Name:
              </strong>{' '}
              {ticket.createdBy?.profile?.firstName &&
              ticket.createdBy?.profile?.lastName
                ? `${ticket.createdBy.profile.firstName} ${ticket.createdBy.profile.lastName}`
                : 'No Full Name'}{' '}
              / {ticket.createdBy?.username || 'Unknown'}
            </p>
            <p>
              <strong>
                <Hash className='mr-1 inline h-4 w-4' /> Ticket No:
              </strong>{' '}
              {ticket.ticketId || '-'}
            </p>
            <p>
              <strong>
                <FileText className='mr-1 inline h-4 w-4' /> Subject:
              </strong>{' '}
              {ticket.subject || '-'}
            </p>
            <p>
              <strong>
                <Calendar className='mr-1 inline h-4 w-4' /> Submitted On:
              </strong>{' '}
              {formatDate(ticket.createdAt, false)}
            </p>
            <p>
              <strong>
                <Barcode className='mr-1 inline h-4 w-4' /> Serial Number /
                Property Tag:
              </strong>{' '}
              {ticket.serialNumber || 'N/A'}
            </p>
            <p>
              <strong>
                <Building2 className='mr-1 inline h-4 w-4' /> Department /
                Location:
              </strong>{' '}
              {ticket.floor || '-'}
            </p>
            <p>
              <strong>
                <MessageSquare className='mr-1 inline h-4 w-4' /> Message:
              </strong>{' '}
            </p>
            <p className='mr-2 ml-5'>{ticket.message || '-'}</p>
          </div>

          {/* Status & Updates */}
          <div className='rounded-lg border bg-gray-50 p-4 dark:bg-zinc-950'>
            <h2 className='mb-3 flex items-center gap-2 text-lg font-semibold'>
              <ClipboardList className='text-red-500' /> Status & Updates
            </h2>
            <p>
              <strong>
                <Tag className='mr-1 inline h-4 w-4' /> Status:
              </strong>{' '}
              {ticket.status || '-'}
            </p>
            <p>
              <strong>
                <UserCheck className='mr-1 inline h-4 w-4' /> Reviewed By:
              </strong>{' '}
              {ticket.updatedBy || '-'}
            </p>
            <p>
              <strong>
                <StickyNote className='mr-1 inline h-4 w-4' /> Remarks:
              </strong>{' '}
              {ticket.remarks || '-'}
            </p>
            <p>
              <strong>
                <Building2 className='mr-1 inline h-4 w-4' /> Department
                Assigned:
              </strong>{' '}
              {ticket.department?.name || '-'}
            </p>
          </div>

          {/* Screenshot */}
          <div className='rounded-lg border bg-gray-50 p-4 dark:bg-zinc-950'>
            <h2 className='mb-3 flex items-center gap-2 text-lg font-semibold'>
              <FileImage className='text-yellow-500' />Image
            </h2>

            {ticket?.screenshot ? (
              <img
                src={ticket.screenshot}
                alt='Ticket Screenshot'
                className='max-h-96 w-full rounded border object-contain'
              />
            ) : (
              <div className='flex h-40 items-center justify-center rounded border border-dashed text-sm text-gray-500'>
                No image attached
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

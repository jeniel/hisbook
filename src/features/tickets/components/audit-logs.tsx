import { useState } from 'react'
import { BookCheck, CalendarClock, Pen, User, LucideHash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog'
import Spinner from '@/components/spinner'
import { useAuditQuery } from '@/features/tickets/hooks/useAuditQuery'

export default function AuditLogsContent({ ticketId }: { ticketId: string }) {
  const [open, setOpen] = useState(false)
  const { logs, loading, error } = useAuditQuery(open ? ticketId : undefined)

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <BookCheck className='text-yellow-500' /> View Logs
        </Button>
      </DialogTrigger>

      <DialogContent
        className='max-h-[90vh] w-full max-w-lg overflow-y-auto sm:max-w-2xl lg:max-w-xl'
        aria-describedby={undefined}
      >
        <DialogTitle className='flex flex-row items-center gap-2'>
          <BookCheck className='text-yellow-500' /> Audit Logs
        </DialogTitle>

        {loading && <Spinner />}
        {error && (
          <p className='text-red-500'>Error loading logs: {error.message}</p>
        )}
        {!loading && !error && logs.length === 0 && <p>No audit logs found.</p>}
        {!loading && !error && logs.length > 0 && (
          <ul className='max-h-[70vh] space-y-4 overflow-y-auto'>
            {logs.map((log) => {
              const timestamp = new Date(log.timestamp)
              const formattedDate = timestamp.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
              const formattedTime = timestamp.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })

              return (
                <li key={log.id} className='rounded-lg border p-3 shadow-sm'>
                  <p className='flex items-center gap-2 text-lg font-semibold'>
                    <CalendarClock size={18} className='text-blue-500' />
                    On {formattedDate} {formattedTime}
                  </p>
                  <ul className='text-md mt-2 ml-4 list-inside list-disc space-y-1'>
                    <li className='flex items-center gap-2'>
                      <User size={16} className='text-gray-700' />
                      Updated By: {log.updatedBy}
                    </li>
                    <li className='flex items-center gap-2'>
                      <LucideHash size={16} className='text-green-600' />
                      Action: {log.action}
                    </li>
                    <li className='flex items-center gap-2'>
                      <Pen size={16} className='text-indigo-600' />
                      Remarks: {log.remarks || '—'}
                    </li>
                  </ul>
                </li>
              )
            })}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  )
}

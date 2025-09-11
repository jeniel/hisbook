import { Query } from '@/graphql/codegen/graphql'
import { FIND_TICKET_AUDIT_LOGS } from '@/graphql/operation/query/ticket'
import { useQuery } from '@apollo/client'
import { BookCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog'
import Spinner from '@/components/spinner'

interface AuditLogsContentProps {
  ticketId: string
}

export default function AuditLogsContent({ ticketId }: AuditLogsContentProps) {
  const { loading, error, data } = useQuery<Query>(FIND_TICKET_AUDIT_LOGS, {
    variables: { findTicketbyIdId: ticketId },
    skip: !ticketId,
  })

  const auditLogs = data?.findTicketbyID?.auditLogs
    ? [...data.findTicketbyID.auditLogs].sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
    : []

  return (
    <Dialog>
      {/* Trigger */}
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <BookCheck className='text-yellow-500' />
          View Logs
        </Button>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent className='max-w-md'>
        <DialogTitle className='flex flex-row items-center gap-2'>
          <BookCheck className='text-yellow-500' /> Audit Logs
        </DialogTitle>

        {/* Logs Section */}
        {loading && <Spinner />}
        {error && (
          <p className='text-red-500'>Error loading logs: {error.message}</p>
        )}
        {!loading && !error && auditLogs.length === 0 && (
          <p>No audit logs found.</p>
        )}

        {!loading && !error && auditLogs.length > 0 && (
          <ul className='max-h-[70vh] space-y-2 overflow-y-auto'>
            {auditLogs.map((log) => {
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
                <li key={log.id} className='p-2'>
                  <p className='font-sembiold text-lg'>
                    On {formattedDate} {formattedTime}:
                  </p>
                  <ul className='text-muted-foreground text-md ml-4 list-inside list-disc'>
                    <li>{log.updatedBy}</li>
                    <li>{log.action}</li>
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

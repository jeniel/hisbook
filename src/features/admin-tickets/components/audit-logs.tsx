import { Query } from '@/graphql/codegen/graphql'
import { FIND_TICKET_AUDIT_LOGS } from '@/graphql/operation/query/ticket'
import { useQuery } from '@apollo/client'
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
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
    : []

  if (loading) return <Spinner />
  if (error) return <p>Error loading logs: {error.message}</p>
  if (auditLogs.length === 0) return <p>No audit logs found.</p>

  return (
    <ul className="space-y-2 max-h-[70vh] overflow-y-auto">
      {auditLogs.map((log) => {
        // Formatted Date and Time
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
          <li key={log.id} className="p-2">
            On {formattedDate} {formattedTime}:
            <ul className="ml-4 list-inside list-disc">
              <li>{log.updatedBy}</li>
              <li>{log.action}</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

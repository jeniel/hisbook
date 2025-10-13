import { Query } from '@/graphql/codegen/graphql'
import { FIND_TICKET_AUDIT_LOGS } from '@/graphql/operation/query/ticket'
import { useQuery } from '@apollo/client'

export function useAuditQuery(ticketId?: string) {
  const { data, loading, error, refetch } = useQuery<Query>(
    FIND_TICKET_AUDIT_LOGS,
    {
      variables: { findTicketbyIdId: ticketId ?? '' },
      skip: !ticketId, // don’t run if no ticketId
      fetchPolicy: 'network-only',
    }
  )

  const logs = data?.findTicketbyID?.auditLogs || []
  const sortedLogs = [...logs].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  return {
    logs: sortedLogs,
    loading,
    error,
    refetch,
  }
}

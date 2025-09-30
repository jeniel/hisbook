import { useState } from 'react'
import { Query } from '@/graphql/codegen/graphql'
import {
  FIND_ALL_TICKETS_BY_USER,
  FIND_ALL_TICKETS,
  FIND_TICKETS_BY_DEPARTMENT,
} from '@/graphql/operation/query/ticket'
import { useQuery } from '@apollo/client'

type UseTicketQueryOptions = {
  userId?: string | null
  departmentId?: string | null
  initialPerPage?: number
  mode?: 'all' | 'user' | 'department' // 👈 added department
}

export default function useTicketQuery({
  userId,
  departmentId,
  initialPerPage = 10,
  mode = 'user',
}: UseTicketQueryOptions) {
  const [page, setPage] = useState(1)
  const [perPage] = useState(initialPerPage)

  // Pick the query based on mode
  const query =
    mode === 'all'
      ? FIND_ALL_TICKETS
      : mode === 'department'
      ? FIND_TICKETS_BY_DEPARTMENT
      : FIND_ALL_TICKETS_BY_USER

  // Variables
  const variables =
    mode === 'all'
      ? { page, perPage }
      : mode === 'department'
      ? { departmentId, page, perPage }
      : { userId, page, perPage }

  const { data, loading, error, refetch } = useQuery<Query>(query, {
    variables,
    skip:
      (mode === 'user' && !userId) ||
      (mode === 'department' && !departmentId), // skip if no required variable
    fetchPolicy: 'cache-and-network',
  })

  // Normalize tickets
  const tickets =
    mode === 'all'
      ? data?.findAllTickets?.data || []
      : mode === 'department'
      ? data?.findTicketsByDepartment?.data || []
      : data?.findTicketsByUser?.data || []

  // Meta info
  const meta =
    mode === 'all'
      ? data?.findAllTickets?.meta
      : mode === 'department'
      ? data?.findTicketsByDepartment?.meta
      : data?.findTicketsByUser?.meta

  const totalPages = meta?.lastPage || 1

  return {
    tickets,
    meta,
    loading,
    error,
    page,
    perPage,
    setPage,
    refetch,
    totalPages,
  }
}

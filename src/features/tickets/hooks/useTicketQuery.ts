import { useState } from 'react'
import { Query } from '@/graphql/codegen/graphql'
import {
  FIND_ALL_TICKETS_BY_USER,
  FIND_ALL_TICKETS,
  FIND_TICKETS_BY_DEPARTMENT,
  FIND_TICKETS_WORKED_BY_USER, // 👈 add this
} from '@/graphql/operation/query/ticket'
import { useQuery } from '@apollo/client'

type UseTicketQueryOptions = {
  userId?: string | null
  departmentId?: string | null
  initialPerPage?: number
  mode?: 'all' | 'user' | 'department' | 'worked' // 👈 add worked mode
  initialSearch?: string
}

export default function useTicketQuery({
  userId,
  departmentId,
  initialPerPage = 10,
  mode = 'user',
  initialSearch = '',
}: UseTicketQueryOptions) {
  const [page, setPage] = useState(1)
  const [perPage] = useState(initialPerPage)
  const [search, setSearch] = useState(initialSearch)

  // Pick the query based on mode
  const query =
    mode === 'all'
      ? FIND_ALL_TICKETS
      : mode === 'department'
        ? FIND_TICKETS_BY_DEPARTMENT
        : mode === 'worked'
          ? FIND_TICKETS_WORKED_BY_USER
          : FIND_ALL_TICKETS_BY_USER

  // Variables
  const variables =
    mode === 'all'
      ? { page, perPage, search }
      : mode === 'department'
        ? { departmentId, page, perPage, search }
        : { userId, page, perPage, search }

  const { data, loading, error, refetch } = useQuery<Query>(query, {
    variables,
    skip:
      (mode === 'user' && !userId) ||
      (mode === 'worked' && !userId) || // 👈 skip when userId missing
      (mode === 'department' && !departmentId),
    fetchPolicy: 'cache-and-network',
  })

  // Normalize tickets
  const tickets =
    mode === 'all'
      ? data?.findAllTickets?.data || []
      : mode === 'department'
        ? data?.findTicketsByDepartment?.data || []
        : mode === 'worked'
          ? data?.findTicketsWorkedByUser?.data || []
          : data?.findTicketsByUser?.data || []

  // Meta info
  const meta =
    mode === 'all'
      ? data?.findAllTickets?.meta
      : mode === 'department'
        ? data?.findTicketsByDepartment?.meta
        : mode === 'worked'
          ? data?.findTicketsWorkedByUser?.meta
          : data?.findTicketsByUser?.meta

  const totalPages = meta?.lastPage || 1

  return {
    tickets,
    meta,
    loading,
    error,
    page,
    perPage,
    search,
    setSearch,
    setPage,
    refetch,
    totalPages,
  }
}

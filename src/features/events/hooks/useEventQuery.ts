import { useState } from 'react'
import { Query } from '@/graphql/codegen/graphql'
import { GET_ALL_EVENT } from '@/graphql/operation/query/event'
import { useQuery } from '@apollo/client'

export default function useEventsQuery(
  initialPerPage: number = 10,
  search = ''
) {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(initialPerPage)

  const { data, loading, error, refetch } = useQuery<Query>(GET_ALL_EVENT, {
    variables: { page, perPage, search },
    fetchPolicy: 'cache-and-network',
  })

  const events = data?.findAllEvents?.data || []
  const meta = data?.findAllEvents?.meta
  const totalPages = meta?.lastPage || 1

  return {
    events,
    loading,
    error,
    refetch,
    page,
    setPage,
    perPage,
    setPerPage,
    totalPages,
  }
}

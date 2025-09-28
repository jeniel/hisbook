import { useState } from 'react'
import { Query } from '@/graphql/codegen/graphql'
import { FIND_ALL_USER } from '@/graphql/operation/query/user'
import { useQuery } from '@apollo/client'

export default function useUserQuery(initialPerPage: number = 10, search = '') {
  const [page, setPage] = useState(1)
  const [perPage] = useState(initialPerPage)

  const { data, loading, error, refetch } = useQuery<Query>(FIND_ALL_USER, {
    variables: { page, perPage, search },
    fetchPolicy: 'cache-and-network',
  })

  const users = data?.findAllUsers?.data || []
  const meta = data?.findAllUsers?.meta
  const totalPages = meta?.lastPage || 1

  return {
    users,
    loading,
    error,
    page,
    perPage,
    setPage,
    search,
    refetch,
    totalPages,
  }
}

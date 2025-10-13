import { useState } from 'react'
import { Query } from '@/graphql/codegen/graphql'
import { FIND_ALL_DEPARTMENTS } from '@/graphql/operation/query/department'
import { useQuery } from '@apollo/client'

export default function useDepartmentsQuery(
  initialPerPage: number = 10,
  search: string = ''
) {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(initialPerPage)

  const { data, loading, error, refetch } = useQuery<Query>(
    FIND_ALL_DEPARTMENTS,
    {
      variables: { page, perPage, search },
      fetchPolicy: 'cache-and-network',
    }
  )

  const departments = data?.findAllDepartments?.data ?? []
  const meta = data?.findAllDepartments?.meta
  const totalPages = meta?.lastPage ?? 1

  return {
    departments,
    loading,
    error,
    page,
    setPage,
    perPage,
    setPerPage,
    totalPages,
    refetch,
  }
}

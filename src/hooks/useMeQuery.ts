import { Query } from '@/graphql/codegen/graphql'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useQuery } from '@apollo/client'

export default function useMeQuery() {
  const { data, loading, error, refetch } = useQuery<Query>(ME_QUERY, {
    fetchPolicy: 'cache-and-network',
  })

  const user = data?.meQuery?.user || null
  const userId = user?.id ?? null
  const employeeID = user?.profile?.employeeID ?? null
  const departmentId = user?.department?.id ?? null
  const departmentName = user?.department?.name ?? null

  return {
    data,
    user,
    userId,
    employeeID,
    departmentId,
    departmentName,
    loading,
    error,
    refetch,
  }
}

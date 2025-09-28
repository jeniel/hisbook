import { Query } from '@/graphql/codegen/graphql'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useQuery } from '@apollo/client'

export const useMeQuery = () => {
  const { data, loading, error } = useQuery<Query>(ME_QUERY)

  const employeeID = data?.meQuery?.user?.profile?.employeeID ?? null

  return { data, loading, error, employeeID }
}

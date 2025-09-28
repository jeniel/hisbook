import { useQuery } from '@apollo/client'
import { CENSUS_DATA } from '@/graphql/operation/query/census'
import { Query } from '@/graphql/codegen/graphql'

/**
 * Hook for fetching overall census data (summary).
 */
export function useCensus() {
  const { data, loading, error } = useQuery<Query>(CENSUS_DATA)

  return {
    summary: data?.getCensusSummary,
    loading,
    error,
  }
}


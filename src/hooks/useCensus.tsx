import { useQuery } from '@apollo/client'
import { CENSUS_DATA, CENSUS_TICKET_DATA } from '@/graphql/operation/query/census'
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

/**
 * Hook for fetching ticket-related census data for a specific user.
 */
export function useCensusTickets(userId: string) {
  const { data, loading, error } = useQuery<Query>(CENSUS_TICKET_DATA, {
    variables: { userId },
    skip: !userId,
  })

  return {
    ticketSummary: data?.getCensusSummary,
    loading,
    error,
  }
}

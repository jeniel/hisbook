import { Query } from '@/graphql/codegen/graphql'
import { CENSUS_DATA } from '@/graphql/operation/query/census'
import { useQuery } from '@apollo/client'
import Spinner from '@/components/spinner'

export default function SummaryEvents() {
  const { data, loading, error } = useQuery<Query>(CENSUS_DATA)

  if (loading) return <Spinner />
  if (error) return <p>Error: {error.message}</p>

  const totalEvents = data?.getCensusSummary?.totalEvents ?? 0

  return (
    <div className='mb-2 grid grid-cols-1 gap-2 md:grid-cols-1'>
      <div className='rounded-2xl border p-2 text-sm shadow-sm dark:border-neutral-700 dark:bg-zinc-900'>
        <p className='text-center text-xl font-bold text-red-400'>
          {totalEvents}
        </p>
        <p className='text-center text-sm'>Total Events</p>
      </div>
    </div>
  )
}

import { Query } from '@/graphql/codegen/graphql'
import { CENSUS_DATA } from '@/graphql/operation/query/census'
import { useQuery } from '@apollo/client'
import Spinner from '@/components/spinner'

const statusColors: Record<string, string> = {
  Approved: 'text-yellow-400',
  Pending: 'text-blue-400',
  Completed: 'text-green-400',
}

export default function AllTicketsOverview() {
  const { data, loading, error } = useQuery<Query>(CENSUS_DATA)

  if (loading) return <Spinner />
  if (error) return <p>Error: {error.message}</p>

  const tickets = data?.getCensusSummary.ticketsByStatus
  const totalTickets = data?.getCensusSummary.totalTickets ?? 0

  return (
    <div className='mb-2 grid grid-cols-2 gap-2 md:mb-0 md:grid-cols-4'>
      {tickets?.map((ticket) => (
        <div
          key={ticket.status}
          className='rounded-2xl border p-2 text-sm shadow-sm dark:border-neutral-700 dark:bg-zinc-900'
        >
          <p
            className={`text-center text-xl font-bold ${statusColors[ticket.status] ?? 'text-gray-400'}`}
          >
            {ticket.count}
          </p>
          <p className='text-center text-sm'>{ticket.status}</p>
        </div>
      ))}

      <div className='rounded-2xl border p-2 text-sm shadow-sm dark:border-neutral-700 dark:bg-zinc-900'>
        <p className='text-center text-xl font-bold text-purple-500'>
          {totalTickets}
        </p>
        <p className='text-center text-sm'>Total Tickets</p>
      </div>
    </div>
  )
}

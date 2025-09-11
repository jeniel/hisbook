import { Query } from '@/graphql/codegen/graphql'
import { CENSUS_TICKET_DATA } from '@/graphql/operation/query/census'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useQuery } from '@apollo/client'
import Spinner from '@/components/spinner'

interface Ticket {
  status: string
  count: number
}

export default function MyTicketsOverview() {
  // Always call ME_QUERY
  const {
    data: meData,
    loading: meLoading,
    error: meError,
  } = useQuery<Query>(ME_QUERY)

  // Extract userId
  const userId = meData?.meQuery?.user?.id

  // Always call CENSUS_TICKET_DATA
  const {
    data: ticketsData,
    loading: ticketsLoading,
    error: ticketsError,
  } = useQuery<Query>(
    CENSUS_TICKET_DATA,
    { variables: { userId: userId || '' }, skip: !userId } // skip query if no userId
  )

  if (meLoading) return <Spinner />
  if (meError) return <p>Error loading user: {meError.message}</p>
  if (!userId) return <p>No user found</p>

  if (ticketsLoading) return <Spinner />
  if (ticketsError) return <p>Error loading tickets: {ticketsError.message}</p>

  const ticketOverview = ticketsData?.getCensusSummary

  // Optional: ensure all statuses exist
  const statuses = ['Pending', 'Approved', 'Completed'] as const
  const ticketsByStatus = statuses.map((status) => {
    const ticket = ticketOverview?.ticketByUserId?.find(
      (t: Ticket) => t.status === status
    )
    return { status, count: ticket?.count || 0 }
  })

  const statusColors: Record<string, string> = {
    Pending: 'text-yellow-500',
    Approved: 'text-blue-500',
    Completed: 'text-green-500',
  }

  return (
    <div className='mb-2 grid grid-cols-4 gap-2'>
      {ticketsByStatus.map((t) => (
        <div
          key={t.status}
          className='rounded-2xl border p-2 text-sm shadow-sm dark:border-neutral-700 dark:bg-zinc-900'
        >
          <p
            className={`text-center text-xl font-bold ${statusColors[t.status]}`}
          >
            {t.count}
          </p>
          <p className='text-center text-sm'>{t.status}</p>
        </div>
      ))}

      {/* Total tickets card */}
      <div className='rounded-2xl border p-2 text-sm shadow-sm dark:border-neutral-700 dark:bg-zinc-900'>
        <p className='text-center text-xl font-bold text-purple-500'>
          {ticketOverview?.totalTicketsByUserId || 0}
        </p>
        <p className='text-center text-sm'>Total Tickets</p>
      </div>
    </div>
  )
}

import { CensusSummary } from '@/graphql/codegen/graphql'

const statusColors: Record<string, string> = {
  Pending: 'text-blue-400',
  Approved: 'text-yellow-400',
  Completed: 'text-green-400',
}

export default function AllTicketsOverview({ summary }: { summary: CensusSummary }) {
  const tickets = summary.ticketsByStatus ?? []

  // Sort tickets so that Pending is first
  const sortedTickets = [...tickets].sort((a, b) => {
    if (a.status === 'Pending') return -1
    if (b.status === 'Pending') return 1
    return 0
  })

  const totalTickets = summary.totalTickets ?? 0

  return (
    <div className="mb-2 grid grid-cols-2 gap-2 md:mb-0 md:grid-cols-4">
      {sortedTickets.map((ticket) => (
        <div
          key={ticket.status}
          className="rounded-2xl border p-2 text-sm shadow-sm dark:border-neutral-700 dark:bg-zinc-900"
        >
          <p
            className={`text-center text-xl font-bold ${
              statusColors[ticket.status] ?? 'text-gray-400'
            }`}
          >
            {ticket.count}
          </p>
          <p className="text-center text-sm">{ticket.status}</p>
        </div>
      ))}

      <div className="rounded-2xl border p-2 text-sm shadow-sm dark:border-neutral-700 dark:bg-zinc-900">
        <p className="text-center text-xl font-bold text-purple-500">
          {totalTickets}
        </p>
        <p className="text-center text-sm">Total Tickets</p>
      </div>
    </div>
  )
}

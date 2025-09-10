import { Link } from '@tanstack/react-router'
import { Ticket } from 'lucide-react'
import { useCensus } from '@/hooks/useCensus'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const statusColors: Record<string, string> = {
  Approved: 'text-yellow-400',
  Pending: 'text-blue-400',
  Completed: 'text-green-400',
}

export default function TicketsOverview({
  summary,
}: {
  summary: NonNullable<ReturnType<typeof useCensus>['summary']>
}) {
  const tickets = summary?.ticketsByStatus ?? []

  // Sort tickets so that Pending comes first
  const sortedTickets = [...tickets].sort((a, b) => {
    if (a.status === 'Pending') return -1
    if (b.status === 'Pending') return 1
    return 0
  })

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='flex flex-row items-center'>
          <Ticket className='mr-2 h-6 w-6 text-green-500' /> Tickets Overview by
          Status
        </CardTitle>
        <Link to='/admin-tickets'>
          <Button variant='outline'>
            <Ticket className='h-6 w-6 text-green-500' /> Go To Tickets
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          {sortedTickets.map((ticket) => (
            <Card key={ticket.status}>
              <CardContent className='font-semibold'>
                {ticket.status}
              </CardContent>
              <CardContent
                className={`text-2xl font-bold ${statusColors[ticket.status] || ''}`}
              >
                {ticket.count}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

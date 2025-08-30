import { Link } from '@tanstack/react-router'
import { Query } from '@/graphql/codegen/graphql'
import { CENSUS_DATA } from '@/graphql/operation/query/census'
import { useQuery } from '@apollo/client'
import { Ticket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Spinner from '@/components/spinner'

const statusColors = {
  Approved: 'text-yellow-400',
  Pending: 'text-blue-400',
  Completed: 'text-green-400',
}

export default function TicketsOverview() {
  const { data, loading, error } = useQuery<Query>(CENSUS_DATA)

  if (loading) return <Spinner />
  if (error) return <p>Error: {error.message}</p>

  const tickets = data?.getCensusSummary.ticketsByStatus ?? []

  // Sort tickets so that Pending comes first
  const sortedTickets = [...tickets].sort((a, b) => {
    if (a.status === 'Pending') return -1
    if (b.status === 'Pending') return 1
    return 0 // keep other statuses in original order
  })

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='flex flex-row items-center'>
          <Ticket className='h-6 w-6 text-green-500 mr-2' /> Tickets Overview by
          Status
        </CardTitle>
        <Link to='/admin-tickets'>
          <Button variant={'outline'}><Ticket className='h-6 w-6 text-green-500' />  Go To Tickets</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          {sortedTickets?.map((ticket) => (
            <Card key={ticket.status}>
              <CardContent className='font-semibold'>
                {ticket.status}
              </CardContent>
              <CardContent
                className={`text-2xl font-bold ${statusColors[ticket.status]}`}
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

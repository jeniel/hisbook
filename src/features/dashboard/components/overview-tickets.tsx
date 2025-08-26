import { Link } from '@tanstack/react-router'
import { Query } from '@/graphql/codegen/graphql'
import { CENSUS_DATA } from '@/graphql/operation/query/census'
import { useQuery } from '@apollo/client'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const statusColors = {
  Approved: 'text-yellow-400',
  Pending: 'text-blue-400',
  Completed: 'text-green-400',
}

export default function TicketsOverview() {
  const { data, loading, error } = useQuery<Query>(CENSUS_DATA)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const tickets = data?.getCensusSummary.ticketsByStatus

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>🎟️ Tickets Overview by Status</CardTitle>
        <Link to='/tickets'>
          <Button variant={'outline'}>🎫 Go To Tickets</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          {tickets?.map((ticket) => (
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

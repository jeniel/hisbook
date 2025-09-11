import { Ticket } from 'lucide-react'
import AllTickets from './components/all-tickets'
import AllTicketsOverview from './components/all-tickets-overview'
import { useCensus } from '@/hooks/useCensus'
import Spinner from '@/components/spinner'

export default function AdminTickets() {
  const { summary, loading, error } = useCensus()

  if (loading) return <Spinner />
  if (error) return <p>Error: {error.message}</p>
  if (!summary) return null

  return (
    <>
      <div className="mb-4 flex flex-row justify-between">
        <div>
          <h1 className="mb-2 flex items-center gap-2 text-3xl font-semibold">
            <Ticket className="h-10 w-10 text-green-500" />
            Requested Tickets / Services
          </h1>
          <p className="text-md text-muted-foreground">
            Update the Requested Tickets / Services
          </p>
        </div>
        <AllTicketsOverview summary={summary} />
      </div>
      <AllTickets />
    </>
  )
}

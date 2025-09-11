import { Hospital } from 'lucide-react'
import TicketsOverview from './components/overview-tickets'
import Summary from './components/summary-cards'
import Spinner from '@/components/spinner'
import { useCensus } from '@/hooks/useCensus'

export default function Dashboard() {
  const { summary, loading, error } = useCensus()

  if (loading) return <Spinner />
  if (error) return <p>Error: {error.message}</p>
  if (!summary) return null

  return (
    <>
      <h1 className="mb-2 flex items-center gap-2 text-3xl font-semibold">
        <Hospital className="h-10 w-10 text-red-500" />
        Dashboard
      </h1>
      <p className="text-md text-muted-foreground mb-4">Overview of ACE-Book</p>
      <div className="space-y-4 mb-4">
        <Summary summary={summary} />
        <TicketsOverview summary={summary} />
      </div>
    </>
  )
}

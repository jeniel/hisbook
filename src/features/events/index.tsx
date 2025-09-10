import { CalendarDays } from 'lucide-react'
import CreateEvent from './components/create-event'
import SummaryEvents from './components/summary-events'
import ViewEvents from './components/view-events'
import { useCensus } from '@/hooks/useCensus'
import Spinner from '@/components/spinner'

export default function Events() {
  const { summary, loading, error } = useCensus()

  if (loading) return <Spinner />
  if (error) return <p>Error: {error.message}</p>
  if (!summary) return null

  return (
    <>
      <div className="mb-4 flex flex-row items-center justify-between">
        <div>
          <h1 className="mb-2 flex items-center gap-2 text-3xl font-semibold">
            <CalendarDays className="text-primary h-10 w-10" />
            Events
          </h1>
          <p className="text-muted-foreground text-sm">
            Add, Update and Delete Events
          </p>
        </div>
        <SummaryEvents summary={summary} />
      </div>

      <div className="space-y-4">
        <CreateEvent />
        <ViewEvents />
      </div>
    </>
  )
}

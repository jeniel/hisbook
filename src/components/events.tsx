import { Query } from '@/graphql/codegen/graphql'
import { GET_ALL_EVENT } from '@/graphql/operation/query/event'
import { useQuery } from '@apollo/client'
import { Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Spinner from '@/components/spinner'

export default function Events() {
  const { data, loading, error } = useQuery<Query>(GET_ALL_EVENT)

  if (loading) return <Spinner />
  if (error) return <p className='text-red-500'>Failed to load events</p>

  const events = data?.findAllEvents?.data || []

  const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD

  // Filter upcoming events (including today)
  const upcomingEvents = events
    .filter(
      (event) => event.startDate && event.startDate.split('T')[0] >= today // compare date portion only
    )
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )

  // Separate today's events
  const todaysEvents = upcomingEvents.filter(
    (event) => event.startDate?.split('T')[0] === today
  )
  const futureEvents = upcomingEvents.filter(
    (event) => event.startDate?.split('T')[0] !== today
  )

  // Combine: today first, then other upcoming
  const sortedEvents = [...todaysEvents, ...futureEvents].slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex flex-row items-center gap-2 text-lg font-semibold'>
          <Calendar className='text-red-500' />
          Events
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-row gap-3 overflow-x-auto lg:flex-col lg:overflow-visible'>
        {sortedEvents.length === 0 ? (
          <p className='text-muted-foreground text-sm'>No upcoming events</p>
        ) : (
          sortedEvents.map((event) => (
            <div
              key={event.id}
              className={`flex min-w-[160px] flex-col items-center justify-between border-b pb-2 last:border-none lg:min-w-0 lg:flex-row lg:items-center ${
                event.startDate?.split('T')[0] === today ? 'text-blue-500' : ''
              }`}
            >
              <div className='text-center lg:text-left'>
                <p className='font-medium'>{event.title}</p>
                <p className='text-muted-foreground text-sm'>
                  {event.startDate
                    ? new Date(event.startDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'TBD'}
                </p>
                <p className='text-muted-foreground text-sm'>
                  {event.location}
                </p>
              </div>
              {event.detailsUrl && (
                <Button
                  size='sm'
                  variant='outline'
                  asChild
                  className='mt-2 lg:mt-0'
                >
                  <a
                    href={event.detailsUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    🎉 View
                  </a>
                </Button>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

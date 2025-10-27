import { Query } from '@/graphql/codegen/graphql'
import { GET_ALL_EVENT } from '@/graphql/operation/query/event'
import { useQuery } from '@apollo/client'
import { Calendar } from 'lucide-react'
import { formatDate } from '@/utils/formatDate'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import Spinner from '@/components/spinner'

export default function Events() {
  const { data, loading, error } = useQuery<Query>(GET_ALL_EVENT)

  if (loading) return <Spinner />
  if (error) return <p className='text-red-500'>Failed to load events</p>

  const events = data?.findAllEvents?.data || []
  const today = new Date().toISOString().split('T')[0]

  const upcomingEvents = events
    .filter(
      (event) => event.startDate && event.startDate.split('T')[0] >= today
    )
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )

  const todaysEvents = upcomingEvents.filter(
    (event) => event.startDate?.split('T')[0] === today
  )
  const futureEvents = upcomingEvents.filter(
    (event) => event.startDate?.split('T')[0] !== today
  )

  const sortedEvents = [...todaysEvents, ...futureEvents].slice(0, 6)

  return (
    <section className='py-4'>
      <p className='mb-4 flex items-center gap-2 text-xl md:text-2xl'>
        <Calendar className='text-indigo-500' />
        Events
      </p>
      <div className='flex gap-6 overflow-x-auto pb-2'>
        {sortedEvents.length === 0 ? (
          <p className='text-muted-foreground text-sm'>No upcoming events</p>
        ) : (
          sortedEvents.map((event) => {
            const isToday = event.startDate?.split('T')[0] === today
            return (
              <Card
                key={event.id}
                className={`min-w-[250px] flex-shrink-0 cursor-pointer rounded-2xl shadow-lg ${
                  isToday
                    ? 'border-green-500'
                    : 'border-blue-300 hover:border-blue-500'
                }`}
              >
                <CardHeader className='flex flex-col items-center text-center'>
                  <CardTitle className='text-lg'>{event.title}</CardTitle>
                  <CardDescription className='mt-2 text-gray-500'>
                    {formatDate(event.startDate, true)}
                  </CardDescription>
                  <CardDescription className='text-muted-foreground'>
                    {event.location}
                  </CardDescription>
                  {event.detailsUrl && (
                    <Button
                      size='sm'
                      variant='outline'
                      asChild
                      className='mt-3'
                    >
                      <a
                        href={event.detailsUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        View Details Here
                      </a>
                    </Button>
                  )}
                </CardHeader>
              </Card>
            )
          })
        )}
      </div>
    </section>
  )
}

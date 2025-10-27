import { Event } from '@/graphql/codegen/graphql'
import { MapPin, Calendar, ExternalLink } from 'lucide-react'
import { formatDate } from '@/utils/formatDate'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import DeleteEvent from './delete-event'
import EditEvent from './edit-event'

interface EventListProps {
  events: Event[]
  refetch: () => void
}

export default function EventList({ events, refetch }: EventListProps) {
  return (
    <div className='space-y-6'>
      {/* List */}
      {events.length === 0 ? (
        <div className='text-muted-foreground text-center'>No Events Found</div>
      ) : (
        <div className='space-y-4'>
          {events.map((event) => (
            <Card key={event.id} className='shadow-sm'>
              <CardHeader className='flex flex-col gap-3 space-y-0 sm:flex-row sm:items-center sm:justify-between'>
                <CardTitle className='text-lg font-semibold'>
                  {event.title}
                </CardTitle>
                <div className='flex flex-wrap gap-2 sm:justify-end'>
                  {event.detailsUrl && (
                    <Button size='sm' asChild>
                      <a
                        href={event.detailsUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <ExternalLink className='mr-1 h-4 w-4' />
                        View Event Details
                      </a>
                    </Button>
                  )}
                  <EditEvent event={event} onUpdated={refetch} />
                  <DeleteEvent event={event} onDeleted={refetch} />
                </div>
              </CardHeader>

              <CardContent className='text-muted-foreground space-y-1 text-sm'>
                <p className='flex items-center gap-2'>
                  <MapPin className='h-4 w-4 text-blue-500' />
                  {event.location}
                </p>
                <p className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4 text-green-500' />
                  Start: {formatDate(event.startDate, true)}
                </p>
                <p className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4 text-red-500' />
                  End: {formatDate(event.endDate, true)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

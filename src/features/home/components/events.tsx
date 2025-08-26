import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const events = [
  {
    id: 1,
    title: 'Community Meetup',
    date: 'Aug 30, 2025',
    location: 'Town Hall',
  },
  {
    id: 2,
    title: 'Hackathon 2025',
    date: 'Sep 12, 2025',
    location: 'Tech Park',
  },
  {
    id: 3,
    title: 'Charity Fun Run',
    date: 'Oct 5, 2025',
    location: 'Central Park',
  },
]

export default function Events() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        {events.map((event) => (
          <div key={event.id} className='border-b pb-2 last:border-none'>
            <div className='flex flex-row items-center justify-between'>
              <div>
                <p className='font-medium'>{event.title}</p>
                <p className='text-muted-foreground text-sm'>{event.date}</p>
                <p className='text-muted-foreground text-sm'>
                  {event.location}
                </p>
              </div>
              <Button size='sm'>View Event</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

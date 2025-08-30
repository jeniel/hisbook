import { Ticket } from 'lucide-react'
import AllTickets from './components/all-tickets'
import AllTicketsOverview from './components/all-tickets-overview'

export default function AdminTickets() {
  return (
    <>
      <div className='mb-4 flex flex-row justify-between'>
        <div>
          <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
            <Ticket className='h-10 w-10 text-green-500' />
            Admin Tickets
          </h1>
          <p className='text-md text-muted-foreground'>
            Update Tickets of the Users
          </p>
        </div>
        <AllTicketsOverview />
      </div>
      <AllTickets />
    </>
  )
}

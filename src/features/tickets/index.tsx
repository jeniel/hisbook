import { Ticket } from 'lucide-react'
import CreateTickets from './components/create-tickets'
import MyTickets from './components/my-tickets'
import MyTicketsOverview from './components/my-tickets-overview'

export default function Tickets() {
  return (
    <>
      <div className='mb-4 flex flex-row items-center justify-between'>
        <div>
          <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
            <Ticket className='text-green-500 h-7 w-7' />
            Tickets
          </h1>
          <p className='text-muted-foreground text-sm'>
            Create and View Your Tickets
          </p>
        </div>
        <MyTicketsOverview />
      </div>

      <div className='space-y-4'>
        <CreateTickets />
        <MyTickets />
      </div>
    </>
  )
}

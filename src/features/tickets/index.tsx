import { Ticket } from 'lucide-react'
import Events from '../home/components/events'
import CreateTickets from './components/create-tickets'
import MyTickets from './components/my-tickets'
import MyTicketsOverview from './components/my-tickets-overview'

export default function Tickets() {
  return (
    <>
      <div className='mb-4 flex flex-col items-start justify-between md:flex-row md:items-center'>
        <div className='mb-4 md:mb-0'>
          <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
            <Ticket className='h-10 w-10 text-green-500' />
            Tickets / Services
          </h1>
          <p className='text-muted-foreground text-sm'>
            Create and View Your Requested Tickets and Services
          </p>
        </div>
        <div>
          <MyTicketsOverview />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 pb-4 md:grid-cols-4'>
        <div className='order-2 space-y-4 md:order-1 md:col-span-3'>
          <div className='space-y-4'>
            <CreateTickets />
            <MyTickets />
          </div>
        </div>

        {/* Right Column */}
        <div className='order-1 space-y-4 md:order-2 md:col-span-1'>
          <Events />
        </div>
      </div>
    </>
  )
}

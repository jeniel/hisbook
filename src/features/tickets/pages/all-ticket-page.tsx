import { Ticket } from 'lucide-react'
import AllTickets from '../components/all-tickets'

export default function AllTicketPage() {
  return (
    <>
      <div className='mb-4'>
        <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
          <Ticket className='h-10 w-10 text-green-500' />
          All Tickets
        </h1>
        <p className='text-md text-muted-foreground'>All Tickets</p>
      </div>
      <AllTickets />
    </>
  )
}

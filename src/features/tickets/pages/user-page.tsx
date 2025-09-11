import { Ticket } from 'lucide-react'
import CreateTickets from '../components/create-tickets'
import MyTickets from '../components/my-tickets'

export default function Tickets() {
  return (
    <>
      <div className='mb-4'>
        <div>
          <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
            <Ticket className='h-10 w-10 text-green-500' />
            Tickets
          </h1>
          <p className='text-muted-foreground text-sm'>
            Create and View Your Tickets
          </p>
        </div>
      </div>

      <div className='space-y-4'>
        <CreateTickets />
        <MyTickets />
      </div>
    </>
  )
}

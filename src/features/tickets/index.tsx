import CreateTickets from './components/create-tickets'
import MyTickets from './components/my-tickets'
import MyTicketsOverview from './components/my-tickets-overview'

export default function Tickets() {
  return (
    <>
      <div className='flex flex-row items-center justify-between mb-4'>
        <div className='space-y-2'>
          <h1 className='text-3xl font-semibold'>🎟️ Tickets</h1>
          <p className='text-md text-muted-foreground'>
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

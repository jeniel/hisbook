import AllTickets from './components/all-tickets'
import AllTicketsOverview from './components/all-tickets-overview'

export default function AdminTickets() {
  return (
    <>
      <div className='mb-4 flex-row flex justify-between'>
        <div>
          <h1 className='text-3xl font-semibold'>🎟️ Admin Tickets</h1>
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

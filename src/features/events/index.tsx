import CreateEvent from './components/create-event'
import ViewEvents from './components/view-events'

export default function Events() {
  return (
    <>
      <h1 className='mb-2 text-3xl font-semibold'>📅 Events</h1>
      <p className='text-md text-muted-foreground mb-4'>
        Add, Update and Delete Events
      </p>

      <div className='space-y-4'>
        <CreateEvent />
        <ViewEvents />
      </div>
    </>
  )
}

import { CalendarDays } from 'lucide-react'
import ViewEvents from './components/view-events'

export default function Events() {
  return (
    <>
      <div className='mb-4'>
        <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
          <CalendarDays className='text-primary h-10 w-10' />
          Events
        </h1>
        <p className='text-md text-muted-foreground'>
          Add, Update and Delete Events
        </p>
      </div>

      <ViewEvents />
    </>
  )
}

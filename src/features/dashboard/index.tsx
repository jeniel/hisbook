import { Hospital } from 'lucide-react'
import DepartmentOverview from './components/overview-departments'
import TicketsOverview from './components/overview-tickets'
import Summary from './components/summary-cards'

export default function Dashboard() {
  return (
    <>
      <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
        <Hospital className='h-10 w-10 text-red-500' />
        Departments
      </h1>
      <p className='text-md text-muted-foreground mb-4'>Overview of ACE-Book</p>
      <div className='space-y-4'>
        <Summary />
        <TicketsOverview />
        <DepartmentOverview />
      </div>
    </>
  )
}

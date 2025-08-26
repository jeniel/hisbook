import DepartmentOverview from './components/overview-departments'
import TicketsOverview from './components/overview-tickets'
import Summary from './components/summary-cards'

export default function Dashboard() {
  return (
    <>
      <p className='mb-2 text-3xl font-semibold'>🏥 Admin Dashboard</p>
      <p className='text-md text-muted-foreground mb-4'>Overview of ACE-Book</p>
      <div className='space-y-4'>
        <Summary />
        <TicketsOverview />
        <DepartmentOverview />
      </div>
    </>
  )
}

import CreateUser from './components/create-user'
import SummaryUsers from './components/summary-users'
import ViewUsers from './components/view-user'

export default function Users() {
  return (
    <>
      <div className='mb-4 flex flex-row items-center justify-between'>
        <div>
          <h1 className='mb-2 text-3xl font-semibold'>🧑🏽 Users</h1>
          <p className='text-md text-muted-foreground'>
            Add, Update and Delete Users
          </p>
        </div>
        <SummaryUsers />
      </div>
      
      <div className='space-y-4'>
        <CreateUser />
        <ViewUsers />
      </div>
    </>
  )
}

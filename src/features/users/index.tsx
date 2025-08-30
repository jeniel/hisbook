import { UserPen } from 'lucide-react'
import CreateUser from './components/create-user'
import SummaryUsers from './components/summary-users'
import ViewUsers from './components/view-user'

export default function Users() {
  return (
    <>
      <div className='mb-4 flex flex-row items-center justify-between'>
        <div>
          <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
            <UserPen className='h-10 w-10 text-blue-500' />
            Users
          </h1>
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

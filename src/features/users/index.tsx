import { UserPen } from 'lucide-react'
import ViewUsers from './components/view-user'

export default function Users() {
  return (
    <>
      <div className='mb-4'>
        <div>
          <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
            <UserPen className='h-10 w-10 text-blue-500' />
            Users
          </h1>
          <p className='text-md text-muted-foreground'>
            Add, Update and Delete Users
          </p>
        </div>
      </div>

      <ViewUsers />
    </>
  )
}

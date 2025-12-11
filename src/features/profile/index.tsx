import { UserPen } from 'lucide-react'
import EditProfile from './components/edit-profile'

export default function Profile() {
  return (
    <>
      <div>
        <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
          <UserPen className='h-10 w-10 text-blue-500' />
          Profile
        </h1>
        <p className='text-muted-foreground mb-4 text-sm'>
          Update Your Profile
        </p>
      </div>

      <div className="space-y-4 mb-4">
        <EditProfile />
      </div>
    </>
  )
}

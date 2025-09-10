import { UserPen } from 'lucide-react'
import Events from '../home/components/events'
import EditProfile from './components/edit-profile'

export default function Profile() {
  return (
    <>
      <div>
        <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
          <UserPen className='h-10 w-10 text-blue-500' />
          Profile
        </h1>
        <p className='text-sm text-muted-foreground mb-4'>
          Update Your Profile
        </p>
      </div>
      <div className='grid grid-cols-1 gap-4 pb-4 md:grid-cols-4'>

        {/* Left Column */}
        <div className='order-2 space-y-4 md:order-1 md:col-span-3'>
          <EditProfile />
        </div>

        {/* Right Column */}
        <div className='order-1 space-y-4 md:order-2 md:col-span-1'>
          <Events />
        </div>
      </div>
    </>
  )
}

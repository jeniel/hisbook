import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import CreatePost from '../home/components/create-post'
// import ProfileFeed from './components/profile-feed'

export default function Profile() {
  return (
    <>
      <div className='flex flex-row items-center justify-between mb-4'>
        <div className='space-y-2'>
          <h1 className='text-3xl font-semibold'>👤 Profile</h1>
          <p className='text-md text-muted-foreground'>See Your Posts</p>
        </div>

        <Link to='/edit-profile'>
          <Button variant={'outline'}>🖊️ Edit Profile</Button>
        </Link>
      </div>
      <CreatePost />
      {/* <ProfileFeed /> */}
    </>
  )
}

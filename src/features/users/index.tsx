import CreateUser from './components/create-user'
import ViewUsers from './components/view-user'

export default function Users() {
  return (
    <>
      <h1 className='mb-2 text-3xl font-semibold'>🧑🏽 Users</h1>
      <p className='text-md text-muted-foreground mb-4'>
        Add, Update and Delete Users
      </p>

      <div className='space-y-4'>
        <CreateUser />
        <ViewUsers />
      </div>
    </>
  )
}

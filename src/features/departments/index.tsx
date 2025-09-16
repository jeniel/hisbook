import { Hotel } from 'lucide-react'
import ViewDepartments from './components/view-deparments'

export default function Departments() {
  return (
    <>
      <div className='mb-4'>
        <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
          <Hotel className='h-10 w-10 text-purple-500' />
          Departments
        </h1>
        <p className='text-md text-muted-foreground'>
          Add, Update and Delete Departments
        </p>
      </div>

      <ViewDepartments />
    </>
  )
}

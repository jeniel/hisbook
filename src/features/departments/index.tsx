import CreateDepartment from './components/create-department'
import SummaryDepartments from './components/summary-departments'
import ViewDepartments from './components/view-deparments'

export default function Departments() {
  return (
    <>
      <div className='mb-4 flex flex-row items-center justify-between'>
        <div>
          <h1 className='mb-2 text-3xl font-semibold'>🏢 Departments</h1>
          <p className='text-md text-muted-foreground'>
            Add, Update and Delete Departments
          </p>
        </div>
        <SummaryDepartments />
      </div>

      <div className='space-y-4'>
        <CreateDepartment />
        <ViewDepartments />
      </div>
    </>
  )
}

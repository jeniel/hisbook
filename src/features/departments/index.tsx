import CreateDepartment from './components/create-department'
import ViewDepartments from './components/view-deparments'

export default function Departments() {
  return (
    <>
      <h1 className='mb-2 text-3xl font-semibold'>🏢 Departments</h1>
      <p className='text-md text-muted-foreground mb-4'>
        Add, Update and Delete Departments
      </p>
      <div className="space-y-4">
        <CreateDepartment />
        <ViewDepartments />
      </div>
    </>
  )
}

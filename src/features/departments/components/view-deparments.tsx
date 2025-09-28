import { Department } from '@/graphql/codegen/graphql'
import { Card, CardContent } from '@/components/ui/card'
import DeleteDepartment from './delete-department'
import EditDepartment from './edit-department'

interface DepartmentListProps {
  departments: Department[]
  refetch: () => void
}

export default function DepartmentList({
  departments,
  refetch,
}: DepartmentListProps) {
  return (
    <div className='space-y-6'>
      {departments.length === 0 ? (
        <div className='text-muted-foreground text-center'>
          No Departments Found
        </div>
      ) : (
        <div className='space-y-4'>
          {departments.map((department) => (
            <Card key={department.id} className='shadow-sm'>
              <CardContent>
                <div className='flex flex-col gap-3 space-y-0 sm:flex-row sm:items-center sm:justify-between'>
                  <div className='flex items-center gap-2 text-lg font-semibold'>
                    {department.name}
                    {department.isSupport && (
                      <span className='rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700'>
                        Support
                      </span>
                    )}
                  </div>

                  <div className='flex flex-wrap gap-2 sm:justify-end'>
                    <EditDepartment
                      department={department}
                      onUpdated={refetch}
                    />
                    <DeleteDepartment
                      department={department}
                      onDeleted={refetch}
                    />
                  </div>
                </div>
                <div className='text-muted-foreground space-y-1 text-sm'>
                  {department.description || 'No description provided.'}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

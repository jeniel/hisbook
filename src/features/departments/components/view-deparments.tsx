import { Hotel } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Pagination from '@/components/pagination'
import Spinner from '@/components/spinner'
import useDepartments from '../hooks/useDepartments'
import CreateDepartment from './create-department'
import DeleteDepartment from './delete-department'
import EditDepartment from './edit-department'

export default function ViewDepartments() {
  const { departments, loading, error, page, setPage, totalPages, refetch } =
    useDepartments()

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    refetch()
  }

  return (
    <Card>
      <CardContent>
        <div className='mb-4 flex flex-row items-center justify-between'>
          <h1 className='mb-2 flex items-center gap-2 text-xl font-semibold'>
            <Hotel className='h-6 w-6 text-purple-500' />
            Departments
          </h1>
          <CreateDepartment onCreated={refetch} />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Department</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className='h-40 text-center'>
                  <div className='flex items-center justify-center'>
                    <Spinner />
                  </div>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={4} className='text-center text-red-500'>
                  Error: {error}
                </TableCell>
              </TableRow>
            ) : departments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className='text-center'>
                  No departments found
                </TableCell>
              </TableRow>
            ) : (
              departments.map((department) => (
                <TableRow key={department.id}>
                  <TableCell>{department.name}</TableCell>
                  <TableCell>{department.description}</TableCell>
                  <TableCell className='flex flex-row items-center space-x-2'>
                    <EditDepartment
                      department={department}
                      onUpdated={refetch}
                    />
                    <DeleteDepartment
                      department={department}
                      onDelete={refetch}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {totalPages > 1 && !loading && (
          <Pagination
            currentPage={page}
            lastPage={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </CardContent>
    </Card>
  )
}

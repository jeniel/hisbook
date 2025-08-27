import { useState } from 'react'
import { Query } from '@/graphql/codegen/graphql'
import { FIND_ALL_DEPARTMENTS } from '@/graphql/operation/query/department'
import { useQuery } from '@apollo/client'
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
import DeleteDepartment from './delete-department'
import EditDepartment from './edit-department'
import Spinner from '@/components/spinner'

export default function ViewDepartments() {
  const [page, setPage] = useState(1)
  const perPage = 10

  const { data, loading, error, refetch } = useQuery<Query>(
    FIND_ALL_DEPARTMENTS,
    {
      variables: { page, perPage },
      fetchPolicy: 'cache-and-network',
    }
  )

  if (loading) return <Spinner />
  if (error) return <p>Error: {error.message}</p>

  const departments = data?.findAllDepartments?.data || []
  const meta = data?.findAllDepartments?.meta

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    refetch({ page: newPage, perPage })
  }

  return (
    <Card>
      <CardContent>
        <p className='text-lg font-semibold'>🏢 All Departments</p>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className='text-center'>
                  No departments found
                </TableCell>
              </TableRow>
            ) : (
              departments.map((department, index) => (
                <TableRow key={department.id}>
                  <TableCell>{index + 1 + (page - 1) * perPage}</TableCell>
                  <TableCell>{department.name}</TableCell>
                  <TableCell>{department.description}</TableCell>
                  <TableCell className='flex flex-row items-center space-x-2'>
                    <EditDepartment
                      department={department}
                      onUpdated={() => refetch()}
                    />
                    <DeleteDepartment
                      department={department}
                      onDelete={() => refetch()}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {meta && (
          <Pagination
            currentPage={meta.currentPage}
            lastPage={meta.lastPage}
            onPageChange={handlePageChange}
          />
        )}
      </CardContent>
    </Card>
  )
}

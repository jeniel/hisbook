import { useState } from 'react'
import { Query } from '@/graphql/codegen/graphql'
import { FIND_ALL_USER } from '@/graphql/operation/query/user'
import { useQuery } from '@apollo/client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import DeleteUser from './delete-user'
import EditUser from './edit-user'
import Pagination from '@/components/pagination'

export default function ViewUsers() {
  const [page, setPage] = useState(1)
  const perPage = 10

  const { loading, error, data, refetch } = useQuery<Query>(FIND_ALL_USER, {
    variables: { page, perPage },
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return <p>Loading users...</p>
  if (error) return <p>Error loading users: {error.message}</p>

  const Users = data?.findAllUsers?.data || []
  const meta = data?.findAllUsers?.meta

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    refetch({ page: newPage, perPage })
  }

  return (
    <div>
      <p className='text-lg font-semibold'>All Users</p>
      <p className='mb-4 text-sm italic'>
        Note: IT staff are only allowed Edit and Create Users
      </p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Users.map((user, index: number) => (
            <TableRow key={user.id}>
              <TableCell>{index + 1 + (page - 1) * perPage}</TableCell>
              <TableCell>
                {user.profile?.lastName}, {user.profile?.firstName}
              </TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.department?.name ?? '—'}</TableCell>
              <TableCell className='flex flex-row items-center space-x-2'>
                <EditUser user={user} onUpdated={() => refetch()} />
                <DeleteUser
                  user={{ id: user.id, username: user.username }}
                  onDelete={() => refetch()}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {meta && (
        <Pagination
          currentPage={meta.currentPage}
          lastPage={meta.lastPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

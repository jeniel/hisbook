import { User } from '@/graphql/codegen/graphql'
import { User as UserIcon, Shield, Building } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import DeleteUser from './delete-user'
import EditUser from './edit-user'
import ViewUser from './view-user'

interface UserListProps {
  users: User[]
  refetch: () => void
}

export default function UserList({ users, refetch }: UserListProps) {
  if (users.length === 0)
    return (
      <div className='text-muted-foreground text-center'>No Users Found</div>
    )

  return (
    <div className='space-y-4'>
      {users.map((user) => (
        <Card key={user.id} className='shadow-sm'>
          <CardContent>
            {/* Header */}
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
              <h1 className='text-lg font-semibold'>
                {user.profile?.lastName}, {user.profile?.firstName}{' '}
                {user.profile?.employeeID && `(${user.profile.employeeID})`}
              </h1>
              <div className='flex flex-wrap gap-2 sm:justify-end'>
                <ViewUser userId={user.id} />
                <EditUser user={user} onUpdated={refetch} />
                <DeleteUser user={user} onDelete={refetch} />
              </div>
            </div>

            {/* Info */}
            <div className='text-muted-foreground mt-2 space-y-1 text-sm'>
              <p className='flex items-center gap-2'>
                <UserIcon className='h-4 w-4 text-blue-500' /> Username:{' '}
                {user.username}
              </p>
              <p className='flex items-center gap-2'>
                <Shield className='h-4 w-4 text-red-500' /> Role: {user.role}
              </p>
              <p className='flex items-center gap-2'>
                <Building className='h-4 w-4 text-purple-500' /> Department:{' '}
                {user.department?.name ?? '—'}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

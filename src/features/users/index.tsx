import { Query } from '@/graphql/codegen/graphql'
import { FIND_ALL_USER } from '@/graphql/operation/query/user'
import { useQuery } from '@apollo/client'
import { Main } from '@/components/layout/main'
import Spinner from '@/components/spinner'
import { columns } from './components/users-columns'
import { UsersDialogs } from './components/users-dialogs'
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import { UsersTable } from './components/users-table'
import UsersProvider from './context/users-context'
import { transformApiUsersToTableData, ApiUser } from './types'

export default function Users() {
  const { data, loading, error, refetch } = useQuery<Query>(FIND_ALL_USER)

  // Transform API data to match table expectations
  const apiUsers = (data?.findAllUsers.data || []) as ApiUser[]
  const userList = transformApiUsersToTableData(apiUsers)

  if (loading) {
    return (
      <Main>
        <div className='flex h-64 items-center justify-center'>
          <Spinner />
        </div>
      </Main>
    )
  }

  if (error) {
    return (
      <Main>
        <div className='flex h-64 items-center justify-center'>
          <div className='text-center'>
            <h3 className='text-lg font-semibold text-red-600'>
              Error loading users
            </h3>
            <p className='text-muted-foreground mt-2'>{error.message}</p>
          </div>
        </div>
      </Main>
    )
  }

  return (
    <UsersProvider>
      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>User List</h2>
            <p className='text-muted-foreground'>
              Manage your users and their roles here.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <UsersTable data={userList} columns={columns} />
        </div>
      </Main>

      <UsersDialogs refetch={refetch} />
    </UsersProvider>
  )
}

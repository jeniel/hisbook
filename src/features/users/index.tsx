import { useState } from 'react'
import { UserPen } from 'lucide-react'
import Pagination from '@/components/pagination'
import SearchBar from '@/components/search-bar'
import Spinner from '@/components/spinner'
import UserList from './components/view-user'
import CreateUser from './components/create-user'
import useUserQuery from './hooks/useUserQuery'

export default function Users() {
  const [search] = useState('')
  const { users, loading, error, refetch, page, perPage, setPage, totalPages } =
    useUserQuery(10, search)

  return (
    <div className='mb-4'>
      {/* Page Header */}
      <div className='mb-4'>
        <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
          <UserPen className='h-10 w-10 text-blue-500' />
          Users
        </h1>
        <p className='text-md text-muted-foreground'>
          Add, Update and Delete Users
        </p>
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        {/* Create Form */}

        <div className='order-1 lg:order-2'>
          <CreateUser onCreated={refetch} />
        </div>

        {/* User List */}
        <div className='order-2 space-y-4 lg:order-1 lg:col-span-2'>
          <SearchBar
            placeholder='Search users...'
            onSearch={(value) => refetch({ page: 1, perPage, search: value })}
          />

          {loading ? (
            <Spinner />
          ) : error ? (
            <p className='p-2 text-red-500'>{error.message}</p>
          ) : (
            <UserList
              users={users}
              refetch={refetch}
              page={page}
              perPage={perPage}
            />
          )}

          {/* Pagination */}
          <div className='mt-2 flex justify-center'>
            <Pagination
              currentPage={page}
              lastPage={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

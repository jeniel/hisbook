import { useState } from 'react'
import { Hotel } from 'lucide-react'
import Pagination from '@/components/pagination'
import SearchBar from '@/components/search-bar'
import Spinner from '@/components/spinner'
import CreateDepartment from './components/create-department'
import ViewDepartments from './components/view-deparments'
import useDepartmentsQuery from './hooks/useDepartmentsQuery'

export default function Departments() {
  const [search] = useState('')
  const {
    departments,
    loading,
    error,
    refetch,
    page,
    perPage,
    setPage,
    totalPages,
  } = useDepartmentsQuery(10, search)

  return (
    <div className='mb-4'>
      {/* Page Header */}
      <div className='mb-4'>
        <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
          <Hotel className='h-10 w-10 text-purple-500' />
          Departments
        </h1>
        <p className='text-md text-muted-foreground'>
          Add, Update and Delete Departments
        </p>
      </div>

      {/* Responsive Grid */}
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        {/* Create Form (Top on mobile, right on desktop) */}
        <div className='order-1 lg:order-2'>
          <CreateDepartment onCreated={refetch} />
        </div>

        {/* Department List (Below create on mobile, left on desktop) */}
        <div className='order-2 space-y-4 lg:order-1 lg:col-span-2'>
          {/* Search Bar */}
          <SearchBar
            placeholder='Search departments...'
            onSearch={(value) => {
              refetch({ page: 1, perPage, search: value })
            }}
          />

          {loading ? (
            <Spinner />
          ) : error ? (
            <p className='p-2 text-red-500'>{error.message}</p>
          ) : (
            <ViewDepartments departments={departments} refetch={refetch} />
          )}

          {/* Pagination */}
          {totalPages > 1 && !loading && (
            <div className='mt-2 flex justify-center'>
              <Pagination
                currentPage={page}
                lastPage={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

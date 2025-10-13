import { useState } from 'react'
import { CalendarDays } from 'lucide-react'
import Pagination from '@/components/pagination'
import SearchBar from '@/components/search-bar'
import Spinner from '@/components/spinner'
import CreateEvent from './components/create-event'
import EventList from './components/view-events'
import useEventsQuery from './hooks/useEventQuery'

export default function Events() {
  const [search] = useState('')
  const {
    events,
    loading,
    error,
    refetch,
    page,
    perPage,
    setPage,
    totalPages,
  } = useEventsQuery(10, search)

  return (
    <div className='mb-4'>
      {/* Page Header */}
      <div className='mb-4'>
        <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
          <CalendarDays className='text-primary h-10 w-10' />
          Events
        </h1>
        <p className='text-md text-muted-foreground'>
          Add, Update and Delete Events
        </p>
      </div>

      {/* Responsive Grid */}
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        {/* Create Form (Top on mobile, right on desktop) */}
        <div className='order-1 lg:order-2'>
          <CreateEvent onCreated={refetch} />
        </div>

        {/* Event List (Below create on mobile, left on desktop) */}
        <div className='order-2 space-y-4 lg:order-1 lg:col-span-2'>
          {/* Search Bar */}
          <SearchBar
            placeholder='Search events...'
            onSearch={(value) => refetch({ page: 1, perPage, search: value })}
          />

          {loading ? (
            <Spinner />
          ) : error ? (
            <p className='p-2 text-red-500'>{error.message}</p>
          ) : (
            <EventList events={events} refetch={refetch} />
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

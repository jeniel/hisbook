import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Ticket, TicketIcon } from 'lucide-react'
import useMeQuery from '@/hooks/useMeQuery'
import { Button } from '@/components/ui/button'
import Pagination from '@/components/pagination'
import SearchBar from '@/components/search-bar'
import Spinner from '@/components/spinner'
import useTicketQuery from '@/features/tickets/hooks/useTicketQuery'
import AuditLogsContent from '../components/audit-logs'
import DeleteTicket from '../components/delete-ticket'
import ListView from '../components/list-view'
import UpdateTicket from '../components/update-tickets'
import ViewTicket from '../components/view-ticket'

export default function DepartmentTickets() {
  const [search, setSearch] = useState('')

  const {
    departmentId,
    departmentName,
    loading: meLoading,
    error: meError,
  } = useMeQuery()

  const {
    tickets,
    totalPages,
    loading,
    error,
    refetch,
    page,
    perPage,
    setPage,
  } = useTicketQuery({
    departmentId,
    initialPerPage: 10,
    mode: 'department',
    initialSearch: search,
  })

  if (meLoading || loading) return <Spinner />
  if (meError) return <p>Error loading user or department: {meError.message}</p>
  if (error) return <p>Error loading tickets: {error.message}</p>

  return (
    <>
      {/* Header */}
      <div className='mb-4 flex flex-col items-center justify-between gap-4 md:flex-row'>
        <h1 className='text-md mb-2 flex items-center gap-2 font-semibold md:text-3xl'>
          <Ticket className='h-10 w-10 text-green-500' />
          {departmentName} Tickets
        </h1>

        <div className='flex items-center gap-2'>
          <Link to='/received-tickets'>
            <Button
              variant='outline'
              className='flex items-center gap-2'
              size='lg'
            >
              <TicketIcon className='h-6 w-6 text-green-500' />
              Received Tickets
            </Button>
          </Link>
        </div>
      </div>

      {/* 🔎 Search bar */}
      <div className='mb-4'>
        <SearchBar
          placeholder='Search tickets...'
          onSearch={(value) => {
            setSearch(value)
            refetch({ page: 1, perPage, search: value })
            setPage(1)
          }}
        />
      </div>

      {/* Tickets List */}
      <ListView
        tickets={tickets}
        renderActions={(ticket) => (
          <>
            <ViewTicket ticket={ticket} />
            <UpdateTicket ticket={ticket} onUpdated={refetch} />
            <AuditLogsContent ticketId={ticket.id} />
            <DeleteTicket ticketId={ticket.id} onDelete={refetch} />
          </>
        )}
      />

      {/* Pagination */}
      <div className='my-4'>
        <Pagination
          currentPage={page}
          lastPage={totalPages}
          onPageChange={(newPage) => {
            setPage(newPage)
            refetch({ page: newPage, perPage, search })
          }}
        />
      </div>
    </>
  )
}

import { useState } from 'react'
import { Ticket } from 'lucide-react'
import Pagination from '@/components/pagination'
import Spinner from '@/components/spinner'
import SearchBar from '@/components/search-bar'
import AuditLogsContent from '../components/audit-logs'
import DeleteTicket from '../components/delete-ticket'
import ListView from '../components/list-view'
import UpdateTicket from '../components/update-tickets'
import ViewTicket from '../components/view-ticket'
import useTicketQuery from '../hooks/useTicketQuery'

export default function AllTickets() {
  const [search, setSearch] = useState('')

  const {
    tickets,
    loading,
    page,
    perPage,
    setPage,
    totalPages,
    error,
    refetch,
  } = useTicketQuery({
    mode: 'all',
    initialSearch: search,
  })

  return (
    <>
      <div className='mb-4'>
        <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
          <Ticket className='h-10 w-10 text-green-500' />
          All Tickets
        </h1>
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

      {loading ? (
        <Spinner />
      ) : error ? (
        <p className='text-red-500'>Error: {error.message}</p>
      ) : (
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
      )}

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

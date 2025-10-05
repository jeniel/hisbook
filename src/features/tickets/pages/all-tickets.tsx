import { useState } from 'react'
import { Ticket } from 'lucide-react'
import Pagination from '@/components/pagination'
import SearchBar from '@/components/search-bar'
import Spinner from '@/components/spinner'
import StatusFilter from '@/components/status-filter'
import AuditLogsContent from '../components/audit-logs'
import DeleteTicket from '../components/delete-ticket'
import ListView from '../components/list-view'
import UpdateTicket from '../components/update-tickets'
import ViewTicket from '../components/view-ticket'
import useTicketQuery from '../hooks/useTicketQuery'

export default function AllTickets() {
  const [search, setSearch] = useState('')
  const [status, setStatusState] = useState<string | null>(null)

  const {
    tickets,
    loading,
    page,
    perPage,
    setPage,
    setStatus,
    totalPages,
    error,
    refetch,
  } = useTicketQuery({
    mode: 'all',
    initialSearch: search,
  })

  const handleSearch = (value: string) => {
    setSearch(value)
    refetch({ page: 1, perPage, search: value, status })
    setPage(1)
  }

  const handleStatusChange = (newStatus: string | null) => {
    setStatusState(newStatus)
    setStatus(newStatus)
    refetch({ page: 1, perPage, search, status: newStatus })
    setPage(1)
  }

  return (
    <>
      <div className="mb-4">
        <h1 className="mb-2 flex items-center gap-2 text-3xl font-semibold">
          <Ticket className="h-10 w-10 text-green-500" />
          All Tickets
        </h1>
      </div>

      {/* 🔎 Search + Status Filter */}
      <div className="mb-4 flex items-center gap-2">
        <SearchBar
          placeholder="Search tickets..."
          onSearch={handleSearch}
        />

        <StatusFilter
          value={status}
          onChange={handleStatusChange}
        />
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
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
      <div className="my-4">
        <Pagination
          currentPage={page}
          lastPage={totalPages}
          onPageChange={(newPage) => {
            setPage(newPage)
            refetch({ page: newPage, perPage, search, status })
          }}
        />
      </div>
    </>
  )
}

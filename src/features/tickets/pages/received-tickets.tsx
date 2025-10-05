import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Ticket, ArrowLeft } from 'lucide-react'
import useMeQuery from '@/hooks/useMeQuery'
import { Button } from '@/components/ui/button'
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

export default function ReceivedTickets() {
  const { userId, loading: meLoading, error: meError } = useMeQuery()
  const {
    tickets,
    totalPages,
    loading,
    error,
    refetch,
    page,
    perPage,
    search,
    setPage,
    setSearch,
    setStatus,
  } = useTicketQuery({
    userId,
    mode: 'worked',
    initialPerPage: 10,
  })
  const [status, setStatusState] = useState<string | null>(null)

  // Handle loading and error states
  if (meLoading || loading) return <Spinner />
  if (meError) return <p>Error loading user: {meError.message}</p>
  if (error) return <p>Error loading tickets: {error.message}</p>

  // Handlers
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
      {/* Header */}
      <div className='mb-4 flex flex-col items-center justify-between gap-4 md:flex-row'>
        <h1 className='mb-2 flex items-center gap-2 text-xl font-semibold md:text-3xl'>
          <Ticket className='h-10 w-10 text-green-500' />
          Your Received Tickets
        </h1>

        <Link to='/department-ticket'>
          <Button variant='outline' className='flex items-center gap-2'>
            <ArrowLeft className='h-4 w-4' />
            Back
          </Button>
        </Link>
      </div>

      {/* 🔎 Search and Filter */}
      <div className='mb-4 flex items-center gap-2'>
        <SearchBar placeholder='Search tickets...' onSearch={handleSearch} />

        <StatusFilter value={status} onChange={handleStatusChange} />
      </div>

      {/* 🧾 Tickets List */}
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

      {/* 📄 Pagination */}
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

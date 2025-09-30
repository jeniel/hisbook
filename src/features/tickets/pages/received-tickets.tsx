import { Link } from '@tanstack/react-router'
import { Ticket, ArrowLeft } from 'lucide-react'
import useMeQuery from '@/hooks/useMeQuery'
import { Button } from '@/components/ui/button'
import Pagination from '@/components/pagination'
import SearchBar from '@/components/search-bar'
import Spinner from '@/components/spinner'
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
    loading: ticketsLoading,
    error: ticketsError,
    refetch,
    page,
    setPage,
    setSearch,
    totalPages,
    perPage,
    search,
  } = useTicketQuery({
    userId,
    mode: 'worked',
    initialPerPage: 10,
  })

  if (meLoading || ticketsLoading) return <Spinner />
  if (meError) return <p>Error loading user: {meError.message}</p>
  if (ticketsError) return <p>Error loading tickets: {ticketsError.message}</p>

  return (
    <div>
      <div className='mb-4 flex flex-col items-center justify-between gap-4 md:flex-row'>
        <div>
          <h1 className='mb-2 flex items-center gap-2 text-xl font-semibold md:text-3xl'>
            <Ticket className='h-10 w-10 text-green-500' />
            Your Received Tickets
          </h1>
        </div>

        <div className='flex gap-2'>
          <Link to='/department-ticket'>
            <Button variant='outline' className='flex items-center gap-2'>
              <ArrowLeft className='h-4 w-4' />
              Back
            </Button>
          </Link>
        </div>
      </div>

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
    </div>
  )
}

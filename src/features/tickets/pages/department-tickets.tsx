import { Link } from '@tanstack/react-router'
import { Ticket, TicketIcon } from 'lucide-react'
import useMeQuery from '@/hooks/useMeQuery'
import { Button } from '@/components/ui/button'
import Pagination from '@/components/pagination'
import Spinner from '@/components/spinner'
import useTicketQuery from '@/features/tickets/hooks/useTicketQuery'
import AuditLogsContent from '../components/audit-logs'
import DeleteTicket from '../components/delete-ticket'
import ListView from '../components/list-view'
import UpdateTicket from '../components/update-tickets'
import ViewTicket from '../components/view-ticket'

export default function DepartmentTickets() {
  const {
    departmentId,
    departmentName,
    loading: meLoading,
    error: meError,
  } = useMeQuery()

  const { tickets, totalPages, loading, error, refetch, page, setPage } =
    useTicketQuery({
      departmentId,
      initialPerPage: 10,
      mode: 'department',
    })

  if (meLoading || loading) return <Spinner />
  if (meError) return <p>Error loading user or department: {meError.message}</p>
  if (error) return <p>Error loading tickets: {error.message}</p>

  return (
    <>
      {/* Header */}
      <div className='mb-4 flex flex-col items-center justify-between gap-4 md:flex-row'>
        <h1 className='mb-2 flex items-center gap-2 text-md md:text-3xl font-semibold'>
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
          onPageChange={setPage}
        />
      </div>
    </>
  )
}

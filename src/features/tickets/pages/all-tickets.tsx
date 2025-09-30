import { Ticket } from 'lucide-react'
import Pagination from '@/components/pagination'
import Spinner from '@/components/spinner'
import AuditLogsContent from '../components/audit-logs'
import DeleteTicket from '../components/delete-ticket'
import ListView from '../components/list-view'
import UpdateTicket from '../components/update-tickets'
import ViewTicket from '../components/view-ticket'
import useTicketQuery from '../hooks/useTicketQuery'

export default function AllTickets() {
  const { tickets, loading, page, setPage, totalPages, error, refetch } =
    useTicketQuery({
      mode: 'all',
    })

  if (loading) return <Spinner />
  if (error) return <p className='text-red-500'>Error: {error.message}</p>

  return (
    <>
      <div className='mb-4'>
        <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
          <Ticket className='h-10 w-10 text-green-500' />
          All Tickets
        </h1>
        <p className='text-md text-muted-foreground'>All submitted tickets</p>
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

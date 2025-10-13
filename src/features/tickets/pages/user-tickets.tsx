import { Ticket } from 'lucide-react'
import useMeQuery from '@/hooks/useMeQuery'
import Pagination from '@/components/pagination'
import Spinner from '@/components/spinner'
import CreateTickets from '../components/create-tickets'
import ListView from '../components/list-view'
import ViewTicket from '../components/view-ticket'
import useTicketQuery from '../hooks/useTicketQuery'

export default function UserTickets() {
  const { userId, loading, error: meError } = useMeQuery()
  const { tickets, page, setPage, totalPages, error, refetch } = useTicketQuery(
    {
      userId,
      mode: 'user',
    }
  )

  if (loading) return <Spinner />
  if (meError) return <p className='text-red-500'>Error: {meError.message}</p>
  if (error) return <p className='text-red-500'>Error: {error.message}</p>

  return (
    <>
      <div className='mb-4 flex flex-col items-start justify-start gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
            <Ticket className='h-10 w-10 text-green-500' />
            My Tickets
          </h1>
          <p className='text-muted-foreground text-sm'>
            Create or View Your Tickets
          </p>
        </div>

        <div>
          <CreateTickets onCreated={refetch} />
        </div>
      </div>
      <ListView
        tickets={tickets}
        renderActions={(ticket) => <ViewTicket ticket={ticket} />}
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

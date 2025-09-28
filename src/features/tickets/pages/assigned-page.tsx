import { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { Ticket, TicketIcon, LayoutGrid, LayoutList } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Spinner from '@/components/spinner'
import { useTicket } from '@/features/tickets/hooks/useTicket'
import ListView from '../components/assigned-tickets/list-view'
import TableView from '../components/assigned-tickets/table-view'

export default function AssignedTickets() {
  const [view, setView] = useState<'table' | 'list'>(() => {
    return (
      (localStorage.getItem('assignedTicketsView') as 'table' | 'list') ||
      'table'
    )
  })

  useEffect(() => {
    // ✅ store preference when it changes
    localStorage.setItem('assignedTicketsView', view)
  }, [view])

  const [page, setPage] = useState(1)
  const perPage = 10

  const { tickets, meta, loading, error, refetch } = useTicket({
    page,
    perPage,
  })

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    refetch({ page: newPage, perPage })
  }

  if (loading) return <Spinner />
  if (error) return <p>Error loading tickets: {error.message}</p>

  return (
    <>
      {/* Header */}
      <div className='mb-4 flex flex-col justify-between gap-4 md:flex-row'>
        <div>
          <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
            <Ticket className='h-10 w-10 text-green-500' />
            Assigned Tickets
          </h1>
          <p className='text-md text-muted-foreground'>
            Update Tickets and Services
          </p>
        </div>

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

          {/* Toggle view */}
          <Button
            variant={view === 'table' ? 'default' : 'outline'}
            size='sm'
            onClick={() => setView('table')}
          >
            <LayoutList className='h-4 w-4' />
          </Button>
          <Button
            variant={view === 'list' ? 'default' : 'outline'}
            size='sm'
            onClick={() => setView('list')}
          >
            <LayoutGrid className='h-4 w-4' />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className='mb-4'>
        {view === 'table' ? (
          <TableView
            tickets={tickets}
            meta={meta}
            page={page}
            perPage={perPage}
            onPageChange={handlePageChange}
            refetch={refetch}
          />
        ) : (
          <ListView
            tickets={tickets}
            meta={meta}
            page={page}
            perPage={perPage}
            onPageChange={handlePageChange}
            refetch={refetch}
          />
        )}
      </div>
    </>
  )
}

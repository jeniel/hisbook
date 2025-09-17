import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Query } from '@/graphql/codegen/graphql'
import { FIND_ALL_TICKETS_BY_USER } from '@/graphql/operation/query/ticket'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useQuery } from '@apollo/client'
import { Ticket, LayoutGrid, LayoutList, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Spinner from '@/components/spinner'
import GridView from '../components/received-tickets/grid-view'
import ListView from '../components/received-tickets/table-view'

export default function ReceivedTickets() {
  const [page, setPage] = useState(1)
  const perPage = 10

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

  // fetch logged-in user
  const {
    loading: meLoading,
    error: meError,
    data: meData,
  } = useQuery<Query>(ME_QUERY)
  const userId = meData?.meQuery?.user?.id

  // fetch tickets for user
  const {
    loading: ticketsLoading,
    error: ticketsError,
    data: ticketsData,
    refetch,
  } = useQuery<Query>(FIND_ALL_TICKETS_BY_USER, {
    variables: { userId, page, perPage },
    skip: !userId,
    fetchPolicy: 'cache-and-network',
  })

  if (meLoading || ticketsLoading) return <Spinner />
  if (meError) return <p>Error loading user: {meError.message}</p>
  if (ticketsError) return <p>Error loading tickets: {ticketsError.message}</p>

  const tickets = ticketsData?.findTicketsByUser?.data || []
  const meta = ticketsData?.findTicketsByUser?.meta

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    refetch({ userId, page: newPage, perPage })
  }

  return (
    <div>
      <div className='mb-4 flex flex-col justify-between gap-4 md:flex-row'>
        <div className='flex items-center gap-2'>
          <h1 className='flex items-center gap-2 text-xl font-semibold md:text-3xl'>
            <Ticket className='h-10 w-10 text-green-500' />
            Your Received Tickets
          </h1>
        </div>

        <div className='flex gap-2'>
          <Link to='/assigned-ticket'>
            <Button
              variant='outline'
              size='sm'
              className='flex items-center gap-2'
            >
              <ArrowLeft className='h-4 w-4' />
              Back
            </Button>
          </Link>
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

      {view === 'list' ? (
        <ListView
          tickets={tickets}
          meta={meta}
          page={page}
          perPage={perPage}
          onPageChange={handlePageChange}
          refetch={refetch}
        />
      ) : (
        <GridView
          tickets={tickets}
          meta={meta}
          page={page}
          perPage={perPage}
          onPageChange={handlePageChange}
          refetch={refetch}
        />
      )}
    </div>
  )
}

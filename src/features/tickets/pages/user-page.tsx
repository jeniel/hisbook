import { useEffect, useState } from 'react'
import { Query } from '@/graphql/codegen/graphql'
import { FIND_ALL_TICKETS_BY_USER } from '@/graphql/operation/query/ticket'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useQuery } from '@apollo/client'
import { Ticket, LayoutGrid, LayoutList } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Spinner from '@/components/spinner'
import CreateTickets from '../components/create-tickets'
import ListView from '../components/user-tickets/list-view'
import TableView from '../components/user-tickets/table-view'

export default function MyTickets() {
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

  // Get logged-in user
  const {
    loading: meLoading,
    error: meError,
    data: meData,
  } = useQuery<Query>(ME_QUERY)
  const userId = meData?.meQuery?.user?.id

  // Get tickets for the user
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
    <>
      <div>
        <div className='mb-4 flex flex-col justify-between gap-4 md:flex-row'>
          <div>
            <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
              <Ticket className='h-10 w-10 text-green-500' />
              My Tickets
            </h1>
            <p className='text-sm text-muted-foreground'>
              View your submitted tickets
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <CreateTickets />
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

        <Card className='w-full mb-4'>
          <CardContent>
            {view === 'table' ? (
              <TableView
                tickets={tickets}
                page={page}
                perPage={perPage}
                meta={meta}
                onPageChange={handlePageChange}
              />
            ) : (
              <ListView
                tickets={tickets}
                page={page}
                perPage={perPage}
                meta={meta}
                onPageChange={handlePageChange}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

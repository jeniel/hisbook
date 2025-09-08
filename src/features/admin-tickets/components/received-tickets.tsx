import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Query } from '@/graphql/codegen/graphql'
import { FIND_TICKETS_WORKED_BY_USER } from '@/graphql/operation/query/ticket'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useQuery } from '@apollo/client'
import { Ticket } from 'lucide-react'
import { formatDate } from '@/utils/formatDate'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Pagination from '@/components/pagination'
import Spinner from '@/components/spinner'
import AuditLogsContent from './audit-logs'
import WorkTickets from './work-tickets'

export default function ReceivedTickets() {
  const [page, setPage] = useState(1)
  const perPage = 10

  // 1. Get logged-in user
  const {
    loading: meLoading,
    error: meError,
    data: meData,
  } = useQuery<Query>(ME_QUERY)

  const userId = meData?.meQuery?.user?.id
  const firstName = meData?.meQuery?.user?.profile?.firstName
  const lastName = meData?.meQuery?.user?.profile?.lastName
  const jobPosition = meData?.meQuery?.user?.profile?.title

  // 2. Get tickets worked by this user
  const {
    loading: ticketsLoading,
    error: ticketsError,
    data: ticketsData,
    refetch,
  } = useQuery<Query>(FIND_TICKETS_WORKED_BY_USER, {
    variables: { userId, page, perPage },
    skip: !userId,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-and-network',
  })

  if (meLoading) return <Spinner />
  if (meError) return <p>Error loading user: {meError.message}</p>

  if (ticketsLoading) return <Spinner />
  if (ticketsError) return <p>Error loading tickets: {ticketsError.message}</p>

  const tickets = ticketsData?.findTicketsWorkedByUser?.data || []
  const meta = ticketsData?.findTicketsWorkedByUser?.meta

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    refetch({ userId, page: newPage, perPage })
  }

  return (
    <>
      <div className='mb-4'>
        <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
          <Ticket className='h-10 w-10 text-green-500' />
          Admin Tickets
        </h1>
        <p className='text-md text-muted-foreground'>
          Update Tickets of the Users
        </p>
      </div>

      <Card className='w-full'>
        <CardContent>
          <div className='flex flex-row items-center justify-between'>
            <div>
              <h1 className='flex items-center gap-2 text-xl font-semibold'>
                <Ticket className='h-6 w-6 text-blue-500' />
                Received Tickets by{' '}
              </h1>
              <p className='text-md text-muted-foreground'>
                {firstName && lastName
                  ? `${firstName} ${lastName}`
                  : meData?.meQuery?.user?.username || 'Unknown'}{' '}
                - {jobPosition || 'Unknown'}
              </p>
            </div>

            <Link to='/admin-tickets'>
              <Button variant={'outline'}>
                <Ticket className='h-6 w-6 text-red-500' />
                Back
              </Button>
            </Link>
          </div>

          {tickets.length === 0 ? (
            <p className='text-gray-500 italic'>
              You do not have any received tickets.
            </p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket, index) => (
                    <TableRow key={ticket.id}>
                      <TableCell>{index + 1 + (page - 1) * perPage}</TableCell>
                      <TableCell>
                        {ticket.createdBy?.profile
                          ? `${ticket.createdBy.profile.firstName} ${ticket.createdBy.profile.lastName}`
                          : ticket.createdBy?.username || 'Unknown'}
                      </TableCell>
                      <TableCell>{ticket.subject || '-'}</TableCell>
                      <TableCell>{formatDate(ticket.missedAt)}</TableCell>
                      <TableCell>{ticket.status || '-'}</TableCell>
                      <TableCell className='flex gap-2'>
                        <WorkTickets
                          ticket={ticket}
                          onUpdated={() => refetch()}
                        />
                        <AuditLogsContent ticketId={ticket.id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {meta && (
                <div className='mt-4'>
                  <Pagination
                    currentPage={meta.currentPage}
                    lastPage={meta.lastPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </>
  )
}

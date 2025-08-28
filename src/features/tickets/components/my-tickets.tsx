import { useState } from 'react'
import { Query } from '@/graphql/codegen/graphql'
import { FIND_ALL_TICKETS_BY_USER } from '@/graphql/operation/query/ticket'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useQuery } from '@apollo/client'
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
import { Ticket } from 'lucide-react'

export default function MyTickets() {
  const [page, setPage] = useState(1)
  const perPage = 10

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

  if (meLoading) return <Spinner />
  if (meError) return <p>Error loading user: {meError.message}</p>

  if (ticketsLoading) return <Spinner />
  if (ticketsError) return <p>Error loading tickets: {ticketsError.message}</p>

  const tickets = ticketsData?.findTicketsByUser?.data || []
  const meta = ticketsData?.findTicketsByUser?.meta

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    refetch({ userId, page: newPage, perPage })
  }

  return (
    <Card className='w-full'>
      <CardContent>
        <h1 className='mb-2 flex items-center gap-2 text-xl font-semibold'>
          <Ticket className='text-green-500 h-6 w-6' />
          My Tickets
        </h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket, index) => (
              <TableRow key={ticket.id}>
                <TableCell>{index + 1 + (page - 1) * perPage}</TableCell>
                <TableCell>
                  {ticket.createdBy?.profile
                    ? `${ticket.createdBy.profile.firstName} ${ticket.createdBy.profile.lastName}`
                    : 'Unknown'}
                </TableCell>
                <TableCell>{ticket.subject || '-'}</TableCell>
                <TableCell>
                  {ticket.missedAt
                    ? new Date(ticket.missedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'TBD'}
                </TableCell>
                <TableCell>
                  {new Date(ticket.missedAt).toLocaleTimeString()}
                </TableCell>
                <TableCell>{ticket.floor || '-'}</TableCell>
                <TableCell>{ticket.status || '-'}</TableCell>
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
      </CardContent>
    </Card>
  )
}

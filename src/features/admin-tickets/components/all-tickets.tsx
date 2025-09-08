import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Query } from '@/graphql/codegen/graphql'
import { FIND_ALL_TICKETS } from '@/graphql/operation/query/ticket'
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

export default function AllTickets() {
  const [page, setPage] = useState(1)
  const perPage = 10

  const { loading, error, data, refetch } = useQuery<Query>(FIND_ALL_TICKETS, {
    variables: { page, perPage },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-and-network',
  })

  if (loading) return <Spinner />
  if (error) return <p>Error loading tickets: {error.message}</p>

  const tickets = data?.findAllTickets?.data || []
  const meta = data?.findAllTickets?.meta

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    refetch({ page: newPage, perPage })
  }

  return (
    <Card>
      <CardContent>
        <div className="flex flex-row justify-between items center">
          <h1 className='mb-2 flex items-center gap-2 text-xl font-semibold'>
            <Ticket className='h-6 w-6 text-green-500' />
            All Tickets
          </h1>

          <Link to='/received-tickets'>
            <Button variant={'outline'}>
              <Ticket className='h-6 w-6 text-blue-500' /> Your Received Tickets
            </Button>
          </Link>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Location</TableHead>
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
                    : 'Unknown'}
                </TableCell>
                <TableCell>{formatDate(ticket.missedAt)}</TableCell>
                <TableCell>
                  {new Date(ticket.missedAt).toLocaleTimeString()}
                </TableCell>
                <TableCell>{ticket.floor}</TableCell>
                <TableCell>{ticket.status}</TableCell>
                <TableCell className='flex gap-2'>
                  <WorkTickets ticket={ticket} onUpdated={() => refetch()} />
                  <AuditLogsContent ticketId={ticket.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {meta && (
          <Pagination
            currentPage={meta.currentPage}
            lastPage={meta.lastPage}
            onPageChange={handlePageChange}
          />
        )}
      </CardContent>
    </Card>
  )
}

import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Ticket as TicketIcon } from 'lucide-react'
import { formatDate } from '@/utils/formatDate'
import { useTicket } from '@/hooks/useTicket'
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
import DeleteTicket from './delete-ticket'
import UpdateTicket from './update-tickets'
import ViewTicket from './view-ticket'

interface DeptTicketsProps {
  departmentId: string
}

export default function DeptTickets({ departmentId }: DeptTicketsProps) {
  const [page, setPage] = useState(1)
  const perPage = 10

  const { tickets, meta, loading, error, refetch } = useTicket({
    departmentId,
    page,
    perPage,
  })

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    refetch({ departmentId, page: newPage, perPage })
  }

  if (loading) return <Spinner />
  if (error) return <p>Error loading tickets: {error.message}</p>

  return (
    <Card>
      <CardContent>
        <div className='items center flex flex-row justify-between'>
          <h1 className='mb-2 flex items-center gap-2 text-xl font-semibold'>
            <TicketIcon className='h-6 w-6 text-green-500' />
            All Requested Tickets / Services
          </h1>

          <Link to='/received-tickets'>
            <Button variant={'outline'}>
              <TicketIcon className='h-6 w-6 text-blue-500' /> Your Received
              Tickets
            </Button>
          </Link>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Requested By</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Department</TableHead>
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
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>{formatDate(ticket.createdAt)}</TableCell>
                <TableCell>{ticket.floor}</TableCell>
                <TableCell>{ticket.statusFormatted}</TableCell>
                <TableCell className='flex gap-2'>
                  {/* ✅ View Ticket (read-only details) */}
                  <ViewTicket ticket={ticket} />

                  {/* ✏️ Update Ticket */}
                  <UpdateTicket ticket={ticket} onUpdated={() => refetch()} />

                  {/* 📑 Audit Logs */}
                  <AuditLogsContent ticketId={ticket.id} />

                  {/* 🗑️ Delete Ticket */}
                  <DeleteTicket
                    ticketId={ticket.id}
                    onDelete={() => refetch()}
                  />
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

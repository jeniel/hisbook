/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDate } from '@/utils/formatDate'
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
import AuditLogsContent from '../audit-logs'
import DeleteTicket from '../delete-ticket'
import UpdateTicket from '../update-tickets'
import ViewTicket from '../view-ticket'

export default function TableView({
  tickets,
  meta,
  page,
  perPage,
  onPageChange,
  refetch,
}: {
  tickets: any[]
  meta: any
  page: number
  perPage: number
  onPageChange: (page: number) => void
  refetch: () => void
}) {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Requested By</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Department Assigned</TableHead>
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
                <TableCell>{ticket.department.name}</TableCell>
                <TableCell>{ticket.statusFormatted}</TableCell>
                <TableCell className='flex gap-2'>
                  <ViewTicket ticket={ticket} />
                  <UpdateTicket ticket={ticket} onUpdated={() => refetch()} />
                  <AuditLogsContent ticketId={ticket.id} />
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
            onPageChange={onPageChange}
          />
        )}
      </CardContent>
    </Card>
  )
}

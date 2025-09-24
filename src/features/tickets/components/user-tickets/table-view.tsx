/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Pagination from '@/components/pagination'

type TableViewProps = {
  tickets: any[]
  page: number
  perPage: number
  meta: any
  onPageChange: (newPage: number) => void
}

export default function TableView({
  tickets,
  page,
  perPage,
  meta,
  onPageChange,
}: TableViewProps) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Send To</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.length > 0 ? (
            tickets.map((ticket, index) => (
              <TableRow key={ticket.id}>
                <TableCell>{index + 1 + (page - 1) * perPage}</TableCell>
                <TableCell>
                  {ticket.createdBy?.profile
                    ? `${ticket.createdBy.profile.firstName} ${ticket.createdBy.profile.lastName}`
                    : ticket.createdBy?.username || 'Unknown'}
                </TableCell>
                <TableCell>{ticket.subject || '-'}</TableCell>
                <TableCell>{ticket.department?.name || '-'}</TableCell>
                <TableCell>{ticket.floor || '-'}</TableCell>
                <TableCell>{ticket.statusFormatted || '-'}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className='py-6 text-center text-gray-500'>
                You don’t have tickets
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {meta && tickets.length > 0 && (
        <div className='mt-4'>
          <Pagination
            currentPage={meta.currentPage}
            lastPage={meta.lastPage}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </>
  )
}

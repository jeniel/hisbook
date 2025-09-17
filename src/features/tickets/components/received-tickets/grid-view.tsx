/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDate } from '@/utils/formatDate'
import { Card, CardContent } from '@/components/ui/card'
import Pagination from '@/components/pagination'
import AuditLogsContent from '../audit-logs'
import DeleteTicket from '../delete-ticket'
import UpdateTicket from '../update-tickets'
import ViewTicket from '../view-ticket'

export default function GridView({
  tickets,
  meta,
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
        <div className='grid gap-4 grid-cols-1'>
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className='rounded-lg border p-4 shadow-sm transition hover:shadow-md'
            >
              <h2 className='text-lg font-semibold'>{ticket.subject}</h2>
              <p className='text-sm text-gray-500'>
                {formatDate(ticket.createdAt)}
              </p>
              <p className='text-sm'>
                <span className='font-medium'>Status:</span>{' '}
                {ticket.statusFormatted}
              </p>

              <div className='mt-2 flex flex-wrap gap-2'>
                <ViewTicket ticket={ticket} />
                <UpdateTicket ticket={ticket} onUpdated={() => refetch()} />
                <AuditLogsContent ticketId={ticket.id} />
                <DeleteTicket ticketId={ticket.id} onDelete={() => refetch()} />
              </div>
            </div>
          ))}
        </div>

        {meta && (
          <div className='mt-4'>
            <Pagination
              currentPage={meta.currentPage}
              lastPage={meta.lastPage}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

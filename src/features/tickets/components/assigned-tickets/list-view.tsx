/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDate } from '@/utils/formatDate'
import { Card, CardContent } from '@/components/ui/card'
import Pagination from '@/components/pagination'
import AuditLogsContent from '../audit-logs'
import DeleteTicket from '../delete-ticket'
import UpdateTicket from '../update-tickets'
import ViewTicket from '../view-ticket'

export default function ListView({
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
        <div className='space-y-4'>
          <div className='flex flex-col gap-4'>
            {tickets.map((ticket, index) => (
              <div
                key={ticket.id}
                className='rounded-lg border p-4 shadow-sm transition hover:shadow-md'
              >
                <div className='mb-2 flex items-start justify-between'>
                  <div>
                    <h2 className='text-lg font-semibold'>{ticket.subject}</h2>
                    <p className='text-sm text-gray-500'>
                      #{index + 1 + (page - 1) * perPage} &middot;{' '}
                      {ticket.createdBy?.profile
                        ? `${ticket.createdBy.profile.firstName} ${ticket.createdBy.profile.lastName}`
                        : 'Unknown'}
                    </p>
                  </div>
                  <p className='text-xs text-gray-400'>
                    {formatDate(ticket.createdAt)}
                  </p>
                </div>

                <div className='mb-2 space-y-1 text-sm'>
                  <p>
                    <span className='font-medium'>Department:</span>{' '}
                    {ticket.department.name}
                  </p>
                  <p>
                    <span className='font-medium'>Floor:</span> {ticket.floor}
                  </p>
                  <p>
                    <span className='font-medium'>Status:</span>{' '}
                    {ticket.statusFormatted}
                  </p>
                </div>

                <div className='mt-2 flex flex-wrap gap-2'>
                  <ViewTicket ticket={ticket} />
                  <UpdateTicket ticket={ticket} onUpdated={() => refetch()} />
                  <AuditLogsContent ticketId={ticket.id} />
                  <DeleteTicket
                    ticketId={ticket.id}
                    onDelete={() => refetch()}
                  />
                </div>
              </div>
            ))}
          </div>

          {meta && (
            <Pagination
              currentPage={meta.currentPage}
              lastPage={meta.lastPage}
              onPageChange={onPageChange}
            />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

import { Ticket, Status } from '@/graphql/codegen/graphql'
import { User, Calendar, Layers, Send, TicketIcon, Barcode } from 'lucide-react'
import { formatDate } from '@/utils/formatDate'
import { Card, CardContent } from '@/components/ui/card'

type ListViewProps = {
  tickets: Ticket[]
  renderActions?: (ticket: Ticket) => React.ReactNode
}

const statusColors: Record<Status, string> = {
  [Status.Pending]: 'bg-yellow-100 text-yellow-700',
  [Status.Approved]: 'bg-blue-100 text-blue-700',
  [Status.Completed]: 'bg-green-100 text-green-700',
  [Status.OnHold]: 'bg-orange-100 text-orange-700',
  [Status.InProgress]: 'bg-purple-100 text-purple-700',
}

export default function ListView({ tickets, renderActions }: ListViewProps) {
  return (
    <div className='space-y-4'>
      {tickets.length > 0 ? (
        tickets.map((ticket) => {
          const status = ticket.status as Status
          const statusClass =
            statusColors[status] || 'bg-gray-100 text-gray-600'

          return (
            <Card key={ticket.id}>
              <CardContent>
                {/* Header */}
                <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                  {/* Left side: Subject + createdBy + date */}
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 text-sm'>
                      <TicketIcon className='h-5 w-5 shrink-0 text-red-500' />
                      <h2 className='text-base font-semibold break-words sm:text-lg'>
                        {ticket.subject || 'No subject'}
                      </h2>
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusClass}`}
                      >
                        {ticket.statusFormatted || '—'}
                      </span>
                    </div>
                    <div className='mt-1 flex flex-wrap items-center gap-2 text-sm'>
                      <p className='flex flex-wrap items-center'>
                        <User className='mr-1 h-4 w-4 shrink-0 text-blue-500' />
                        {ticket.createdBy?.profile?.firstName &&
                        ticket.createdBy?.profile?.lastName
                          ? `${ticket.createdBy.profile.firstName} ${ticket.createdBy.profile.lastName}`
                          : 'No Full Name'}{' '}
                      </p>

                      <p className='flex flex-wrap items-center'>
                        / @{ticket.createdBy.username}
                      </p>
                    </div>

                    <p className='mt-1 flex flex-wrap items-center text-sm'>
                      <Calendar className='mr-1 h-4 w-4 shrink-0 text-red-500' />
                      {formatDate(ticket.createdAt, false)}
                    </p>

                    <p className='mt-1 flex flex-wrap items-center text-sm'>
                      <Barcode className='mr-1 h-4 w-4 shrink-0 text-green-500' />
                      {ticket.serialNumber || 'N/A'}
                    </p>
                  </div>

                  {/* Right side: Status + Actions */}
                  <div className='flex flex-col items-start gap-2 sm:flex-row sm:items-center'>
                    {renderActions && (
                      <div className='flex flex-wrap justify-start gap-2'>
                        {renderActions(ticket)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className='mt-3 space-y-1 text-sm'>
                  <p className='flex flex-wrap items-center'>
                    <Send className='mr-1 h-4 w-4 shrink-0 text-yellow-500' />
                    <span className='font-medium'>Send To:</span>&nbsp;
                    {ticket.department?.name || '—'}
                  </p>
                  <p className='flex flex-wrap items-center'>
                    <Layers className='mr-1 h-4 w-4 shrink-0 text-purple-500' />
                    <span className='font-medium'>Floor / Department:</span>
                    &nbsp;
                    {ticket.floor || '—'}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })
      ) : (
        <div className='rounded-lg border py-10 text-center text-gray-500'>
          You don’t have tickets
        </div>
      )}
    </div>
  )
}

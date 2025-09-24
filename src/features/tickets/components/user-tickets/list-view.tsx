/* eslint-disable @typescript-eslint/no-explicit-any */
import Pagination from '@/components/pagination'

type ListViewProps = {
  tickets: any[]
  page: number
  perPage: number
  meta: any
  onPageChange: (newPage: number) => void
}

export default function ListView({
  tickets,
  page,
  perPage,
  meta,
  onPageChange,
}: ListViewProps) {
  return (
    <div className='space-y-4'>
      {tickets.length > 0 ? (
        tickets.map((ticket, index) => (
          <div
            key={ticket.id}
            className='rounded-lg border p-4 shadow-sm transition hover:shadow-md'
          >
            <div className='flex justify-between'>
              <div>
                <h2 className='text-lg font-semibold'>
                  {ticket.subject || 'No subject'}
                </h2>
                <p className='text-sm text-gray-500'>
                  #{index + 1 + (page - 1) * perPage} &middot;{' '}
                  {ticket.createdBy?.profile
                    ? `${ticket.createdBy.profile.firstName} ${ticket.createdBy.profile.lastName}`
                    : ticket.createdBy?.username || 'Unknown'}
                </p>
              </div>
              <span className='text-sm text-gray-400'>
                {ticket.statusFormatted || '-'}
              </span>
            </div>

            <div className='mt-2 space-y-1 text-sm'>
              <p>
                <span className='font-medium'>Send To:</span>{' '}
                {ticket.department?.name || '-'}
              </p>
              <p>
                <span className='font-medium'>Floor:</span>{' '}
                {ticket.floor || '-'}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className='rounded-lg border py-10 text-center text-gray-500'>
          You don’t have tickets
        </div>
      )}

      {meta && tickets.length > 0 && (
        <div className='mt-4'>
          <Pagination
            currentPage={meta.currentPage}
            lastPage={meta.lastPage}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  )
}

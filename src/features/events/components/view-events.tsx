import { useState } from 'react'
import { Query } from '@/graphql/codegen/graphql'
import { GET_ALL_EVENT } from '@/graphql/operation/query/event'
import { useQuery } from '@apollo/client'
import { CalendarDays } from 'lucide-react'
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
import CreateEvent from './create-event'
import DeleteEvent from './delete-event'
import EditEvent from './edit-event'

export default function ViewEvents() {
  const [page, setPage] = useState(1)
  const perPage = 10

  const { data, loading, error, refetch } = useQuery<Query>(GET_ALL_EVENT, {
    variables: { page, perPage },
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return <Spinner />
  if (error) return <p>Error: {error.message}</p>

  const events = data?.findAllEvents?.data || []
  const meta = data?.findAllEvents?.meta

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    refetch({ page: newPage, perPage })
  }
  return (
    <Card>
      <CardContent>
        <div className='mb-4 flex flex-row items-center justify-between'>
          <h1 className='flex items-center gap-2 text-xl font-semibold'>
            <CalendarDays className='text-red-500 h-6 w-6' />
            Events
          </h1>

          <CreateEvent />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className='text-center'>
                  No Events Found
                </TableCell>
              </TableRow>
            ) : (
              events.map((event, index) => (
                <TableRow key={event.id}>
                  <TableCell>{index + 1 + (page - 1) * perPage}</TableCell>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    {new Date(event.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {event.endDate
                      ? new Date(event.endDate).toLocaleDateString()
                      : null}
                  </TableCell>
                  <TableCell className='flex flex-row items-center space-x-2'>
                    {event.detailsUrl && (
                      <Button size='sm' asChild>
                        <a
                          href={event.detailsUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          View Details
                        </a>
                      </Button>
                    )}
                    <EditEvent event={event} onUpdated={() => refetch()} />
                    <DeleteEvent event={event} onDelete={() => refetch()} />
                  </TableCell>
                </TableRow>
              ))
            )}
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

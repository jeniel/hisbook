import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Ticket, TicketIcon, LayoutGrid, LayoutList } from 'lucide-react'
import { Button } from '@/components/ui/button'
import GridView from '../components/grid-view'
import ListView from '../components/list-view'

export default function AssignedTickets() {
  const [view, setView] = useState<'grid' | 'list'>('grid') // default to grid view

  return (
    <>
      {/* Header */}
      <div className='mb-4 flex flex-col items-center justify-between gap-4 md:flex-row'>
        <div>
          <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
            <Ticket className='h-10 w-10 text-green-500' />
            Assigned Tickets
          </h1>
          <p className='text-md text-muted-foreground'>
            Update Tickets and Services
          </p>
        </div>

        <div className='flex items-center gap-2'>
          <Link to='/received-tickets'>
            <Button
              variant='outline'
              className='flex items-center gap-2'
              size='lg'
            >
              <TicketIcon className='h-6 w-6 text-green-500' />
              Received Tickets
            </Button>
          </Link>

          {/* View Toggle Buttons */}
          <Button
            variant={view === 'grid' ? 'default' : 'outline'}
            size='sm'
            onClick={() => setView('grid')}
          >
            <LayoutGrid className='h-4 w-4' />
          </Button>
          <Button
            variant={view === 'list' ? 'default' : 'outline'}
            size='sm'
            onClick={() => setView('list')}
          >
            <LayoutList className='h-4 w-4' />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className='space-y-4'>
        {view === 'grid' ? <GridView /> : <ListView />}
      </div>
    </>
  )
}

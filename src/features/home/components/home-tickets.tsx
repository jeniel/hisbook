import { JSX } from 'react'
import { Query } from '@/graphql/codegen/graphql'
import { CENSUS_TICKET_DATA } from '@/graphql/operation/query/census'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useQuery } from '@apollo/client'
import { Clock, CheckCircle2, FileCheck, Ticket } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import Spinner from '@/components/spinner'

interface Ticket {
  status: string
  count: number
}

export default function HomeTickets() {
  // Always call ME_QUERY
  const { data: meData } = useQuery<Query>(ME_QUERY)

  const userId = meData?.meQuery?.user?.id

  const {
    data: ticketsData,
    loading: ticketsLoading,
    error: ticketsError,
  } = useQuery<Query>(CENSUS_TICKET_DATA, {
    variables: { userId: userId || '' },
    skip: !userId,
  })

  if (ticketsLoading) return <Spinner />
  if (!userId) return <p>No user found</p>
  if (ticketsError) return <p>Error loading tickets: {ticketsError.message}</p>

  const ticketOverview = ticketsData?.getCensusSummary

  const statuses = ['Pending', 'Approved', 'Completed'] as const
  const ticketsByStatus = statuses.map((status) => {
    const ticket = ticketOverview?.ticketByUserId?.find(
      (t: Ticket) => t.status === status
    )
    return { status, count: ticket?.count || 0 }
  })

  const statusConfig: Record<string, { color: string; icon: JSX.Element }> = {
    Pending: {
      color: 'text-yellow-500',
      icon: <Clock className='h-8 w-8 text-yellow-500' />,
    },
    Approved: {
      color: 'text-blue-500',
      icon: <CheckCircle2 className='h-8 w-8 text-blue-500' />,
    },
    Completed: {
      color: 'text-green-500',
      icon: <FileCheck className='h-8 w-8 text-green-500' />,
    },
    Total: {
      color: 'text-purple-500',
      icon: <Ticket className='h-8 w-8 text-purple-500' />,
    },
  }

  const allCards = [
    ...ticketsByStatus,
    { status: 'Total', count: ticketOverview?.totalTicketsByUserId || 0 },
  ]

  return (
    <div>
      <p className='flex items-center gap-2 text-xl md:text-2xl'>
        <Ticket className='text-green-500' />
        Tickets Overview
      </p>
      <section className='py-4'>
        <div className='grid gap-6 grid-cols-2 md:grid-cols-4'>
          {allCards.map((t) => (
            <Card
              key={t.status}
              className='rounded-2xl border-red-300 shadow-xl'
            >
              <CardHeader className='flex flex-col items-center text-center'>
                <div className='mb-4'>{statusConfig[t.status].icon}</div>
                <CardTitle
                  className={`text-2xl font-bold ${statusConfig[t.status].color}`}
                >
                  {t.count}
                </CardTitle>
                <CardDescription className='mt-2'>{t.status}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

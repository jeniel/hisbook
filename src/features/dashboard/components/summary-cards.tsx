import { Ticket, Hotel, UserPen } from 'lucide-react'
import { useCensus } from '@/hooks/useCensus'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function Summary({
  summary,
}: {
  summary: NonNullable<ReturnType<typeof useCensus>['summary']>
}) {
  const cards = [
    {
      title: 'Tickets',
      description: 'Total tickets',
      value: summary?.totalTickets,
      icon: <Ticket className='h-10 w-10 text-green-500' />,
      color: 'text-green-400',
    },
    {
      title: 'Departments',
      description: 'Total departments',
      value: summary?.totalDepartments,
      icon: <Hotel className='h-10 w-10 text-purple-500' />,
      color: 'text-purple-400',
    },
    {
      title: 'Users',
      description: 'Total users',
      value: summary?.totalUsers,
      icon: <UserPen className='h-10 w-10 text-blue-500' />,
      color: 'text-blue-400',
    },
  ]

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle className='text-lg font-semibold'>
              {card.title}
            </CardTitle>
            <div className='text-3xl'>{card.icon}</div>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            <p className='text-muted-foreground text-sm'>{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

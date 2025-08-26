import { Query } from '@/graphql/codegen/graphql'
import { CENSUS_DATA } from '@/graphql/operation/query/census'
import { useQuery } from '@apollo/client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function Summary() {
  const { data, loading, error } = useQuery<Query>(CENSUS_DATA)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const summary = data?.getCensusSummary

  const cards = [
    {
      title: 'Tickets',
      description: 'Total tickets',
      value: summary?.totalTickets,
      icon: '🎟️',
      color: 'text-red-400',
    },
    {
      title: 'Departments',
      description: 'Total departments',
      value: summary?.totalDepartments,
      icon: '🏢',
      color: 'text-blue-400',
    },
    {
      title: 'Users',
      description: 'Total users',
      value: summary?.totalUsers,
      icon: '🧑🏽',
      color: 'text-green-400',
    },
    {
      title: 'Posts',
      description: 'Total posts',
      value: summary?.totalPosts,
      icon: '📰',
      color: 'text-yellow-400',
    },
  ]

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle className='text-lg font-semibold'>
              {card.title}
            </CardTitle>
            <p className='text-3xl'>{card.icon}</p>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>{' '}
            <p className='text-muted-foreground text-sm'>{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

import { Query, Role } from '@/graphql/codegen/graphql'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useQuery } from '@apollo/client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Main } from '@/components/layout/main'
import AllTickets from './components/all-tickets'
import CreateTickets from './components/create-tickets'
import MyTickets from './components/my-tickets'

export default function Tickets() {
  const { data, loading } = useQuery<Query>(ME_QUERY)

  if (loading || !data?.meQuery?.user) return null

  const roles = data.meQuery.user.role || [] // Role[]
  const isAdmin = roles.includes(Role.Admin)

  return (
    <>
      <Main>
        <h1 className='mb-4 text-2xl font-bold'>Ticket Missed Log</h1>
        <Tabs defaultValue='create-ticket'>
          <TabsList>
            <TabsTrigger value='create-ticket'>Create A Ticket</TabsTrigger>
            <TabsTrigger value='my-tickets'>My Tickets</TabsTrigger>

            {isAdmin && (
              <TabsTrigger value='all-tickets'>All Ticket Lists</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value='create-ticket'>
            <CreateTickets />
          </TabsContent>

          <TabsContent value='my-tickets'>
            <MyTickets />
          </TabsContent>

          {isAdmin && (
            <TabsContent value='all-tickets'>
              <AllTickets />
            </TabsContent>
          )}
        </Tabs>
      </Main>
    </>
  )
}

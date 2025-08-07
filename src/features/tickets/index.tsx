import { Main } from '@/components/layout/main'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import MyTickets from './components/my-tickets'
import CreateTickets from './components/create-tickets'

export default function Tickets() {
  return (
    <>
      <Main>
        <h1 className='text-2xl font-bold mb-4'>Ticket Missed Log</h1>
          <Tabs defaultValue="my-tickets">
            <TabsList>
              <TabsTrigger value="my-tickets">User Lists</TabsTrigger>
              <TabsTrigger value="create-ticket">Create A Ticket</TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-tickets">
              <MyTickets />
            </TabsContent>

            <TabsContent value="create-ticket">
              <CreateTickets />
            </TabsContent>
          </Tabs>
      </Main>
    </>
  )
}
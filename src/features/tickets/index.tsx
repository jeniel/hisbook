import { Main } from '@/components/layout/main'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import AllTickets from './components/all-tickets'
import CreateTickets from './components/create-tickets'
import MyTickets from './components/my-tickets'

export default function Tickets() {
  return (
    <>
      <Main>
        <h1 className='text-2xl font-bold mb-4'>Ticket Missed Log</h1>
          <Tabs defaultValue="create-ticket">
            <TabsList>
              <TabsTrigger value="create-ticket">Create A Ticket</TabsTrigger>
              <TabsTrigger value="my-tickets">My Tickets</TabsTrigger>
              <TabsTrigger value="all-tickets">All Ticket Lists</TabsTrigger>
            </TabsList>

            <TabsContent value="create-ticket">
              <CreateTickets loggedInUser="ACE" /> 
              {/* Edit the logged in user here */}
            </TabsContent>

            <TabsContent value="my-tickets">
              <MyTickets />
            </TabsContent>
            
            {/* ADMIN CAN ONLY SEE THE ALL TICKETS TAB */}
            <TabsContent value="all-tickets">
              <AllTickets />
            </TabsContent>
          </Tabs>
      </Main>
    </>
  )
}
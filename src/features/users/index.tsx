import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Main } from "@/components/layout/main"
import ViewUsers from "./components/view-user"
import CreateUser from "./components/create-user"

export default function Users() {
    return (
        <Main>
            <h1 className='text-2xl font-bold mb-4'>Users</h1>
            <Tabs defaultValue="view-users">
                <TabsList>
                    <TabsTrigger value="view-users">User Lists</TabsTrigger>
                    <TabsTrigger value="create-user">Create A User</TabsTrigger>
                </TabsList>

                <TabsContent value="view-users">
                    <ViewUsers />
                </TabsContent>

                <TabsContent value="create-user">
                    <CreateUser />
                </TabsContent>
            </Tabs>
        </Main>
    )
}
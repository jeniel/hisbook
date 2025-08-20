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
            <Tabs defaultValue="create-user">
                <TabsList className="w-full">
                    <TabsTrigger value="create-user">Create A User</TabsTrigger>
                    <TabsTrigger value="view-users">User Lists</TabsTrigger> 
                </TabsList>

                <TabsContent value="create-user">
                    <CreateUser />
                </TabsContent>

                <TabsContent value="view-users">
                    <ViewUsers />
                </TabsContent>
                
            </Tabs>
        </Main>
    )
}

// Todo Connect Functionality from backend
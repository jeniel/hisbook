import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Main } from "@/components/layout/main"
import ViewDepartments from "./components/view-deparments"
import CreateDepartment from "./components/create-department"

export default function Departments() {
    return (
      <Main>
        <h1 className='text-2xl font-bold mb-4'>Departments</h1>
        <Tabs defaultValue="view-departments">
                <TabsList className="mb-4">
                  <TabsTrigger value="view-departments">Department Lists</TabsTrigger>
                  <TabsTrigger value="create-department">Create A Department</TabsTrigger>
                </TabsList>

                <TabsContent value="view-departments">
                  <ViewDepartments />
                </TabsContent>

                <TabsContent value="create-department">
                  <CreateDepartment />
                </TabsContent>
            </Tabs>
      </Main>  
    )
}
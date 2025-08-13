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
        <Tabs defaultValue="create-department">
                <TabsList className="mb-4">
                  <TabsTrigger value="create-department">Create A Department</TabsTrigger>
                  <TabsTrigger value="view-departments">Department Lists</TabsTrigger>
                </TabsList>

                <TabsContent value="create-department">
                  <CreateDepartment />
                </TabsContent>

                <TabsContent value="view-departments">
                  <ViewDepartments />
                </TabsContent>

            </Tabs>
      </Main>  
    )
}
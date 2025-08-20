import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Main } from '@/components/layout/main'
import CreateDepartment from './components/create-department'
import ViewDepartments from './components/view-deparments'

export default function Departments() {
  return (
    <Main>
      <h1 className='mb-4 text-2xl font-bold'>Departments</h1>
      <Tabs defaultValue='create-department'>
        <TabsList className='w-full'>
          <TabsTrigger value='create-department'>
            Create A Department
          </TabsTrigger>
          <TabsTrigger value='view-departments'>Department Lists</TabsTrigger>
        </TabsList>

        <TabsContent value='create-department'>
          <CreateDepartment />
        </TabsContent>

        <TabsContent value='view-departments'>
          <ViewDepartments />
        </TabsContent>
      </Tabs>
    </Main>
  )
}

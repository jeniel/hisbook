import { Link } from '@tanstack/react-router'
import { Query } from '@/graphql/codegen/graphql'
import { CENSUS_DATA } from '@/graphql/operation/query/census'
import { useQuery } from '@apollo/client'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function DepartmentOverview() {
  const { data, loading, error } = useQuery<Query>(CENSUS_DATA)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const departments = data?.getCensusSummary.departmentsWithUserCount

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>🏢 Department Overview Number of Users</CardTitle>
        <Link to='/departments'>
          <Button variant={'outline'}>🏢 Go To Departments</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5'>
          {departments?.map((dept) => (
            <Card key={dept.departmentId}>
              <CardContent className='font-semibold'>
                {dept.departmentName}
              </CardContent>
              <CardContent className='text-2xl font-bold'>
                {dept.userCount}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

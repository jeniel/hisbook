/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ticket } from 'lucide-react'
import { useQuery } from '@apollo/client'
import { FIND_ALL_DEPARTMENTS } from '@/graphql/operation/query/department'
import Spinner from '@/components/spinner'
import DeptTickets from '../components/dept-tickets'

export default function MisTicket() {
  const { data, loading } = useQuery(FIND_ALL_DEPARTMENTS, {
    variables: { page: 1, perPage: 50 },
  })

  if (loading) return <Spinner />

  // find MIS department dynamically
  const misDept = data?.findAllDepartments?.data?.find(
    (dept: any) => dept.name.toUpperCase() === 'MIS'
  )

  if (!misDept) {
    return <p className="text-red-500">MIS Department not found.</p>
  }

  return (
    <>
      <div className="mb-4">
        <h1 className="mb-2 flex items-center gap-2 text-3xl font-semibold">
          <Ticket className="h-10 w-10 text-green-500" />
          Tickets for {misDept.name}
        </h1>
        <p className="text-md text-muted-foreground">
          Update Tickets and Services
        </p>
      </div>
      <DeptTickets departmentId={misDept.id} />
    </>
  )
}

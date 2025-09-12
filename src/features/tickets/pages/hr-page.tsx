/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ticket } from 'lucide-react'
import DeptTickets from '../components/dept-tickets'
import Spinner from '@/components/spinner'
import { FIND_ALL_DEPARTMENTS } from '@/graphql/operation/query/department'
import { useQuery } from '@apollo/client'
import { Query } from '@/graphql/codegen/graphql'

export default function HrTickets() {
  const { data, loading } = useQuery<Query>(FIND_ALL_DEPARTMENTS, {
    variables: { page: 1, perPage: 50 },
  })

  if (loading) return <Spinner />

  // find MIS department dynamically
  const hrDept = data?.findAllDepartments?.data?.find(
    (dept: any) => dept.name.toUpperCase() === 'HR'
  )

  if (!hrDept) {
    return <p className='text-red-500'>MIS Department not found.</p>
  }

  return (
    <>
      <div className='mb-4'>
        <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
          <Ticket className='h-10 w-10 text-green-500' />
          Tickets for {hrDept.name}
        </h1>
        <p className='text-md text-muted-foreground'>
          Update Tickets and Services
        </p>
      </div>
      <DeptTickets departmentId={hrDept.id} />
    </>
  )
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Query } from '@/graphql/codegen/graphql'
import { FIND_ALL_DEPARTMENTS } from '@/graphql/operation/query/department'
import { useQuery } from '@apollo/client'
import { Ticket } from 'lucide-react'
import Spinner from '@/components/spinner'
import DeptTickets from '../components/dept-tickets'

export default function EngrTicket() {
  const { data, loading } = useQuery<Query>(FIND_ALL_DEPARTMENTS, {
    variables: { page: 1, perPage: 50 },
  })

  if (loading) return <Spinner />

  // find MIS department dynamically
  const engrDept = data?.findAllDepartments?.data?.find(
    (dept: any) => dept.name.toUpperCase() === 'ENGR'
  )

  if (!engrDept) {
    return <p className='text-red-500'>MIS Department not found.</p>
  }
  return (
    <>
      <div className='mb-4'>
        <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
          <Ticket className='h-10 w-10 text-green-500' />
          Tickets for {engrDept.name}
        </h1>
        <p className='text-md text-muted-foreground'>
          Update Tickets and Services
        </p>
      </div>
      <DeptTickets departmentId={engrDept.id} />
    </>
  )
}

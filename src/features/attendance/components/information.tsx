import { useEffect } from 'react'
import { User, Building2 } from 'lucide-react'
import useMeQuery from '@/hooks/useMeQuery'
import { Card, CardContent } from '@/components/ui/card'
import { HisUser } from '../hooks/useAttendance'

interface InformationProps {
  user: HisUser | null
  fetchUser: (idNumber: string) => void
}

export function Information({ fetchUser, user }: InformationProps) {
  const { employeeID } = useMeQuery()

  useEffect(() => {
    if (employeeID) fetchUser(employeeID.toString())
  }, [employeeID, fetchUser])

  return (
    <Card className='border-muted mx-auto w-full rounded-2xl border shadow-md'>
      <CardContent className='text-md'>
        <div>
          <h2 className='flex items-center gap-2 text-xl font-semibold'>
            <User className='text-primary h-5 w-5' />
            Employee Information
          </h2>
        </div>
        {user ? (
          <>
            <div className='flex items-center gap-2'>
              <User className='text-muted-foreground h-4 w-4' />
              <p>
                <span className='font-medium'>Name:</span> {user.fullName}
              </p>
            </div>

            <div className='flex items-center gap-2'>
              <Building2 className='text-muted-foreground h-4 w-4' />
              <p>
                <span className='font-medium'>Department:</span>{' '}
                {user.department.departmentName}
              </p>
            </div>

            {/* <div className='flex items-center gap-2'>
              <IdCard className='text-muted-foreground h-4 w-4' />
              <p>
                <span className='font-medium'>HIS ID:</span> {user.id}
              </p>
            </div> */}
          </>
        ) : (
          <p className='text-muted-foreground italic'>
            No employee data found.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

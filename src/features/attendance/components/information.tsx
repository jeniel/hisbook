import { useEffect } from 'react'
import { useMeQuery } from '@/hooks/useMeQuery'
import { Card, CardContent } from '@/components/ui/card'
import { HisUser } from '../hooks/useAttendance'

interface InformationProps {
  user: HisUser | null
  fetchUser: (idNumber: string) => void
}

export function Information({ fetchUser, user }: InformationProps) {
  const { employeeID } = useMeQuery()

  useEffect(() => {
    if (employeeID !== null && employeeID !== undefined) {
      fetchUser(employeeID.toString())
    }
  }, [employeeID, fetchUser])

  return (
    <Card>
      <CardContent className='space-y-4'>
        {user && (
          <div>
            <div className='text-xl'>
              <p>Employee Information:</p>
            </div>
            <div className='text-md'>
              <p>
                <span className='font-medium'>Name:</span> {user.fullName}
              </p>
              <p>
                <span className='font-medium'>Department:</span>{' '}
                {user.department.departmentName}
              </p>
              {/* <p>
                <span className='font-medium'>HIS ID:</span> {user.id}
              </p> */}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

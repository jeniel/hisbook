import { useEffect, useState } from 'react'
import { Query } from '@/graphql/codegen/graphql'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useQuery } from '@apollo/client'
import { Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { HisUser } from '../hooks/useAttendance'

interface UserSearchProps {
  onSearch: (idNumber: string) => void
  loading: boolean
  user: HisUser | null
  error: string | null
  fetchUser: (idNumber: string) => void
}

export function UserSearch({
  onSearch,
  fetchUser,
  loading,
  user,
  error,
}: UserSearchProps) {
  const [idNumber, setIdNumber] = useState('') // default empty string
  // const { data } = useQuery<Query>(ME_QUERY)

  useEffect(() => {
    fetchUser("0070")
  }, [fetchUser])

  // console.log(idNumber)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (idNumber.trim()) {
      onSearch(idNumber.trim())
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Search className='h-5 w-5' />
          Employee Search
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <form onSubmit={handleSubmit} className='flex gap-2'>
          <Input
            type='text'
            placeholder='Enter Employee ID Number'
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            disabled={loading}
            className='flex-1'
          />
          <Button type='submit' disabled={loading || !idNumber.trim()}>
            {loading ? (
              'Searching...'
            ) : (
              <>
                <Search className='mr-2 h-4 w-4' />
                Search
              </>
            )}
          </Button>
        </form>

        {error && (
          <div className='rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600'>
            {error}
          </div>
        )}

        {user && (
          <div className='rounded-md border border-green-200 bg-green-50 p-4'>
            <div className='mb-2 flex items-center gap-2'>
              <User className='h-4 w-4 text-green-600' />
              <span className='font-medium text-green-800'>Employee Found</span>
            </div>
            <div className='space-y-1 text-sm'>
              <p>
                <span className='font-medium'>Name:</span> {user.fullName}
              </p>
              <p>
                <span className='font-medium'>Department:</span>{' '}
                {user.department.departmentName}
              </p>
              <p>
                <span className='font-medium'>HIS ID:</span> {user.id}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

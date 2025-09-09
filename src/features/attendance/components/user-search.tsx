import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, User } from 'lucide-react'
import { HisUser } from '../hooks/useAttendance'

interface UserSearchProps {
  onSearch: (idNumber: string) => void
  loading: boolean
  user: HisUser | null
  error: string | null
}

export function UserSearch({ onSearch, loading, user, error }: UserSearchProps) {
  const [idNumber, setIdNumber] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (idNumber.trim()) {
      onSearch(idNumber.trim())
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Employee Search
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter Employee ID Number"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            disabled={loading}
            className="flex-1"
          />
          <Button type="submit" disabled={loading || !idNumber.trim()}>
            {loading ? (
              'Searching...'
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Search
              </>
            )}
          </Button>
        </form>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
            {error}
          </div>
        )}

        {user && (
          <div className="bg-green-50 p-4 rounded-md border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4 text-green-600" />
              <span className="font-medium text-green-800">Employee Found</span>
            </div>
            <div className="text-sm space-y-1">
              <p><span className="font-medium">Name:</span> {user.fullName}</p>
              <p><span className="font-medium">Department:</span> {user.department.departmentName}</p>
              <p><span className="font-medium">HIS ID:</span> {user.id}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

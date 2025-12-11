import { useState } from 'react'
import { FIND_ONE_USER } from '@/graphql/operation/query/user'
import { useQuery } from '@apollo/client'
import {
  Eye,
  User,
  Mail,
  Users,
  Calendar,
  Home,
  Phone,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'

type ViewUserDialogProps = {
  userId: string
}

export default function ViewUser({ userId }: ViewUserDialogProps) {
  const [open, setOpen] = useState(false)

  const { data, loading, error } = useQuery(FIND_ONE_USER, {
    variables: { id: userId },
    skip: !open,
  })

  const user = data?.findOneUser
  const profile = user?.profile

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>
        <Button size='sm'>
          <Eye className='h-4 w-4' /> View
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-5xl'>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogClose />
        </DialogHeader>

        {loading && (
          <div className='space-y-2 p-6'>
            <Skeleton className='h-6 w-40' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-4 w-1/2' />
          </div>
        )}

        {error && <div className='text-red-500'>Error loading user.</div>}

        {!loading && user && (
          <div className='space-y-6'>
            {/* Basic Info */}
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div className='flex items-center gap-2'>
                <User className='h-5 w-5 text-blue-500' />
                <div>
                  <div className='text-sm font-medium'>Username</div>
                  <div className='text-lg font-semibold'>
                    {user.username || 'N/A'}
                  </div>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <Users className='h-5 w-5 text-green-500' />
                <div>
                  <div className='text-sm font-medium'>Role</div>
                  <Badge>{user.role || 'N/A'}</Badge>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <Users className='h-5 w-5 text-purple-500' />
                <div>
                  <div className='text-sm font-medium'>Department</div>
                  <div>{user.department?.name || 'N/A'}</div>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <Calendar className='h-5 w-5 text-orange-500' />
                <div>
                  <div className='text-sm font-medium'>Created At</div>
                  <div>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleString()
                      : 'N/A'}
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Section */}
            {profile ? (
              <div className='space-y-3 border-t pt-4'>
                <div className='flex items-center gap-2 text-lg font-semibold'>
                  <User className='text-blue-500' /> Profile
                </div>

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div className='flex items-center gap-2'>
                    <User className='h-4 w-4 text-blue-500' />
                    <div>
                      <div className='text-sm font-medium'>Name</div>
                      <div>
                        {[
                          profile.firstName,
                          profile.middleName,
                          profile.lastName,
                        ]
                          .filter(Boolean)
                          .join(' ') || 'N/A'}
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <User className='h-4 w-4 text-indigo-500' />
                    <div>
                      <div className='text-sm font-medium'>Employee ID</div>
                      <div>{profile.employeeID || 'N/A'}</div>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <Users className='h-4 w-4 text-purple-500' />
                    <div>
                      <div className='text-sm font-medium'>Gender</div>
                      <div>{profile.gender || 'N/A'}</div>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <Phone className='h-4 w-4 text-teal-500' />
                    <div>
                      <div className='text-sm font-medium'>Contact</div>
                      <div>{profile.contact || 'N/A'}</div>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <Phone className='h-4 w-4 text-teal-400' />
                    <div>
                      <div className='text-sm font-medium'>
                        Secondary Contact
                      </div>
                      <div>{profile.secondaryContact || 'N/A'}</div>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <Mail className='h-5 w-5 text-red-500' />
                    <div>
                      <div className='text-sm font-medium'>Email</div>
                      <div>{profile.email || user.email || 'N/A'}</div>
                    </div>
                  </div>

                  <div className='col-span-1 flex items-center gap-2 sm:col-span-2'>
                    <Home className='h-4 w-4 text-yellow-500' />
                    <div>
                      <div className='text-sm font-medium'>Address</div>
                      <div>{profile.address || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className='border-t pt-4 text-sm text-gray-500 italic'>
                User has not updated their profile.
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

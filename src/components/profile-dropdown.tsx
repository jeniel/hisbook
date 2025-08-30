import { Link } from '@tanstack/react-router'
import { Query, Role } from '@/graphql/codegen/graphql'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useQuery } from '@apollo/client'
import { useLogout } from '@/hooks/useLogout'
import useCurrentUser from '@/hooks/useUser'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Avatar from '@/features/home/components/avatar'

export function ProfileDropdown() {
  const { user } = useCurrentUser()
  const { logout } = useLogout()
  const { data } = useQuery<Query>(ME_QUERY)

  const roles = data?.meQuery?.user?.role || []
  const profile = user?.profile

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full p-0'>
          <Avatar avatarUrl={profile?.avatar ?? undefined} size={32} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-md leading-none font-medium'>
              {profile?.firstName && profile?.lastName
                ? `${profile.firstName} ${profile.lastName}`
                : 'Guest User'}
            </p>
            <p className='text-sm'>@{user?.username || 'Guest User'}</p>
            <p className='text-muted-foreground text-xs leading-none'>
              {user?.email || 'No email provided'}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to='/'>Home</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to='/profile'>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to='/tickets'>Tickets</Link>
          </DropdownMenuItem>

          {roles.includes(Role.Admin) && (
            <>
              <DropdownMenuItem asChild>
                <Link to='/users'>Users</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to='/departments'>Departments</Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

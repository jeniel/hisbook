import { Link } from '@tanstack/react-router'

import { useLogout } from '@/hooks/useLogout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import useCurrentUser from '@/hooks/useUser'

export function ProfileDropdown() {
  const { user } = useCurrentUser()
  const { logout } = useLogout()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            {/* Change this avatar */}
            <AvatarImage src='/avatars/01.png' alt='@shadcn' /> 
            <AvatarFallback><img src="./images/ace.png" alt="ACE Logo" /></AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className="text-md leading-none font-medium">
              {user?.profile?.firstName && user?.profile?.lastName
                ? `${user.profile.firstName} ${user.profile.lastName}`
                : 'Guest User'}
            </p>
            <p className='text-sm'>
              @{user?.username || 'Guest User'}
            </p>
            <p className='text-muted-foreground text-xs leading-none'>
              {user?.email || 'No email provided'}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to='/profile'>
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to='/tickets'>
              Tickets
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to='/users'>
              Users
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to='/departments'>
              Departments
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

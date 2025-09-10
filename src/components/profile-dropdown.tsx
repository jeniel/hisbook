import { useLogout } from '@/hooks/useLogout'
import useCurrentUser from '@/hooks/useUser'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Avatar from '@/features/home/components/avatar'

export function ProfileDropdown() {
  const { user } = useCurrentUser()
  const { logout } = useLogout()

  const profile = user?.profile

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='h-`10` w-`10` relative rounded-full p-0'
        >
          <Avatar avatarUrl={profile?.avatar ?? undefined} size={40} />
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
        <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

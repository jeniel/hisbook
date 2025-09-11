import useCurrentUser from '@/hooks/useUser'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Avatar from '@/components/avatar'

export function ProfileDropdown() {
  const { user } = useCurrentUser()

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
    </DropdownMenu>
  )
}

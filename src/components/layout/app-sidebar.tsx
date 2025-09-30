import { Role } from '@/graphql/codegen/graphql'
import { LogOut } from 'lucide-react'
import { useLogout } from '@/hooks/useLogout'
import useMeQuery from '@/hooks/useMeQuery'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from '@/components/ui/sidebar'
import { NavGroup } from '@/components/layout/nav-group'
import Avatar from '../avatar'
import { sidebarData } from './data/sidebar-data'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data, loading } = useMeQuery()
  const { logout } = useLogout()

  if (loading || !data?.meQuery?.user) return null

  const user = data.meQuery.user
  const profile = user.profile
  const roles: Role[] = user.role || []

  // Filter navGroups based on roles
  const visibleNavGroups = sidebarData.navGroups.filter((group) => {
    // Only allow Admins to see Config & Assigned Tickets
    if (group.title === 'Config' || group.title === 'Assigned Tickets') {
      return roles.includes(Role.Admin)
    }
    return true // Always show other groups
  })

  return (
    <Sidebar collapsible='icon' variant='floating' {...props}>
      {/* Logo */}
      <div>
        <div className='flex items-center px-4 py-2'>
          <img
            src='/images/acebook-logo.webp'
            alt='Acebook Logo'
            className='h-16 w-auto object-contain'
            loading='lazy'
          />
        </div>

        {/* User Info (hides in collapsed mode) */}
        <div className='flex flex-row items-center gap-4 p-2 group-data-[collapsible=icon]:hidden'>
          <div>
            <Avatar
              avatarUrl={profile?.avatar ?? '/images/ace-logo-192px.webp'}
              size={64} // bigger than header avatar
            />
          </div>
          <div>
            <p className='text-md font-semibold'>
              {profile?.firstName && profile?.lastName
                ? `${profile.firstName} ${profile.lastName}`
                : 'Guest User'}
            </p>
            <p className='text-muted-foreground text-sm'>
              @{user?.username || 'guest'}
            </p>
            <p className='text-muted-foreground text-sm'>
              {profile?.title || 'guest'}
            </p>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <SidebarContent>
        {visibleNavGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>

      {/* Footer with responsive logout */}
      <SidebarFooter>
        <Button
          variant='ghost'
          className='w-full justify-start'
          onClick={logout}
        >
          <LogOut className='h-5 w-5' />
          <span className='ml-2 group-data-[collapsible=icon]:hidden'>
            Log out
          </span>
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

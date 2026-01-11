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
    if (group.title === 'Settings' || group.title === 'Assigned Tickets') {
      return roles.includes(Role.Admin)
    }

    // Only allow MIS department to see MIS Tabs
    if (group.title === 'Config') {
      return user.department?.name === 'MIS (MANAGEMENT INFORMATION SYSTEM)'
    }

    if (group.title === 'Admin') {
      return user.department?.name === 'ADMINISTRATIVE OFFICE'
    }

    // Always show other groups
    return true
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
        <div className='flex flex-row items-center gap-2 p-2 group-data-[collapsible=icon]:hidden'>
          <div>
            <img
              src='/images/logo.png'
              alt='ACE - Logo'
              className='h-18 w-18 rounded-full object-cover'
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
        <Button className='w-full justify-start' onClick={logout}>
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

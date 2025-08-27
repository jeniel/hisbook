import {
  Sidebar,
  SidebarContent,
  SidebarRail,
} from '@/components/ui/sidebar'
import { NavGroup } from '@/components/layout/nav-group'
import { sidebarData } from './data/sidebar-data'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { Query, Role } from '@/graphql/codegen/graphql'
import { useQuery } from '@apollo/client'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data, loading } = useQuery<Query>(ME_QUERY)

  if (loading || !data?.meQuery?.user) return null

  const roles: Role[] = data.meQuery.user.role || []

  // Filter navGroups based on roles
  const visibleNavGroups = sidebarData.navGroups.filter((group) => {
    if (group.title === 'Admin') {
      return roles.includes(Role.Admin) // show only for admins
    }
    return true // always show other groups
  })

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <div>
        <img src="./images/acebook-logo.png" alt="Acebook Logo" />
      </div>
      <SidebarContent>
        {visibleNavGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

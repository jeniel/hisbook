import {
  IconLayoutDashboard,
  IconUsers,
  IconHome,
  IconBriefcase,
  IconUserCog,
  IconLayoutBoard,
} from '@tabler/icons-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: 'General',
      items: [
        { title: 'Home', url: '/', icon: IconHome },
        { title: 'My Profile', url: '/profile', icon: IconUserCog },
        { title: 'Tickets', url: '/tickets', icon: IconLayoutDashboard },
      ],
    },
    {
      title: 'Admin',
      items: [
        { title: 'Dashboard', url: '/dashboard', icon: IconLayoutBoard },
        { title: 'Departments', url: '/departments', icon: IconBriefcase },
        { title: 'Users', url: '/users', icon: IconUsers },
      ],
    },
  ],
}

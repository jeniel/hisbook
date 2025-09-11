import {
  IconLayoutDashboard,
  IconUsers,
  // IconHome,
  IconBriefcase,
  IconUserCog,
  IconLayoutBoard,
  IconCalendarWeek,
  IconTimeDuration30,
} from '@tabler/icons-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: 'General',
      items: [
        // { title: 'Home2', url: '/', icon: IconHome },
        // { title: 'Home', url: '/home', icon: IconHome },
        { title: 'Attendance', url: '/', icon: IconTimeDuration30 },
        { title: 'Tickets / Services', url: '/tickets', icon: IconLayoutBoard },
        { title: 'Profile', url: '/profile', icon: IconUserCog },
      ],
    },
    {
      title: 'Admin',
      items: [
        { title: 'Dashboard', url: '/dashboard', icon: IconLayoutDashboard },
        {
          title: 'Requested Tickets',
          url: '/admin-tickets',
          icon: IconLayoutBoard,
        },
        { title: 'Departments', url: '/departments', icon: IconBriefcase },
        { title: 'Users', url: '/users', icon: IconUsers },
        { title: 'Events', url: '/events', icon: IconCalendarWeek },
      ],
    },
  ],
}

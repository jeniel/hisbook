import {
  IconLayoutDashboard,
  IconUsers,
  IconBriefcase,
  IconUserCog,
  IconLayoutBoard,
  IconCalendarWeek,
  IconTimeDuration30,
  IconHome,
  IconDeviceDesktop,
} from '@tabler/icons-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: 'General',
      items: [
        { title: 'Home', url: '/', icon: IconHome },
        { title: 'Attendance', url: '/attendance', icon: IconTimeDuration30 },
        { title: 'Tickets', url: '/tickets', icon: IconLayoutBoard },
        { title: 'Profile', url: '/profile', icon: IconUserCog },
      ],
    },
    {
      title: 'Assigned Tickets',
      items: [
        { title: 'Dashboard', url: '/dashboard', icon: IconLayoutDashboard },
        {
          title: 'Department Tickets',
          url: '/assigned-ticket',
          icon: IconDeviceDesktop,
        },
      ],
    },
    {
      title: 'Config',
      items: [
        { title: 'Users', url: '/users', icon: IconUsers },
        { title: 'Departments', url: '/departments', icon: IconBriefcase },
        { title: 'Events', url: '/events', icon: IconCalendarWeek },
      ],
    },
  ],
}

import {
  IconLayoutDashboard,
  IconUsers,
  IconHome,
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
        { title: 'Home', url: '/', icon: IconHome },
        { title: 'My Profile', url: '/profile', icon: IconUserCog },
        { title: 'Tickets', url: '/tickets', icon: IconLayoutBoard },
         { title: 'Attendance', url: '/attendance', icon: IconTimeDuration30 },
      ],
    },
    {
      title: 'Admin',
      items: [
        { title: 'Dashboard', url: '/dashboard', icon: IconLayoutDashboard },
        {
          title: 'Admin Tickets',
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

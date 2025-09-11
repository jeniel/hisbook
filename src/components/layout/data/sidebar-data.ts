import {
  IconLayoutDashboard,
  IconUsers,
  IconBriefcase,
  IconUserCog,
  IconLayoutBoard,
  IconCalendarWeek,
  IconTimeDuration30,
  IconHome,
} from '@tabler/icons-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: 'General',
      items: [
        { title: 'Home', url: '/', icon: IconHome },
        { title: 'Attendance', url: '/attendance', icon: IconTimeDuration30 },
        { title: 'Tickets / Services', url: '/tickets', icon: IconLayoutBoard },
        { title: 'Profile', url: '/profile', icon: IconUserCog },
      ],
    },
    {
      title: 'Department Tickets',
      items: [
        { title: 'Dashboard', url: '/dashboard', icon: IconLayoutDashboard },
        { title: 'MIS', url: '/mis-ticket', icon: IconLayoutDashboard },
        { title: 'HR', url: '/hr-ticket', icon: IconLayoutDashboard },
        { title: 'ENGR', url: '/engr-ticket', icon: IconLayoutDashboard },
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

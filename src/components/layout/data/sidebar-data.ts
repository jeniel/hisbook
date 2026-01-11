import {
  IconLayoutDashboard,
  IconUserCog,
  IconLayoutBoard,
  // IconCalendarWeek,
  IconTimeDuration30,
  IconHome,
  IconDeviceDesktop,
  IconMessage,
  IconBriefcase,
  IconUsers,
} from '@tabler/icons-react'
import { TicketIcon } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: 'General',
      items: [
        { title: 'Home', url: '/', icon: IconHome },
        { title: 'Attendance', url: '/attendance', icon: IconTimeDuration30 },
        { title: 'Chat', url: '/chat', icon: IconMessage },
        { title: 'Tickets', url: '/user-tickets', icon: IconLayoutBoard },
        { title: 'Profile', url: '/profile', icon: IconUserCog },
      ],
    },
    {
      title: 'Tickets',
      items: [
        {
          title: 'Department Tickets',
          url: '/department-ticket',
          icon: IconDeviceDesktop,
        },
      ],
    },
    {
      title: 'Config',
      items: [
        { title: 'Dashboard', url: '/dashboard', icon: IconLayoutDashboard },
        { title: 'Users', url: '/users', icon: IconUsers },
        { title: 'Departments', url: '/departments', icon: IconBriefcase },
        { title: 'All Tickets', url: '/all-ticket', icon: TicketIcon },
      ],
    },
    {
      title: 'Admin',
      items: [{ title: 'All Tickets', url: '/all-ticket', icon: TicketIcon }],
    },
  ],
}

import {
  IconLayoutDashboard,
  IconSettings,
  IconTool,
  IconUserCog
} from '@tabler/icons-react'
import { Command, GalleryVerticalEnd, AudioWaveform } from 'lucide-react'
import { type SidebarData } from '../types'
import { IconPalette, IconHelp, IconUsers, IconHome, IconBriefcase  } from '@tabler/icons-react'

export const sidebarData: SidebarData = {
  user: {
    name: 'joem',
    email: 'joemdev@gmail.com',
    avatar: '/images/shadcn.jpg',
  },
  // teams: [
  //   {
  //     name: 'ACE BOOK',
  //     logo: Command,
  //     plan: 'ACE BOOK',
  //   },
  //   {
  //     name: 'Acme Inc',
  //     logo: GalleryVerticalEnd,
  //     plan: 'Enterprise',
  //   },
  //   {
  //     name: 'Acme Corp.',
  //     logo: AudioWaveform,
  //     plan: 'Startup',
  //   },
  // ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Home',
          url: '/',
          icon: IconHome,
        },
        {
          title: 'My Profile',
          url: '/profile',
          icon: IconUserCog,
        },
        {
          title: 'Tickets',
          url: '/tickets',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Users',
          url: '/users',
          icon: IconUsers,
        },
        {
          title: 'Departments',
          url: '/departments',
          icon: IconBriefcase,
        },
        // {
        //   title: 'Settings',
        //   icon: IconSettings,
        //   items: [
        //     {
        //       title: 'Profile',
        //       url: '/settings',
        //       icon: IconUserCog,
        //     },
        //     {
        //       title: 'Account',
        //       url: '/settings/account',
        //       icon: IconTool,
        //     },
        //     {
        //       title: 'Appearance',
        //       url: '/settings/appearance',
        //       icon: IconPalette,
        //     }
        //   ]
        // },
        // {
        //   title: 'Help Center',
        //   url: '/help-center',
        //   icon: IconHelp,
        // }
      ]
    }
  ]
}

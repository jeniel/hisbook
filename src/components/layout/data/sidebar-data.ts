import {
  IconLayoutDashboard,
  IconSettings,
  IconTool,
  IconUserCog
} from '@tabler/icons-react'
import { Command } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'joem',
    email: 'joemdev@gmail.com',
    avatar: '/images/shadcn.jpg',
  },
  teams: [
    {
      name: 'ACE BOOK',
      logo: Command,
      plan: 'ACE BOOK',
    },
    // {
    //   name: 'Acme Inc',
    //   logo: GalleryVerticalEnd,
    //   plan: 'Enterprise',
    // },
    // {
    //   name: 'Acme Corp.',
    //   logo: AudioWaveform,
    //   plan: 'Startup',
    // },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: IconLayoutDashboard,
        },

        // {
        //   title: 'Channels',
        //   url: '/channels',
        //   icon: IconSocial,
        // },
        // {
        //   title: 'Apps',
        //   url: '/apps',
        //   icon: IconPackages,
        // },
        // {
        //   title: 'Chats',
        //   url: '/chats',
        //   //badge: '3',

        //   icon: IconMessages,
        // },
        // {
        //   title: 'Users',
        //   url: '/users',
        //   icon: IconUsers,
        // },
      ],
    },

    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: IconSettings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: IconUserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: IconTool,
            },
            // {
            //   title: 'Appearance',
            //   url: '/settings/appearance',
            //   icon: IconPalette,
            // },
            // {
            //   title: 'Notifications',
            //   url: '/settings/notifications',
            //   icon: IconNotification,
            // },
            // {
            //   title: 'Display',
            //   url: '/settings/display',
            //   icon: IconBrowserCheck,
            // },
          ],
        },
        // {
        //   title: 'Help Center',
        //   url: '/help-center',
        //   icon: IconHelp,
        // },
      ],
    },
  ],
}

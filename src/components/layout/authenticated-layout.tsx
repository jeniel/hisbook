// import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { Outlet } from '@tanstack/react-router'
// n8n chat imports
// import { createChat } from '@n8n/chat'
// import '@n8n/chat/style.css'
import { cn } from '@/lib/utils'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { ThemeSwitch } from '../theme-switch'
import { Header } from './header'

interface Props {
  children?: React.ReactNode
}

export function AuthenticatedLayout({ children }: Props) {
  const defaultOpen = Cookies.get('sidebar_state') !== 'false'

  // useEffect(() => {
  //   const n8nWebhook = import.meta.env.VITE_N8N_CHAT_WEBHOOK
  //   // only create once, guard against duplicates
  //   if (!document.querySelector('.n8n-chat')) {
  //     createChat({
  //       webhookUrl: n8nWebhook,
  //       loadPreviousSession: false, // avoids auto-triggering executions
  //       initialMessages: ['Hi there! 🏥 ', 'How can I assist you today?'],
  //       i18n: {
  //         en: {
  //           title: 'Hi there! ❤️',
  //           subtitle: "Start a chat. We're here to help you 24/7. 🕕",
  //           footer: '',
  //           getStarted: 'New Conversation',
  //           inputPlaceholder: 'Ask. . .',
  //           closeButtonTooltip: '',
  //         },
  //       },
  //     })
  //   }
  // }, [])

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={{
        ['--sidebar-width' as string]: '310px',
        ['--sidebar-width-icon' as string]: '50px',
      }}
    >
      <AppSidebar />
      <div
        id='content'
        className={cn(
          'ml-auto w-full max-w-full',
          'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
          'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
          'sm:transition-[width] sm:duration-200 sm:ease-linear',
          'flex h-svh flex-col',
          'group-data-[scroll-locked=1]/body:h-full',
          'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh'
        )}
      >
        {children ? (
          children
        ) : (
          <>
            <Header>
              <div className='ml-auto flex items-center space-x-4'>
                <ThemeSwitch />
              </div>
            </Header>
            <div className='px-3'>
              <Outlet />
            </div>
          </>
        )}
      </div>
    </SidebarProvider>
  )
}

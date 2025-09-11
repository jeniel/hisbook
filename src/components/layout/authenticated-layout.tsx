import Cookies from 'js-cookie'
import { Outlet } from '@tanstack/react-router'
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
  return (
    <>
      <SidebarProvider
        defaultOpen={defaultOpen}
        style={{
          // change widths here
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
    </>
  )
}

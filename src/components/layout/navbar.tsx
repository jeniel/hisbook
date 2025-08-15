import { Link, useRouterState } from '@tanstack/react-router'
import {
  IconLayoutDashboard,
  IconUserCog,
  IconUsers,
  IconHome,
  IconBriefcase,
} from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { ProfileDropdown } from '../profile-dropdown'
import { ThemeSwitch } from '../theme-switch'

export default function Navbar() {
  const { location } = useRouterState()

  const navLinks = [
    { to: '/', icon: <IconHome className='h-16 w-16' />, label: 'Home' },
    { to: '/tickets', icon: <IconLayoutDashboard className='h-16 w-16' />, label: 'Tickets' },
    { to: '/users', icon: <IconUsers className='h-16 w-16' />, label: 'Users' },
    { to: '/departments', icon: <IconBriefcase className='h-16 w-16' />, label: 'Departments' },
    { to: '/profile', icon: <IconUserCog className='h-16 w-16' />, label: 'Profile' },
  ]

  return (
    <header className='border-border sticky top-0 z-50 border-b bg-white dark:bg-neutral-900 '>
      <div className='mx-auto flex items-center justify-between px-4 py-2'>
        {/* Left - Logo */}
        <div className='flex items-center'>
          <Link to='/'>
            <img
              src='./images/acebook-logo.png'
              alt='ACE-Book Logo'
              className='h-12 w-auto'
            />
          </Link>
        </div>

        {/* Center - Navigation */}
        <nav className='items-center space-x-4 hidden lg:block mr-12'>
          {navLinks.map(({ to, icon, label }) => {
            const isActive = location.pathname === to
            return (
              <Button
                asChild
                key={to}
                variant={isActive ? 'secondary' : 'ghost'}
                className='h-12 w-40 rounded-lg p-0'
              >
                <Link to={to} title={label} className="flex flex-row items-center">
                  {icon}{label}
                </Link>
              </Button>
            )
          })}
        </nav>

        {/* Right - Controls */}
        <div className='flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  )
}

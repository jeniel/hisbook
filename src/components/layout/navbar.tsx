import { JSX } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import {
  IconLayoutDashboard,
  IconUserCog,
  IconUsers,
  IconHome,
  IconBriefcase,
} from '@tabler/icons-react'
import { Query, Role } from '@/graphql/codegen/graphql'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useQuery } from '@apollo/client'
import { Button } from '@/components/ui/button'
import { ProfileDropdown } from '../profile-dropdown'
import { ThemeSwitch } from '../theme-switch'

interface NavLink {
  to: string
  label: string
  icon?: JSX.Element
  roles?: Role[]
}

export default function Navbar() {
  const { location } = useRouterState()
  const { data, loading } = useQuery<Query>(ME_QUERY)

  // Show nothing or a skeleton until user data is loaded
  if (loading || !data?.meQuery?.user) return null
  const roles: Role[] = data.meQuery.user.role || []

  const navLinks: NavLink[] = [
    { to: '/', icon: <IconHome />, label: 'Home' },
    { to: '/tickets', icon: <IconLayoutDashboard />, label: 'Tickets' },
    { to: '/users', icon: <IconUsers />, label: 'Users', roles: [Role.Admin] },
    {
      to: '/departments',
      icon: <IconBriefcase />,
      label: 'Departments',
      roles: [Role.Admin],
    },
    { to: '/profile', icon: <IconUserCog />, label: 'Profile' },
  ]

  // Filter links based on role

  const visibleLinks = navLinks.filter(
    (link) =>
      !link.roles ||
      link.roles.some((allowedRole) => roles.includes(allowedRole))
  )
  return (
    <header className='border-border sticky top-0 z-50 border-b bg-white shadow-sm dark:bg-neutral-900'>
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
        <nav className='mr-28 hidden items-center space-x-4 lg:block'>
          {visibleLinks.map(({ to, icon, label }) => {
            const isActive = location.pathname === to
            return (
              <Button
                asChild
                key={to}
                variant={isActive ? 'secondary' : 'ghost'}
                className='h-12 w-40 rounded-lg p-0'
              >
                <Link
                  to={to}
                  title={label}
                  className='flex flex-row items-center'
                >
                  {icon}
                  {label}
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

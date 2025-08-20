/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from '@tanstack/react-router'
import { Query, Role } from '@/graphql/codegen/graphql'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useQuery } from '@apollo/client'
import { useLogout } from '@/hooks/useLogout'
import useCurrentUser from '@/hooks/useUser'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useEffect, useState } from 'react'
import { useUpload } from '@/hooks/useUpload'

export function ProfileDropdown() {
  const { user } = useCurrentUser()
  const { logout } = useLogout()
  const { data } = useQuery<Query>(ME_QUERY)
  const { getFile } = useUpload()

  const roles = data?.meQuery?.user?.role || []

  const profile = user?.profile
  const [preview, setPreview] = useState<string | null>(null)

  // ✅ Preload avatar image (no flicker)
  useEffect(() => {
    if (profile?.avatar) {
      const fetchAvatar = async () => {
        const filename = profile.avatar.split('/').pop()!
        const url = await getFile('acebook', 'avatar', filename)
        if (url) {
          const img = new Image()
          img.src = url
          img.onload = () => setPreview(url) // ✅ only set after loaded
        }
      }
      fetchAvatar()
    }
  }, [profile?.avatar])

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={preview || '/avatars/01.png'} // 👈 fallback to default
              alt={profile?.firstName || 'User'}
            />
            <AvatarFallback>
              <img src="/images/ace.png" alt="ACE Logo" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-md leading-none font-medium">
              {profile?.firstName && profile?.lastName
                ? `${profile.firstName} ${profile.lastName}`
                : 'Guest User'}
            </p>
            <p className="text-sm">@{user?.username || 'Guest User'}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {user?.email || 'No email provided'}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/tickets">Tickets</Link>
          </DropdownMenuItem>

          {roles.includes(Role.Admin) && (
            <>
              <DropdownMenuItem asChild>
                <Link to="/users">Users</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/departments">Departments</Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

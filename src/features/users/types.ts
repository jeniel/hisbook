import { Profile, Role } from '@/graphql/codegen/graphql'
import {
  IconShield,
  IconUser,
  IconUsersGroup
} from '@tabler/icons-react'

// API User type based on GraphQL schema
export type ApiUser = Profile & {
  userId?: string
  user?: {
    id: string
    email: string
    isActive: boolean
    role?: Array<Role>
    username: string
    tenant?: {
      name: string
    }
  } | null
}

// User status types
export type UserStatus = 'active' | 'inactive' | 'invited' | 'suspended'

// User role types - using the actual database Role enum values
export type UserRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'CLIENT_ADMIN'
  | 'CLIENT_USER'
  | 'AL_USER'
  | 'CLIENT'
  | 'USER'

// Transform API user to match table expectations
export type TransformedUser = {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  phoneNumber: string
  status: UserStatus
  role: UserRole
  createdAt: Date
  updatedAt: Date
  tenantName: string
  userId: string
}

// Status badge colors
export const callTypes = new Map<UserStatus, string>([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
  ['invited', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
  [
    'suspended',
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  ],
])

// User types with icons
export const userTypes = [
  {
    label: 'Super Admin',
    value: 'SUPER_ADMIN' as const,
    icon: IconShield,
  },
  //   {
  //     label: 'Admin',
  //     value: 'ADMIN' as const,
  //     icon: IconUserShield,
  //   },
  {
    label: 'Client Admin',
    value: 'CLIENT_ADMIN' as const,
    icon: IconUsersGroup,
  },
  {
    label: 'Client User',
    value: 'CLIENT_USER' as const,
    icon: IconUser,
  },
  {
    label: 'AL User',
    value: 'AL_USER' as const,
    icon: IconUser,
  },
  //   {
  //     label: 'Client',
  //     value: 'CLIENT' as const,
  //     icon: IconCash,
  //   },
  //   {
  //     label: 'User',
  //     value: 'USER' as const,
  //     icon: IconUser,
  //   },
] as const

// User types with icons
export const userClientTypes = [
  {
    label: 'Client Admin',
    value: 'CLIENT_ADMIN' as const,
    icon: IconUsersGroup,
  },
  {
    label: 'Client User',
    value: 'CLIENT_USER' as const,
    icon: IconUser,
  },
] as const

// Helper function to transform API data to table format
export function transformApiUsersToTableData(
  apiUsers: ApiUser[]
): TransformedUser[] {
  return apiUsers.map((profile) => {
    // Extract phone number from contact JSON field
    let phoneNumber = ''
    if (profile.contact && typeof profile.contact === 'object') {
      const contact = profile.contact as Record<string, unknown>
      phoneNumber = String(
        contact.phone || contact.phoneNumber || contact.mobile || ''
      )
    }

    // Extract role from user.role array and map to valid role types
    let role: UserRole = 'USER'
    if (
      profile.user?.role &&
      Array.isArray(profile.user.role) &&
      profile.user.role.length > 0
    ) {
      // Role is now an enum, so we can use it directly
      role = profile.user.role[0] || 'USER'
    }

    // Map status
    let status: UserStatus = 'inactive'
    if (profile.user?.isActive) {
      status = 'active'
    }

    return {
      id: profile.id,
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      username: profile.user?.username || '',
      email: profile.user?.email || '',
      phoneNumber,
      status,
      role,
      createdAt: new Date(profile.createdAt),
      updatedAt: new Date(profile.updatedAt),
      tenantName: profile.user?.tenant?.name || '',
      userId: profile.userId || '', // Extract userId from profile.userId
    }
  })
}

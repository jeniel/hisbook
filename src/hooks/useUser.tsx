import { useContext, useEffect } from 'react'
import { useRouter } from '@tanstack/react-router'
import { MeQuery, Mutation, Query, User } from '@/graphql/codegen/graphql'
import { LOGOUT } from '@/graphql/operation/mutation/user'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useMutation, useQuery } from '@apollo/client'
import { useStore } from '@tanstack/react-store'
import { userStore } from '@/stores/user'
import { AccountContext } from '@/context/accountContext'

export interface UseCurrentUserReturn {
  // User data
  user: User | null
  profile: User['profile'] | null
  isSignedIn: boolean

  // Loading states
  loading: boolean
  error: Error | null

  // Actions
  logout: () => Promise<void>
  refetchUser: () => Promise<void>

  // Helper computed values
  isAuthenticated: boolean
  fullName: string
  displayName: string
  hasRole: (role: string) => boolean
}

/**
 * Custom hook to manage current user state and authentication
 * Integrates with existing GraphQL authentication system and user store
 */
export const useCurrentUser = (): UseCurrentUserReturn => {
  const router = useRouter()

  // Get user data from account context (set by AuthManager)
  const accountContext = useContext(AccountContext)

  // Subscribe to user store for reactive updates
  const storeState = useStore(userStore)

  // Use the existing ME_QUERY for refetching user data
  const { loading, error, refetch } = useQuery<Query>(ME_QUERY, {
    skip: true, // Skip automatic execution since AuthManager handles this
    errorPolicy: 'all',
  })

  // Logout mutation
  const [logoutMutation, { loading: logoutLoading }] =
    useMutation<Mutation>(LOGOUT)

  // Extract user data from context or store
  const currentUser = accountContext?.user || storeState.user?.user || null
  const isSignedIn =
    accountContext?.isSignedIn || storeState.user?.isSignedIn || false

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      await logoutMutation({
        onCompleted: (resp) => {
          console.log('Logout successful:', resp.logOut.message)

          // Clear user store
          userStore.setState(() => ({
            user: {
              isSignedIn: false,
              user: {} as User,
            } as MeQuery,
          }))

          // Redirect to sign-in page
          router.navigate({ to: '/sign-in' })
        },
        onError: (error) => {
          console.error('Logout failed:', error)
          // Even if logout fails on server, clear local state
          userStore.setState(() => ({
            user: {
              isSignedIn: false,
              user: {} as User,
            } as MeQuery,
          }))
          router.navigate({ to: '/sign-in' })
        },
      })
    } catch (err) {
      console.error('Logout error:', err)
      // Ensure user is logged out locally even if server request fails
      userStore.setState(() => ({
        user: {
          isSignedIn: false,
          user: {} as User,
        } as MeQuery,
      }))
      router.navigate({ to: '/sign-in' })
    }
  }

  // Refetch user data
  const refetchUser = async (): Promise<void> => {
    try {
      await refetch()
      // Also trigger global refetch if available
      if ((window as any).refetchAuth) {
        await (window as any).refetchAuth()
      }
    } catch (err) {
      console.error('Failed to refetch user:', err)
    }
  }

  // Helper computed values
  const fullName = currentUser?.profile
    ? [
        currentUser.profile.firstName,
        currentUser.profile.middleName,
        currentUser.profile.lastName,
      ]
        .filter(Boolean)
        .join(' ')
    : ''

  const displayName =
    fullName || currentUser?.username || currentUser?.email || 'User'

  const hasRole = (role: string): boolean => {
    if (!currentUser?.role || !Array.isArray(currentUser.role)) return false
    return currentUser.role.includes(role as any)
  }

  const isAuthenticated = isSignedIn && !!currentUser

  return {
    // User data
    user: currentUser,
    profile: currentUser?.profile || null,
    isSignedIn,

    // Loading states
    loading: loading || logoutLoading,
    error: error || null,

    // Actions
    logout,
    refetchUser,

    // Helper computed values
    isAuthenticated,
    fullName,
    displayName,
    hasRole,
  }
}

/**
 * Hook that requires user to be authenticated
 * Redirects to sign-in if not authenticated
 */
export const useRequireAuth = (): UseCurrentUserReturn => {
  const currentUser = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (!currentUser.loading && !currentUser.isAuthenticated) {
      router.navigate({ to: '/sign-in' })
    }
  }, [currentUser.loading, currentUser.isAuthenticated, router])

  return currentUser
}

/**
 * Hook for checking authentication status without redirecting
 */
export const useAuth = () => {
  const { isAuthenticated, loading, user } = useCurrentUser()

  return {
    isAuthenticated,
    isLoading: loading,
    user,
  }
}

/**
 * Hook for role-based access control
 */
export const useRole = (requiredRole?: string) => {
  const { hasRole, user, isAuthenticated } = useCurrentUser()

  return {
    hasRole: requiredRole ? hasRole(requiredRole) : undefined,
    hasAnyRole: (roles: string[]) => roles.some((role) => hasRole(role)),
    userRoles: user?.role || [],
    isAuthenticated,
  }
}

// Export the main hook as default
export default useCurrentUser

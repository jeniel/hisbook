/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
  beforeLoad: async ({ context }) => {
    // console.log('beforeLoad authenticated == >', context)
    // If user data is not available or not signed in, redirect to login
    if (!context.user || !context.user.isSignedIn) {
      // If we have a refetch function available, try to refresh auth state
      if (typeof window !== 'undefined' && (window as any).refetchAuth) {
        try {
          const result = await (window as any).refetchAuth()
          if (result?.data?.meQuery?.isSignedIn) {
            return // Continue with the route if authenticated after refetch
          }
        } catch (error) {
          console.warn('Auth refetch failed:', error)
        }
      }

      throw redirect({
        to: '/sign-in',
        search:
          typeof window !== 'undefined' &&
          window.location.pathname !== '/sign-in'
            ? { redirect: window.location.pathname }
            : undefined,
      })
    }
  },
})

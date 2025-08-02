import { createFileRoute, redirect } from '@tanstack/react-router'
import SignIn from '@/features/auth/sign-in'

export const Route = createFileRoute('/(auth)/sign-in')({
  component: SignIn,
  beforeLoad: ({ context }) => {
    // If user is already signed in, redirect to dashboard
    if (context.user?.isSignedIn) {
      throw redirect({
        to: '/',
      })
    }
  },
})

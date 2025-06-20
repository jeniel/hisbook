import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
  beforeLoad: ({ context }) => {
    console.log("beforeLoad authenticated == >", context);
    if (!context.user?.isSignedIn) {
      throw redirect({
        to: '/sign-in',
        search: { redirect: window.location.href },
      });
    }
  },
})

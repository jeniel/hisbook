import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { MeQuery } from '@/graphql/codegen/graphql'
import { Toaster } from '@/components/ui/sonner'
import GeneralError from '@/features/errors/general-error'
import NotFoundError from '@/features/errors/not-found-error'

interface MyRouterContext {
  user: MeQuery | undefined
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    return (
      <>
        <Outlet />
        <Toaster duration={3000} />
      </>
    )
  },
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})

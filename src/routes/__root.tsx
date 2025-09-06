import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { MeQuery } from '@/graphql/codegen/graphql'
import { Toaster } from '@/components/ui/sonner'
import { NavigationProgress } from '@/components/navigation-progress'
import GeneralError from '@/features/errors/general-error'
import NotFoundError from '@/features/errors/not-found-error'

interface MyRouterContext {
  user: MeQuery | undefined
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    return (
      <>
        <NavigationProgress />
        <Outlet />
        {/* Edit the Toaster duration here */}
        <Toaster duration={3000} />
        {/* {import.meta.env.NODE_ENV === 'dev' && (
          <>
            <ReactQueryDevtools buttonPosition='bottom-left' />
            <TanStackRouterDevtools position='bottom-right' />
          </>
        )} */}
      </>
    )
  },
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})

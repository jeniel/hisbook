import { NavigationProgress } from '@/components/navigation-progress'
import { Toaster } from '@/components/ui/sonner'
import GeneralError from '@/features/errors/general-error'
import NotFoundError from '@/features/errors/not-found-error'
import { MeQuery } from '@/graphql/codegen/graphql'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

interface MyRouterContext {
  user: MeQuery | undefined
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    // console.log(import.meta.env.VITE_NODE_ENV)
    return (
      <>
        <NavigationProgress />
        <Outlet />
        <Toaster duration={50000} />
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

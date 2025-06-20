import { createRouter, RouterProvider } from '@tanstack/react-router'
import { ApolloProvider } from '@apollo/client'
import { useStore } from '@tanstack/react-store'
import AuthManager from './context/authManager'
import { FontProvider } from './context/font-context'
import { ThemeProvider } from './context/theme-context'
import { client } from './lib/gql-client'
import { routeTree } from './routeTree.gen'
import { userStore } from './stores/user'

declare module '@tanstack/react-router' {
  interface Register {
    //authentication: ReturnType<typeof useAuth>;
    router: typeof router
  }
}
const router = createRouter({
  routeTree,
  context: {
    user: undefined!,
  },
})

const App = () => {
  const user = useStore(userStore)
  return (
    <>
      <ApolloProvider client={client}>
        <AuthManager>
          <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
            <FontProvider>
              <RouterProvider router={router} context={user} />
            </FontProvider>
          </ThemeProvider>
        </AuthManager>
      </ApolloProvider>
    </>
  )
}

export default App

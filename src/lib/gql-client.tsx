import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

const httpLink = createHttpLink({
  uri: 'http://acebook-backend.172.16.10.70.nip.io/graphql', // hardcoded
  credentials: 'include', // Include cookies in requests
  headers: {
    'Content-Type': 'application/json',
  },
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  return {
    headers: {
      ...headers,
    },
  }
})

const defaultOptions: any = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
}

const errorControl = onError(({ graphQLErrors, networkError }) => {
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      // console.log(
      //   `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      // )
      switch (message) {
        case 'Unauthorized':
          // alert("Your sesssion has expired. You will be forced to logout");
          break
        case 'Token not found':
          // alert("Your sesssion has expired. You will be forced to logout");
          break
        case 'Forbidden resource':
          window.location.href = '/403'
          break
        default:
          break
      }
    })
  }
})

export const client = new ApolloClient({
  link: errorControl.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
  queryDeduplication: false,
})

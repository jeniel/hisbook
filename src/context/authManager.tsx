import React from 'react'
import { useQuery } from '@apollo/client'
import _ from 'lodash'
import { userStore } from '@/stores/user'
import NotFoundError from '@/features/errors/not-found-error'
import { MeQuery, Query } from '../graphql/codegen/graphql'
import { ME_QUERY } from '../graphql/operation/query/user'
import { AccountConsumer, AccountProvider } from './accountContext'
import Spinner from '@/components/spinner'

// import { ModalProvider } from "react-modal-hook";

const AuthManager = (props: any) => {
  const { loading, error, data, refetch } = useQuery<Query>(ME_QUERY, {
    fetchPolicy: 'cache-and-network', // Always fetch from network first
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (!_.isEmpty(data?.meQuery)) {
        userStore.setState((state) => {
          return {
            ...state,
            user: data.meQuery,
          }
        })
      } else {
        userStore.setState((state) => {
          return {
            ...state,
            user: {} as MeQuery,
          }
        })
      }
    },
    onError: () => {
      // console.warn('fire error on context', error)
      userStore.setState((state) => {
        return {
          ...state,
          user: {
            isSignedIn: false,
            user: {} as any,
          } as MeQuery,
        }
      })
    },
  })

  // Add refetch function to global scope for re-authentication
  React.useEffect(() => {
    (window as any).refetchAuth = refetch
  }, [refetch])

  // const blank = "loading...";

  if (error) {
    const err: any = error.networkError
    if (err && err.statusCode === 403) {
      return <NotFoundError />
    }
    if (err && err.statusCode === 401) {
      window.location.href = '/'
    }
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <AccountProvider value={data?.meQuery ?? ({} as MeQuery)}>
      <AccountConsumer>
        {(value) => {
          const childrenWithProps = React.Children.map(
            props.children,
            (child) =>
              React.cloneElement(child, {
                account: value,
              })
          )
          return childrenWithProps
        }}
      </AccountConsumer>
    </AccountProvider>
  )
}

export default AuthManager

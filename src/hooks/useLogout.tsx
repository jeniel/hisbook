import { Mutation } from '@/graphql/codegen/graphql'
import { LOGOUT } from '@/graphql/operation/mutation/user'
import { useMutation } from '@apollo/client'

export const useLogout = () => {
  const [logoutMutation, { data, loading, error }] =
    useMutation<Mutation>(LOGOUT)

  const logout = async () => {
    logoutMutation({
      onCompleted: () => { // add resp for arguments
        // console.log('Logout successful:', resp.logOut.message)
        // Force full page reload to sign-in page
        window.location.href = '/sign-in'
      },
    })
  }

  return {
    message: data?.logOut.message,
    logout,
    loading,
    error,
  }
}

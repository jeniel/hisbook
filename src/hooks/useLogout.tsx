import { useRouter } from '@tanstack/react-router'
import { Mutation } from '@/graphql/codegen/graphql'
import { LOGOUT } from '@/graphql/operation/mutation/user'
import { useMutation } from '@apollo/client'

export const useLogout = () => {
  const router = useRouter()
  const [logoutMutation, { data, loading, error }] =
    useMutation<Mutation>(LOGOUT)

  const logout = async () => {
    logoutMutation({
      onCompleted: (resp) => {
        console.log('Logout successful:', resp.logOut.message)

        // Redirect to signin page after successful logout
        router.navigate({ to: '/sign-in' })
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

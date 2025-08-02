import { gql } from '@apollo/client'

export const SIGN_IN = gql`
  # mutation Mutation($signInInput: SignInInput!) {
  #   signin(signInInput: $signInInput) {
  #     accessToken
  #   }
  # }
  mutation Mutation($signInInput: SignInInput!) {
    signin(signInInput: $signInInput) {
      user {
        id
        role
        profile {
          id
          firstName
          middleName
          lastName
        }
      }
      isSignedIn
    }
  }
`
export const LOGOUT = gql`
  mutation LogOut {
    logOut {
      message
    }
  }
`
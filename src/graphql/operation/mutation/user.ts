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

export const CREATE_USER = gql`
  mutation CreateUser($payload: CreateUserInput!) {
    createUser(payload: $payload) {
      message
    }
  }
`;

export const UPDATE_USER = gql `
  mutation UpdateUser($updateUserId: String!, $payload: UpdateUserInput!) {
    updateUser(id: $updateUserId, payload: $payload) {
      message
    }
  }
`

export const DELETE_USER = gql `
  mutation DeleteUser($deleteUserId: String!) {
    deleteUser(id: $deleteUserId) {
      message
    }
  }
`
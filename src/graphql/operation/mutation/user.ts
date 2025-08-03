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

export const CREATE_AL_USER = gql`
  mutation Mutation($createUserInput: CreateUserProfileInput!) {
    createSuperAdmin(createUserInput: $createUserInput) {
      message
      success
    }
  }
`

export const INVITE_USER = gql`
  mutation Mutation($inviteUserInput: InviteUserInput!) {
    inviteUser(inviteUserInput: $inviteUserInput) {
      invitationLink
      invitationToken
      message
    }
  }
`

// export const FIND_ALL_USERS = gql`
//   query FindAllUsers {
//     findAllUsers {
//       meta {
//         currentPage
//         lastPage
//         next
//         perPage
//         prev
//         total
//       }
//       data {
//         id
//         lastName
//         middleName
//         firstName
//         contact
//         user {
//           email
//           isActive
//           role
//         }
//       }
//     }
//   }
// `

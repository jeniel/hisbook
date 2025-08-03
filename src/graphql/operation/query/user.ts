import { gql } from '@apollo/client'

export const FIND_ALL_USER = gql`
  query FindAllUsers($page: Int, $perPage: Int, $where: ProfileWhereInput) {
    findAllUsers(page: $page, perPage: $perPage, where: $where) {
      data {
        id
        userId
        firstName
        lastName
        middleName
        user {
          id
          email
          username
          role
          isActive
          isApprove
          username
          tenantId
          tenant {
            id
            name
          }
        }
      }
      meta {
        currentPage
        lastPage
        next
        perPage
        prev
        total
      }
    }
  }
`

export const ME_QUERY = gql`
  query MeQuery {
    meQuery {
      isSignedIn
      user {
        id
        role
        email
        profile {
          id
          firstName
          middleName
          lastName
          departmentId
          department {
            id
            name
          }
        }
      }
    }
  }
`

export const FIND_USER_BY_ID = gql`
  query Query($profileId: String!) {
    findOneUser(profileId: $profileId) {
      id
      firstName
      middleName
      lastName
      birthDate
      address
      department {
        id
        name
      }
      user {
        id
        username
        email
        isActive
        isApprove
      }
    }
  }
`

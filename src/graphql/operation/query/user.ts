import { gql } from '@apollo/client'

export const FIND_ALL_USER = gql`
  query FindAllUsers($page: Int, $perPage: Int) {
      findAllUsers(perPage: $perPage, page: $page) {
        data {
        email
        id
        role
        username
        department {
          name
          id
        }
        profile {
          firstName
          lastName
          middleName
          address
          birthDate
          contact
          employeeID
          gender
          title
          id
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
        }
      }
    }
  }
`
import { gql } from '@apollo/client'

export const FIND_ALL_USER = gql`
  query FindAllUsers($page: Int, $perPage: Int) {
      findAllUsers(perPage: $perPage, page: $page) {
        data {
        email
        id
        role
        username
        createdAt
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
      user {
        id
        departmentId
        email
        username
        createdAt
        department {
          name
          id
          description
        }
        profile {
          address
          birthDate
          contact
          createdAt
          employeeID
          firstName
          gender
          id
          lastName
          middleName
          title
          avatar
        }
        role
      }
      isSignedIn
    }
  }
`
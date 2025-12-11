import { gql } from '@apollo/client'

export const FIND_ALL_USER = gql`
  query FindAllUsers($page: Int, $perPage: Int, $search: String) {
    findAllUsers(page: $page, perPage: $perPage, search: $search) {
      data {
        id
        email
        username
        role
        createdAt
        deletedAt
        department {
          id
          name
        }
        profile {
          id
          firstName
          lastName
          middleName
          address
          birthDate
          contact
          secondaryContact
          email
          employeeID
          gender
          title
        }
      }
      meta {
        total
        currentPage
        lastPage
        perPage
        prev
        next
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
          secondaryContact
          email
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

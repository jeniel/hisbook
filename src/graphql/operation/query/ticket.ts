import { gql } from '@apollo/client'

export const FIND_ALL_MISSED_LOGOUT_TICKETS = gql`
  query Query($page: Int, $perPage: Int) {
    findAllMissedLogoutTickets(page: $page, perPage: $perPage) {
      data {
        createdAt
        createdBy {
          username
          profile {
            lastName
            middleName
            firstName
          }
        }
        createdById
        floor
        subject
        remarks
        id
        missedAt
        screenshot
        status
        updatedBy
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

export const FIND_ALL_MISSED_LOGOUT_TICKETS_BY_USER = gql`
  query FindTicketsByUser($userId: String!, $perPage: Int, $page: Int) {
    findTicketsByUser(userId: $userId, perPage: $perPage, page: $page) {
      data {
        createdAt
        createdBy {
          username
          profile {
            lastName
            middleName
            firstName
          }
        }
        floor
        id
        subject
        remarks
        missedAt
        screenshot
        status
        updatedBy
        createdById
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

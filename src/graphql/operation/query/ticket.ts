import { gql } from '@apollo/client';

export const FIND_ALL_MISSED_LOGOUT_TICKETS = gql`
  query FindAllMissedLogoutTickets {
  findAllMissedLogoutTickets {
    data {
      createdAt
      createdBy {
        username
      }
      createdById
      floor
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
`;

export const FIND_ALL_MISSED_LOGOUT_TICKETS_BY_USER = gql`
  query FindTicketsByUser($userId: String!) {
    findTicketsByUser(userId: $userId) {
      data {
        createdAt
        createdBy {
          username
        }
        floor
        id
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
`;
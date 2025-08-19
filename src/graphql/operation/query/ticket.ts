import { gql } from '@apollo/client';

export const FIND_ALL_MISSED_LOGOUT_TICKETS = gql`
  query FindAllMissedLogoutTickets {
  findAllMissedLogoutTickets {
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
`;

export const FIND_ALL_MISSED_LOGOUT_TICKETS_BY_USER = gql`
  query FindTicketsByUser($userId: String!) {
    findTicketsByUser(userId: $userId) {
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
`;
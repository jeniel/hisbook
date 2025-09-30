import { gql } from '@apollo/client'

export const FIND_ALL_TICKETS = gql`
  query FindAllTickets(
    $where: TicketWhereInput
    $page: Int
    $perPage: Int
    $search: String
  ) {
    findAllTickets(
      where: $where
      page: $page
      perPage: $perPage
      search: $search
    ) {
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
        departmentId
        department {
          name
          id
        }
        floor
        subject
        remarks
        message
        id
        missedAt
        screenshot
        statusFormatted
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

export const FIND_ALL_TICKETS_BY_USER = gql`
  query FindTicketsByUser(
    $userId: String!
    $perPage: Int
    $page: Int
    $search: String
  ) {
    findTicketsByUser(
      userId: $userId
      perPage: $perPage
      page: $page
      search: $search
    ) {
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
        statusFormatted
        remarks
        message
        missedAt
        screenshot
        status
        updatedBy
        createdById
        departmentId
        department {
          name
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

export const FIND_TICKET_AUDIT_LOGS = gql`
  query FindTicketLogs($findTicketbyIdId: String!) {
    findTicketbyID(id: $findTicketbyIdId) {
      auditLogs {
        action
        ticketId
        timestamp
        updatedBy
        remarks
        id
      }
    }
  }
`

export const FIND_TICKETS_WORKED_BY_USER = gql`
  query FindTicketsWorkedByUser($userId: String!, $search: String) {
    findTicketsWorkedByUser(userId: $userId, search: $search) {
      data {
        subject
        status
        statusFormatted
        missedAt
        remarks
        message
        screenshot
        updatedBy
        id
        floor
        createdById
        createdAt
        createdBy {
          username
          profile {
            firstName
            lastName
          }
        }
      }
    }
  }
`

export const FIND_TICKETS_BY_DEPARTMENT = gql`
  query FindTicketsByDepartment($page: Int, $perPage: Int, $search: String) {
    findTicketsByDepartment(page: $page, perPage: $perPage, search: $search) {
      meta {
        currentPage
        lastPage
        next
        perPage
        prev
        total
      }
      data {
        id
        subject
        message
        status
        statusFormatted
        createdAt
        updatedAt
        missedAt
        remarks
        screenshot
        floor
        createdBy {
          username
          profile {
            firstName
            middleName
            lastName
          }
        }
        createdById
        updatedBy
        departmentId
        department {
          id
          name
          description
        }
      }
    }
  }
`

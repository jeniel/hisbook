import { gql } from '@apollo/client'

export const CENSUS_DATA = gql`
  query GetCensusSummary {
    getCensusSummary {
      departmentsWithUserCount {
        departmentId
        departmentName
        userCount
        departmentDescription
      }
      ticketsByStatus {
        count
        status
      }
      totalEvents
      totalDepartments
      totalTickets
      totalUsers
      totalPosts
    }
  }
`

export const CENSUS_TICKET_DATA = gql`
  query GetTicketData($userId: String!) {
    getCensusSummary(userId: $userId) {
      ticketByUserId {
        status
        count
      }
      totalTicketsByUserId
    }
  }
`

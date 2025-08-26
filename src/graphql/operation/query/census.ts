import { gql } from '@apollo/client'

export const CENSUS_DATA = gql`
  query {
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
      totalDepartments
      totalTickets
      totalUsers
      totalPosts
    }
  }
`

export const CENSUS_TICKET_DATA = gql`
  query GetCensusSummary($userId: String!) {
    getCensusSummary(userId: $userId) {
      ticketByUserId {
        status
        count
      }
      totalTicketsByUserId
    }
  }
`

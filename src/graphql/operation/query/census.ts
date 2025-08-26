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

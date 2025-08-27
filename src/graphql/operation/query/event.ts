import { gql } from '@apollo/client'

export const GET_ALL_EVENT = gql`
  query Query($page: Int, $perPage: Int) {
    findAllEvents(page: $page, perPage: $perPage) {
      data {
        createdAt
        detailsUrl
        endDate
        id
        location
        startDate
        title
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

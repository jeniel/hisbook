import { gql } from '@apollo/client'

export const GET_ALL_EVENT = gql`
  query FindAllEvents($search: String, $page: Int, $perPage: Int) {
    findAllEvents(search: $search, page: $page, perPage: $perPage) {
      data {
        id
        title
        location
        startDate
        endDate
        detailsUrl
        createdAt
      }
      meta {
        total
        currentPage
        lastPage
        prev
        next
        perPage
      }
    }
  }
`

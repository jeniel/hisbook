import { gql } from '@apollo/client'

export const FIND_ALL_DEPARTMENTS = gql`
  query Query($page: Int, $perPage: Int) {
    findAllDepartments(page: $page, perPage: $perPage) {
      data {
        description
        id
        name
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

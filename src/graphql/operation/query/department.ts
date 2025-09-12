import { gql } from '@apollo/client'

export const FIND_ALL_DEPARTMENTS = gql`
  query FindAllDepartments($page: Int, $perPage: Int) {
    findAllDepartments(page: $page, perPage: $perPage) {
      data {
        description
        id
        name
        createdAt
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

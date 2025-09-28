import { gql } from '@apollo/client'

export const FIND_ALL_DEPARTMENTS = gql`
  query FindAllDepartments($search: String, $page: Int, $perPage: Int) {
    findAllDepartments(search: $search, page: $page, perPage: $perPage) {
      data {
        id
        name
        description
        isSupport
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

export const FIND_ALL_DEPARTMENTS_IN_DROPDOWN = gql`
  query FindAllDepartmentsDropdown {
    findAllForDropdown {
      id
      name
      description
      isSupport
    }
  }
`

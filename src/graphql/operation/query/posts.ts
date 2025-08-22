import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  query FindAllPosts($page: Int, $perPage: Int) {
    findAllPosts(page: $page, perPage: $perPage) {
      data {
        datePosted
        content
        id
        images
        user {
          id
          profile {
            lastName
            firstName
            avatar
          }
          department {
            name
            description
          }
          username
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

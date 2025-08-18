import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  query FindAllPosts {
    findAllPosts {
      data {
        datePosted
        content
        id
        user {
          id
          profile {
            lastName
            firstName
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

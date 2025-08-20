import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  query FindAllPosts {
    findAllPosts {
      data {
        datePosted
        content
        id
        images {
          id
          url
        }
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

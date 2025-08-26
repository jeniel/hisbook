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
export const GET_POST_BY_USER = gql`
  query ($userId: String!, $page: Float, $perPage: Float) {
    findAllPostsCreatedByUser(userId: $userId, page: $page, perPage: $perPage) {
      data {
        content
        user {
          profile {
            firstName
            lastName
            avatar
          }
          id
          department {
            name
            description
          }
          username
        }
        datePosted
        id
        images
        userId
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

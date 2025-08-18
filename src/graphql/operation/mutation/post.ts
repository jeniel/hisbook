import { gql } from '@apollo/client'

export const CREATE_POST = gql`
  mutation Mutation($payload: CreatePostInput!) {
    createPost(payload: $payload) {
      message
    }
  }
`

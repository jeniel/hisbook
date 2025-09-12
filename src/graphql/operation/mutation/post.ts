import { gql } from '@apollo/client'

export const CREATE_POST = gql`
  mutation CreatePost($payload: CreatePostInput!) {
    createPost(payload: $payload) {
      message
    }
  }
`

export const UPDATE_POST = gql`
  mutation UpdatePost($data: UpdatePostInput!, $postId: String!) {
    updatePost(data: $data, postId: $postId) {
      message
    }
  }
`

export const DELETE_POST = gql`
  mutation DeletePost($postId: String!) {
    deletePost(postId: $postId) {
      message
    }
  }
`

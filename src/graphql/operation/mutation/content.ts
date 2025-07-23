import { gql } from '@apollo/client'

export const ADD_CONTENT = gql`
  mutation CreateEmbeddings($content: String!, $tenantId: String!) {
    createEmbeddings(content: $content, tenantId: $tenantId) {
      message
    }
  }
`

export const UPDATE_CONTENT = gql`
  mutation UpdateEmbeddings(
    $content: String!
    $updateEmbeddingsId: Float!
    $tenantId: String!
  ) {
    updateEmbeddings(
      content: $content
      id: $updateEmbeddingsId
      tenantId: $tenantId
    ) {
      message
    }
  }
`
export const DELETE_CONTENT = gql`
  mutation DeleteEmbedding($deleteEmbeddingId: Int!, $tenantId: String!) {
    deleteEmbedding(id: $deleteEmbeddingId, tenantId: $tenantId) {
      message
    }
  }
`


//new implementation using qdrant

export const UPSERT_DOCUMENT = gql`
  mutation ProcessAndStoreDocuments($input: ProcessDocumentsInput!) {
    processAndStoreDocuments(input: $input)
  }
`

export const DELETE_DOCUMENT = gql`
  mutation DeleteQdrantPoints($collectionName: String!, $ids: [ID!]!) {
    deleteQdrantPoints(collectionName: $collectionName, ids: $ids)
  }
`

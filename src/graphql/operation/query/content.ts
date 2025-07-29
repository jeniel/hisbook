import { gql } from '@apollo/client'

export const FIND_CONTENT = gql`
  query FindContent($tenantId: String!, $page: Int!, $limit: Int = 10) {
    findContent(tenantId: $tenantId, page: $page, limit: $limit) {
      message
      pagination {
        limit
        hasNextPage
        hasPrevPage
        currentPage
        totalCount
        totalPages
      }
      content {
        id
        content
      }
    }
  }
`

export const FIND_DOCUMENTS = gql`
  query QdrantScrollPoints($input: ScrollPointsInput!) {
    qdrantScrollPoints(input: $input) {
      next_page_offset
      points {
        id
        payload
      }
    }
  }
`


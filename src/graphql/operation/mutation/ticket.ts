import { gql } from '@apollo/client'

export const CREATE_TICKET = gql`
  mutation Mutation($payload: CreateTicketInput!) {
    createTicket(payload: $payload) {
      message
    }
  }
`

export const EDIT_TICKET = gql`
  mutation UpdateTicket(
    $updateTicketId: String!
    $payload: UpdateTicketInput!
  ) {
    updateTicket(id: $updateTicketId, payload: $payload) {
      message
    }
  }
`

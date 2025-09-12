import { gql } from '@apollo/client'

export const CREATE_TICKET = gql`
  mutation CreateTicket($payload: CreateTicketInput!) {
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

export const DELETE_TICKET = gql`
  mutation DeleteTicket($deleteTicketId: String!) {
    deleteTicket(id: $deleteTicketId) {
      message
    }
  }
`

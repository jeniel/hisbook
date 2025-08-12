import { gql } from '@apollo/client';

export const CREATE_TICKET = gql`
  mutation CreateMissedLogoutTicket($payload: CreateMissedLogoutTicketInput!) {
    createMissedLogoutTicket(payload: $payload) {
      id
      floor
      missedAt
      status
    }
    message
  }
`;
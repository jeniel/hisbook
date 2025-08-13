import { gql } from '@apollo/client';

export const CREATE_TICKET = gql`
  mutation CreateMissedLogoutTicket($payload: CreateMissedLogoutTicketInput!) {
    createMissedLogoutTicket(payload: $payload) {
      message
    }
  }
`;

export const EDIT_TICKET = gql`
  mutation UpdateMissedLogoutTicket($updateMissedLogoutTicketId: String!, $payload: UpdateMissedLogoutTicketInput!) {
    updateMissedLogoutTicket(id: $updateMissedLogoutTicketId, payload: $payload) {
      message
    }
  }
`;
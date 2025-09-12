import { gql } from '@apollo/client'

export const CREATE_EVENT = gql`
  mutation CreateEvent($payload: CreateEventInput!) {
    createEvent(payload: $payload) {
      message
    }
  }
`

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($updateEventId: String!, $payload: UpdateEventInput!) {
    updateEvent(id: $updateEventId, payload: $payload) {
      message
    }
  }
`
export const DELETE_EVENT = gql`
  mutation DeleteEvent($deleteEventId: String!) {
    deleteEvent(id: $deleteEventId) {
      message
    }
  }
`

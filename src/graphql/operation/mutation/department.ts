import { gql } from '@apollo/client'

export const CREATE_DEPARTMENT = gql`
  mutation CreateDepartment($payload: CreateDepartmentInput!) {
    createDepartment(payload: $payload) {
      message
    }
  }
`
export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($updateDepartmentId: String!, $payload: UpdateDepartmentInput!) {
    updateDepartment(id: $updateDepartmentId, payload: $payload) {
      message
    }
  }
`;

export const DELETE_DEPARTMENT = gql `
    mutation DeleteDepartment($deleteDepartmentId: String!) {
        deleteDepartment(id: $deleteDepartmentId) {
            message
        }
    }
`
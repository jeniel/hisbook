import { gql } from '@apollo/client'

export const CREATE_TENANT = gql`
  mutation CreateTenant($createTenant: CreateTenant!) {
    createTenant(createTenant: $createTenant) {
      message
    }
  }
`

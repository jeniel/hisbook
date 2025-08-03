import { gql } from '@apollo/client'

export const FIND_ALL_TENANTS = gql`
  query Query {
    findAllTenants {
      id
      isActive
      name
      slug
      chatTableName
      documentTableName
    }
  }
`

export const FIND_TENANT_BY_ID = gql`
  query FindTenantById($tenantId: String!) {
    findTenantById(tenantId: $tenantId) {
      id
      name
      slug
      chatTableName
      collectionName
    }
  }
`

export const FIND_ALL_TENANTS_OPTIONS = gql`
  query FindAllTenants {
    findAllTenants {
      id
      name
    }
  }
`

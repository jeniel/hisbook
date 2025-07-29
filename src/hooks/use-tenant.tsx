import { useContext } from 'react'
import { useStore } from '@tanstack/react-store'
import { useQuery } from '@apollo/client'
import { AccountContext } from '@/context/accountContext'
import { userStore } from '@/stores/user'
import { FIND_TENANT_BY_ID } from '@/graphql/operation/query/tenant'
import { Query } from '@/graphql/codegen/graphql'

/**
 * Hook to get the current tenant ID based on the logged-in user
 * @returns {string | null} The current tenant ID or null if not available
 */
export const useTenantId = (): string | null => {
  // Get user data from the store
  const userState = useStore(userStore, (state) => state.user)
  
  // Fallback to context if store is not available
  const accountContext = useContext(AccountContext)
  
  // Get tenant ID from store first, then fallback to context
  const tenantId = userState?.user?.tenantId || accountContext?.user?.tenantId
  
  return tenantId || null
}

/**
 * Hook to get the current tenant name based on the logged-in user
 * @returns {string | null} The current tenant name or null if not available
 */
export const useTenantName = (): string | null => {
  // Get user data from the store
  const userState = useStore(userStore, (state) => state.user)
  
  // Fallback to context if store is not available
  const accountContext = useContext(AccountContext)
  
  // Get tenant name from store first, then fallback to context
  const tenantName = userState?.user?.tenant?.name || accountContext?.user?.tenant?.name
  
  return tenantName || null
}

/**
 * Hook to get the current tenant info (id, name, collectionName, and chatTableName) based on the logged-in user
 * @returns {object} The current tenant info or null values if not available
 */
export const useTenantInfo = (): { id: string | null; name: string | null; collectionName: string | null; chatTableName: string | null } => {
  // Get user data from the store
  const userState = useStore(userStore, (state) => state.user)
  
  // Fallback to context if store is not available
  const accountContext = useContext(AccountContext)
  
  // Get tenant info from store first, then fallback to context
  const tenant = userState?.user?.tenant || accountContext?.user?.tenant
  
  return {
    id: tenant?.id || userState?.user?.tenantId || accountContext?.user?.tenantId || null,
    name: tenant?.name || null,
    collectionName: tenant?.collectionName || null,
    chatTableName: tenant?.chatTableName || null,
  }
}

/**
 * Hook to get the current user data including tenant information
 * @returns {object} User data with tenant information
 */
export const useCurrentUser = () => {
  // Get user data from the store
  const userState = useStore(userStore, (state) => state.user)
  
  // Fallback to context if store is not available
  const accountContext = useContext(AccountContext)
  
  // Return store data first, then fallback to context
  const userData = userState?.user || accountContext?.user
  const isSignedIn = userState?.isSignedIn || accountContext?.isSignedIn || false
  const tenant = userData?.tenant
  
  return {
    user: userData,
    isSignedIn,
    tenantId: userData?.tenantId || null,
    tenantName: tenant?.name || null,
    tenant: tenant || null,
    isLoading: !userData || Object.keys(userData).length === 0,
  }
}

/**
 * Hook to check if user belongs to a specific tenant
 * @param {string} targetTenantId - The tenant ID to check against
 * @returns {boolean} True if user belongs to the specified tenant
 */
export const useIsTenantUser = (targetTenantId: string): boolean => {
  const currentTenantId = useTenantId()
  return currentTenantId === targetTenantId
}

/**
 * Hook that provides tenant-related utilities
 * @returns {object} Tenant utilities and data
 */
export const useTenant = () => {
  const { user, isSignedIn, tenantId, tenantName, tenant, isLoading } = useCurrentUser()
  
  return {
    tenantId,
    tenantName,
    tenant,
    user,
    isSignedIn,
    isLoading,
    hasTenant: !!tenantId,
    isUserInTenant: (targetTenantId: string) => tenantId === targetTenantId,
    isUserInTenantByName: (targetTenantName: string) => tenantName === targetTenantName,
  }
}

/**
 * Hook to fetch tenant data by ID using GraphQL
 * @param {string} tenantId - The tenant ID to fetch data for
 * @returns {object} Tenant data, loading state, and error
 */
export const useTenantById = (tenantId: string) => {
  const { data: tenantData, loading: tenantLoading, error } = useQuery<Query>(
    FIND_TENANT_BY_ID,
    {
      variables: {
        tenantId,
      },
      skip: !tenantId, // Skip query if no tenantId provided
    }
  )

  return {
    tenantData,
    tenantLoading,
    error,
    tenant: tenantData?.findTenantById, // Assuming this is the structure
  }
}

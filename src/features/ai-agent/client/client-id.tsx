import React from 'react'
import { useParams } from '@tanstack/react-router'
import { Query } from '@/graphql/codegen/graphql'
import { FIND_TENANT_BY_ID } from '@/graphql/operation/query/tenant'
import { useQuery } from '@apollo/client'

const ClientIdPage = () => {
  const params = useParams({ strict: false })
  console.log('ClientIdPage params:', params.id)

  const { data, loading, error } = useQuery<Query>(FIND_TENANT_BY_ID, {
    variables: { tenantId: params.id },
    skip: !params.id, // Skip the query if id is not provided
  })

  console.log('ClientIdPage data:', data?.findTenantById)

  return (
    <>
      <div className='rounded-lg bg-white p-6 shadow'>
        <h1 className='mb-4 text-3xl font-extrabold text-gray-800'>
          TENANT DETAILS
        </h1>
        {data && data.findTenantById ? (
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold text-gray-700'>
              {data.findTenantById.name}
            </h2>
            <p className='text-gray-600'>
              <span className='font-medium'>Slug:</span>{' '}
              {data.findTenantById.slug}
            </p>
            <p className='text-gray-600'>
              <span className='font-medium'>Chat Table:</span>{' '}
              {data.findTenantById.chatTableName}
            </p>
            <p className='text-gray-600'>
              <span className='font-medium'>Document Table:</span>{' '}
              {data.findTenantById.documentTableName}
            </p>
          </div>
        ) : (
          <p className='text-gray-500'>No tenant found.</p>
        )}
      </div>
    </>
  )
}

export default ClientIdPage

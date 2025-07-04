import React from 'react'
import { useParams } from '@tanstack/react-router'
import { IconUserPlus } from '@tabler/icons-react'
import { Query } from '@/graphql/codegen/graphql'
import { FIND_TENANT_BY_ID } from '@/graphql/operation/query/tenant'
import { useQuery } from '@apollo/client'
import { InfoIcon, Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import InfiniteScroll from '@/components/ui/infinite-scroll'
import { Main } from '@/components/layout/main'

const ClientIdPage = () => {
  const params = useParams({ strict: false })
  console.log('ClientIdPage params:', params.id)

  const { data, error } = useQuery<Query>(FIND_TENANT_BY_ID, {
    variables: { tenantId: params.id },
    skip: !params.id, // Skip the query if id is not provided
  })

  console.log('ClientIdPage data:', data?.findTenantById)
  const tenant = data?.findTenantById

  return (
    <>
      <Main>
        <Alert className='border-cyan-600/50 text-cyan-600 dark:border-cyan-600 [&>svg]:text-cyan-600'>
          <InfoIcon className='h-4 w-4' />
          <AlertTitle>{tenant?.name}</AlertTitle>
          <AlertDescription>
            {/* <p className='text-sm'>
              Client ID: <span className='font-semibold'>{tenant?.chatTableName}</span>
            </p>
            <p className='text-sm'>
              Tenant ID: <span className='font-semibold'>{tenant?.id}</span>
            </p>
            <p className='text-sm'>
              Created At: <span className='font-semibold'>{new Date(tenant?.createdAt).toLocaleString()}</span>
            </p> */}
          </AlertDescription>
        </Alert>

        <div className='mt-4 w-full overflow-y-auto px-10'>
          <div className='mb-3 flex gap-2'>
            <Button className='space-x-1'>
              <span>Add Content</span> <IconUserPlus size={18} />
            </Button>
          </div>
            <div className='items-left flex w-full flex-row gap-3'>
              
            <div className='flex w-200 flex-col gap-2 rounded-lg border-2 border-gray-200 p-2'>
              <div className='flex gap-2'>
                <div className='flex flex-col justify-center gap-1'>
                  <div className='text-primary font-bold'>xfasdasdax</div>
                  <div className='text-muted-foreground text-sm'>"123"</div>
                </div>
              </div>
            </div>

            <div className='flex w-200 flex-col gap-2 rounded-lg border-2 border-gray-200 p-2'>
              <div className='flex gap-2'>
                <div className='flex flex-col justify-center gap-1'>
                  <div className='text-primary font-bold'>xfasdasdax</div>
                  <div className='text-muted-foreground text-sm'>"123"</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Main>
    </>
  )
}

export default ClientIdPage

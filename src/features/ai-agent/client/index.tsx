import { Separator } from '@radix-ui/react-separator'
import { useNavigate } from '@tanstack/react-router'
import { Query } from '@/graphql/codegen/graphql'
import { CREATE_TENANT } from '@/graphql/operation/mutation/tenant'
import { FIND_ALL_TENANTS } from '@/graphql/operation/query/tenant'
import { useMutation, useQuery } from '@apollo/client'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Main } from '@/components/layout/main'

const ClientPage = () => {
  const { data } = useQuery<Query>(FIND_ALL_TENANTS)
  const clientList = data?.findAllTenants
  const navigate = useNavigate()

  const [createTenant] = useMutation(CREATE_TENANT)

  const handleAddClient = () => {
    //createTenant({
    //   variables: {
    //     createTenant: {
    //       chatTableName: 'becker_chat_demo',
    //       collectionName: 'becker_collection_demo',
    //       distance: 'Cosine',
    //       name: 'BECKER',
    //       size: 1536,
    //       slug: 'becker',
    //     },
    //   },
    // })
  }

  return (
    <>
      <Main fixed>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>
              A.I Agent Client Integrations
            </h1>
            <p className='text-muted-foreground'>Client List</p>
          </div>
          <Button onClick={handleAddClient} className='flex items-center gap-2'>
            <Plus className='h-4 w-4' />
            Add Client
          </Button>
        </div>
        <Separator className='shadow-sm' />
        <ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pt-4 pb-16 md:grid-cols-2 lg:grid-cols-3'>
          {clientList?.map((tenant) => (
            <li
              key={tenant.id}
              className='cursor-pointer rounded-lg border p-4 hover:shadow-md'
              onClick={() => {
                // Navigate to tenant details page
                navigate({
                  to: `/ai-agent/client/${tenant.id}`,
                })
              }}
            >
              <div className='mb-8 flex items-center justify-between'>
                <div
                  className={`bg-muted flex size-10 items-center justify-center rounded-lg p-2`}
                >
                  {/* {tenant.logo} */}
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  className={`${tenant.isActive ? 'border border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900' : ''}`}
                >
                  {tenant.isActive ? 'Active' : 'Not Active'}
                </Button>
              </div>
              <div>
                <h2 className='mb-1 font-semibold'>{tenant.name}</h2>
                <p className='line-clamp-2 text-gray-500'>
                  {tenant.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Main>
    </>
  )
}

export default ClientPage

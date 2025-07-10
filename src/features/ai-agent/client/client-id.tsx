import { Main } from '@/components/layout/main'
import Spinner from '@/components/spinner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Pagination, Query } from '@/graphql/codegen/graphql'
import { DELETE_CONTENT } from '@/graphql/operation/mutation/content'
import { FIND_CONTENT } from '@/graphql/operation/query/content'
import { FIND_TENANT_BY_ID } from '@/graphql/operation/query/tenant'
import UseDialog from '@/hooks/use-dialog'
import { useMutation, useQuery } from '@apollo/client'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons'
import { IconNotebook, IconTrash } from '@tabler/icons-react'
import { useParams } from '@tanstack/react-router'
import { InfoIcon } from 'lucide-react'
import { useState } from 'react'
import AddContent from '../components/add-content'
import UpdateContent from '../components/update-content'

const ClientIdPage = () => {
  const params = useParams({ strict: false })
  const [currentPage, setCurrentPage] = useState(1)

  const { data } = useQuery<Query>(FIND_TENANT_BY_ID, {
    variables: { tenantId: params.id },
    skip: !params.id, // Skip the query if id is not provided
  })
  const tenant = data?.findTenantById

  const {
    data: content,
    error: contentError,
    loading: contentLoading,
    refetch,
  } = useQuery<Query>(FIND_CONTENT, {
    variables: {
      tenantId: params.id,
      page: currentPage,
    },
    skip: !params.id, // Skip the query if id is not provided
  })

  // handle delete content
  const [deleteContent] = useMutation(DELETE_CONTENT)
  const handleDeleteContent = (itemId: string) => {
    deleteContent({
      variables: {
        deleteEmbeddingId: parseFloat(itemId),
        tenantId: params.id,
      },
      onCompleted: () => {
        refetch()
      },
    })
  }

    // Extract content data and pagination from the query result
    const contentData = content?.findContent?.content || []
    const contentPagination =
      content?.findContent?.pagination || ({} as Pagination)

    const addContent = UseDialog(AddContent)
    const onAdd = () => {
      addContent({ tenantId: params.id }, () => {
        refetch()
      })
    }

    const updateContent = UseDialog(UpdateContent)
    const onUpdate = (itemId: string, content: any) => {
      updateContent({ tenantId: params.id, itemId, content }, () => {
        refetch()
      })
    }

    const handlePageChange = (page: number) => {
      setCurrentPage(page)
    }

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
              <Button className='space-x-1' onClick={onAdd}>
                <span>Add Content</span> <IconNotebook size={18} />
              </Button>
            </div>
            <div className='flex flex-col gap-4'></div>
            {contentLoading ? (
              <div className='flex h-96 items-center justify-center'>
                <Spinner />
              </div>
            ) : contentError ? (
              <div className='flex h-96 items-center justify-center'>
                <span>Error loading content: {contentError.message}</span>
              </div>
            ) : (
              <div className='space-y-4'>
                {contentData.map((item) => (
                  <Alert
                    key={item.id}
                    className='relative border-cyan-600/50 text-cyan-600 dark:border-cyan-600 [&>svg]:text-cyan-600'
                  >
                    <InfoIcon className='h-4 w-4' />
                    <AlertTitle>Content ID: {item.id}</AlertTitle>
                    <AlertDescription>{item.content}</AlertDescription>

                    {/* Dropdown Menu in upper right */}
                    <div className='absolute top-3 right-3'>
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='ghost'
                            className='data-[state=open]:bg-muted flex h-8 w-8 p-0'
                          >
                            <DotsHorizontalIcon className='h-4 w-4' />
                            <span className='sr-only'>Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className='w-[160px]'>
                          <DropdownMenuItem
                            onClick={() => {
                              onUpdate(item.id, item.content)
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          {/* <DropdownMenuItem disabled>Make a copy</DropdownMenuItem>
                        <DropdownMenuItem disabled>Favorite</DropdownMenuItem> */}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              handleDeleteContent(item.id)
                            }}
                          >
                            Delete
                            <DropdownMenuShortcut>
                              <IconTrash size={16} />
                            </DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </Alert>
                ))}
              </div>
            )}
            {/* Simple Pagination */}
            {contentPagination?.totalPages &&
              contentPagination.totalPages > 1 && (
                <div className='mt-6 flex items-center justify-center gap-4'>
                  <Button
                    variant='outline'
                    onClick={() =>
                      handlePageChange(
                        (contentPagination?.currentPage || 1) - 1
                      )
                    }
                    disabled={!contentPagination?.hasPrevPage}
                  >
                    <ChevronLeftIcon className='mr-2 h-4 w-4' />
                    Previous
                  </Button>

                  <span className='text-sm font-medium'>
                    Page {contentPagination?.currentPage || 1} of{' '}
                    {contentPagination?.totalPages || 1}
                  </span>

                  <Button
                    variant='outline'
                    onClick={() =>
                      handlePageChange(
                        (contentPagination?.currentPage || 1) + 1
                      )
                    }
                    disabled={!contentPagination?.hasNextPage}
                  >
                    Next
                    <ChevronRightIcon className='ml-2 h-4 w-4' />
                  </Button>
                </div>
              )}
          </div>
        </Main>
      </>
    )
  }

export default ClientIdPage

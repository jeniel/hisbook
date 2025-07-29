import { useState } from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { useParams } from '@tanstack/react-router'
import { IconTrash } from '@tabler/icons-react'
import { Query } from '@/graphql/codegen/graphql'
import { DELETE_DOCUMENT } from '@/graphql/operation/mutation/content'
import { FIND_DOCUMENTS } from '@/graphql/operation/query/content'
import {
  FIND_ALL_TENANTS,
  FIND_TENANT_BY_ID,
} from '@/graphql/operation/query/tenant'
import { useMutation, useQuery } from '@apollo/client'
import { ChevronLeft, ChevronRight, InfoIcon, Plus } from 'lucide-react'
import UseDialog from '@/hooks/use-dialog'
import { useTenantInfo, useTenantById } from '@/hooks/use-tenant'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Main } from '@/components/layout/main'
import Spinner from '@/components/spinner'
import UpsertContent from '../components/upsert-content'

const ClientIdPage = () => {
  const [currentOffset, setCurrentOffset] = useState<string | null>(null)
  const [offsetHistory, setOffsetHistory] = useState<(string | null)[]>([null])
  const [currentPage, setCurrentPage] = useState(1)

  // const tenantInfo = useTenantInfo()

  const params = useParams({ strict: false })

  const { tenantData } = useTenantById(params.id as string)

  const { data, loading, refetch } = useQuery<Query>(FIND_DOCUMENTS, {
    variables: {
      input: {
        collectionName: tenantData?.findTenantById.collectionName,
        limit: 10,
        offset: currentOffset,
      },
    },
  })
  const [deleteContent, { loading: deleteLoading }] =
    useMutation(DELETE_DOCUMENT)

  const contentData = data?.qdrantScrollPoints.points || []
  const nextPageOffset = data?.qdrantScrollPoints.next_page_offset

  const handleNextPage = () => {
    if (nextPageOffset) {
      setOffsetHistory((prev) => [...prev, nextPageOffset])
      setCurrentOffset(nextPageOffset)
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newHistory = [...offsetHistory]
      newHistory.pop() // Remove current offset
      const prevOffset = newHistory[newHistory.length - 1] || null

      setOffsetHistory(newHistory)
      setCurrentOffset(prevOffset)
      setCurrentPage((prev) => prev - 1)
    }
  }

  const hasNextPage = !!nextPageOffset
  const hasPrevPage = currentPage > 1

  const onUpsert = UseDialog(UpsertContent)

  const upsertContent = (collectionName: string, tenantId: string) => {
    onUpsert({ collectionName, tenantId }, () => {
      refetch()
    })
  }

  const handleEditContent = (
    itemId: string,
    content: string,
    collectionName: string,
    tenantId: string
  ) => {
    // TODO: Implement edit functionality
    onUpsert({ itemId, content, collectionName, tenantId }, () => {
      refetch()
    })
  }

  const handleDeleteContent = (id: string) => {
    // TODO: Implement delete functionality
    deleteContent({
      variables: {
        collectionName: tenantData?.findTenantById.collectionName,
        ids: [id],
      },
      onCompleted: () => {
        refetch()
      },
    })
  }

  return (
    <>
      <Main>
        <Alert className='border-cyan-600/50 text-cyan-600 dark:border-cyan-600 [&>svg]:text-cyan-600'>
          <InfoIcon className='h-4 w-4' />
          {/* <AlertTitle>{tenant?.name}</AlertTitle> */}
          <AlertDescription>
            Content Items - Page {currentPage} (Showing {contentData.length}{' '}
            items)
          </AlertDescription>
        </Alert>

        {/* Add Content Button */}
        <div className='mt-4 flex justify-end'>
          <Button
            onClick={() =>
              upsertContent(
                tenantData?.findTenantById?.collectionName as any,
                tenantData?.findTenantById.id as any
              )
            }
            className='flex items-center space-x-2'
          >
            <Plus className='h-4 w-4' />
            <span>Add Content</span>
          </Button>
        </div>

        {loading || deleteLoading ? (
          <div className='flex items-center justify-center py-8'>
            <Spinner />
          </div>
        ) : (
          <div className='mt-6 space-y-2'>
            {contentData.length === 0 ? (
              <div className='text-muted-foreground py-8 text-center'>
                No content found
              </div>
            ) : (
              contentData.map((item: any, index: number) => (
                <div
                  key={item.id || index}
                  className='bg-card hover:bg-accent/50 relative rounded-lg border p-3 transition-colors'
                >
                  <p className='pr-10 text-sm leading-relaxed'>
                    {item.payload?.content || 'No content available'}
                  </p>

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
                            handleEditContent(
                              item.id,
                              item.payload?.content || '',
                              tenantData?.findTenantById.collectionName || '',
                              tenantData?.findTenantById.id || ''
                            )
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
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
                </div>
              ))
            )}

            {/* Pagination Controls */}
            {(hasNextPage || hasPrevPage) && (
              <div className='flex items-center justify-center space-x-4 py-4'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={handlePrevPage}
                  disabled={!hasPrevPage || loading}
                  className='flex items-center space-x-2'
                >
                  <ChevronLeft className='h-4 w-4' />
                  <span>Previous</span>
                </Button>

                <span className='text-muted-foreground text-sm'>
                  Page {currentPage}
                </span>

                <Button
                  variant='outline'
                  size='sm'
                  onClick={handleNextPage}
                  disabled={!hasNextPage || loading}
                  className='flex items-center space-x-2'
                >
                  <span>Next</span>
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div>
            )}
          </div>
        )}
      </Main>
    </>
  )
}

export default ClientIdPage

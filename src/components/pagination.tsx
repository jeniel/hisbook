import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentPage: number
  lastPage: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  lastPage,
  onPageChange,
}: PaginationProps) {
  const getPages = () => {
    const pages: (number | string)[] = []
    const delta = 1 // number of pages around current

    for (let i = 1; i <= lastPage; i++) {
      if (
        i === 1 || // always show first
        i === lastPage || // always show last
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i)
      } else if (
        (i === currentPage - delta - 1 && i > 1) ||
        (i === currentPage + delta + 1 && i < lastPage)
      ) {
        pages.push('...')
      }
    }
    return pages
  }

  const pages = getPages()

  return (
    <div className='mt-4 flex flex-wrap items-center justify-center gap-2'>
      <Button
        variant='outline'
        size='sm'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </Button>

      {pages.map((page, index) =>
        page === '...' ? (
          <span key={`ellipsis-${index}`} className='px-2 text-gray-500'>
            ...
          </span>
        ) : (
          <Button
            key={page}
            size='sm'
            variant={page === currentPage ? 'default' : 'outline'}
            onClick={() => onPageChange(page as number)}
          >
            {page}
          </Button>
        )
      )}

      <Button
        variant='outline'
        size='sm'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
      >
        Next
      </Button>
    </div>
  )
}

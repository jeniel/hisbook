import { useState } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type SearchBarProps = {
  placeholder?: string
  onSearch: (value: string) => void
  className?: string
}

export default function SearchBar({
  placeholder = 'Search...',
  onSearch,
  className,
}: SearchBarProps) {
  const [value, setValue] = useState('')

  const handleSearch = () => {
    onSearch(value.trim())
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  return (
    <div className={cn('flex w-full items-center gap-2', className)}>
      <div className='relative flex-1'>
        <Search className='text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2' />
        <Input
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className='pl-8 shadow-sm'
        />
      </div>
      <Button onClick={handleSearch} variant='default' className='shadow-sm'>
        Search
      </Button>
    </div>
  )
}

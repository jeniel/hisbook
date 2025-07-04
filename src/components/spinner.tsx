import { LoaderIcon } from 'lucide-react'

export default function Spinner() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <LoaderIcon className='h-10 w-10 animate-spin text-gray-500' />
    </div>
  )
}

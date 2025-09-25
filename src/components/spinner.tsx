import clsx from 'clsx'
import { Loader2 } from 'lucide-react'

interface SpinnerProps {
  fullScreen?: boolean
  size?: number
  message?: string
}

export default function Spinner({
  fullScreen = false,
  size = 32,
  message,
}: SpinnerProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        fullScreen ? 'h-screen w-screen' : 'h-32 w-full'
      )}
    >
      <div className='flex flex-col items-center gap-3'>
        <Loader2
          className='animate-spin text-gray-500'
          style={{ width: size, height: size }}
        />
        {message && <p className='text-sm text-gray-600'>{message}</p>}
      </div>
    </div>
  )
}

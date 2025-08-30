/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import { useUpload } from '@/hooks/useUpload'

interface AvatarProps {
  avatarUrl?: string
  userId?: string
  size?: number
  className?: string
}

export default function Avatar({ avatarUrl, size = 80 }: AvatarProps) {
  const [preview, setPreview] = useState<string>('')
  const { getFile } = useUpload()

  useEffect(() => {
    let active = true
    const fetchAvatar = async () => {
      if (!avatarUrl) return
      try {
        const filename = avatarUrl.split('/').pop()!
        const bucket = import.meta.env.VITE_MINIO_BUCKET
        const url = await getFile('avatar', filename, bucket)
        if (url && active) {
          setPreview(url)
        }
      } catch (err) {
        console.error('Failed to fetch avatar:', err)
      }
    }

    fetchAvatar()

    return () => {
      active = false
    }
  }, [avatarUrl])

  return (
    <img
      src={preview || './images/ace.png'}
      alt='User Avatar'
      loading='lazy' // <-- native lazy-loading
      className='rounded-full object-cover'
      style={{ width: size, height: size }}
    />
  )
}

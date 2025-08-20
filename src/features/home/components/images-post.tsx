import { useEffect, useState } from 'react'
import { useUpload } from '@/hooks/useUpload'

interface PostImagesProps {
  images?: { id: string; url: string }[] // your Images model
}

export default function PostImages({ images }: PostImagesProps) {
  const [previews, setPreviews] = useState<string[]>([])
  const { getFile } = useUpload()

  useEffect(() => {
    if (!images || images.length === 0) return

    const loadImages = async () => {
      const urls: string[] = []

      for (const img of images) {
        // Full URL fallback
        if (img.url.startsWith('http')) {
          urls.push(img.url)
        } else {
          // Only use the filename for getFile
          const filename = img.url.split('/').pop()!
          const blobUrl = await getFile('acebook', 'posts', filename)
          if (blobUrl) urls.push(blobUrl)
        }
      }

      setPreviews(urls)
    }

    loadImages()
  }, [images])

  if (previews.length === 0) return null

  return (
    <div className='mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3'>
      {previews.map((url, idx) => (
        <img
          key={idx}
          src={url}
          alt={`Post image ${idx + 1}`}
          className='h-48 w-full rounded-lg object-cover'
        />
      ))}
    </div>
  )
}

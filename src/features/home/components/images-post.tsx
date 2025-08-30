/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useUpload } from '@/hooks/useUpload'

interface PostImagesProps {
  images?: string[]
  limit?: number
}

export default function PostImages({
  images = [],
  limit = 3,
}: PostImagesProps) {
  const [previews, setPreviews] = useState<string[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const { getFiles } = useUpload()

  // Load Images
  useEffect(() => {
    if (images.length === 0) return

    const loadImages = async () => {
      const bucket = import.meta.env.VITE_MINIO_BUCKET
      const urls = await getFiles(
        'posts', // folder
        images.map((img) => img.split('/').pop()!), // filenames
        bucket
      )
      setPreviews(urls)
    }

    loadImages()
  }, [images])

  if (previews.length === 0) return null

  // Limit the number of images displayed - Limit 3 by default
  const visibleImages = previews.slice(0, limit)
  const remaining = previews.length - limit

  // Carousel Controls
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % previews.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + previews.length) % previews.length)
  }

  return (
    <>
      {/* Grid of images with overlay */}
      <div className='relative mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3'>
        {visibleImages.map((url, idx) => {
          const isLastVisible = idx === limit - 1 && remaining > 0
          return (
            <div key={idx} className='relative'>
              <img
                src={url}
                alt={`Post image ${idx + 1}`}
                className='h-48 w-full cursor-pointer rounded-lg object-cover'
                onClick={() => setModalOpen(true)}
                loading='lazy'
              />
              {isLastVisible && (
                <div
                  className='absolute inset-0 flex cursor-pointer items-center justify-center rounded-lg bg-black/50 text-2xl font-bold text-white'
                  onClick={() => setModalOpen(true)}
                >
                  +{remaining}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Modal Carousel */}
      {modalOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/70'
          onClick={() => setModalOpen(false)}
        >
          <div
            className='relative h-[80vh] w-full max-w-7xl rounded-lg bg-neutral-900 p-4'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className='absolute top-3 right-3 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-2xl font-bold text-white shadow-lg transition hover:bg-red-700'
              onClick={() => setModalOpen(false)}
              aria-label='Close modal'
            >
              ×
            </button>

            <div className='relative h-full'>
              <img
                src={previews[currentIndex]}
                alt={`Carousel image ${currentIndex + 1}`}
                className='h-full w-full rounded-lg object-contain'
              />

              {/* Arrows */}
              {previews.length > 1 && (
                <>
                  <button
                    className='absolute top-1/2 left-2 -translate-y-1/2 transform rounded bg-black/30 px-3 py-1 text-white'
                    onClick={prevImage}
                  >
                    ‹
                  </button>
                  <button
                    className='absolute top-1/2 right-2 -translate-y-1/2 transform rounded bg-black/30 px-3 py-1 text-white'
                    onClick={nextImage}
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

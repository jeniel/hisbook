/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

interface UploadResult {
  success: boolean
  message: string
  url?: string
}

export const useUpload = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const API_URL = import.meta.env.VITE_API_EXPRESS
  const DEFAULT_BUCKET = import.meta.env.VITE_MINIO_BUCKET

  // Upload a single file
  const uploadFile = async (
    file: File,
    type: string,
    bucket: string = DEFAULT_BUCKET
  ): Promise<UploadResult> => {
    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch(`${API_URL}/files/upload/${bucket}/${type}`, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => null)
        throw new Error(errData?.message || 'Upload failed')
      }

      const data = await res.json()
      return {
        success: true,
        message: data.message,
        url: data.url,
      }
    } catch (err: any) {
      setError(err.message || 'Unknown error')
      return { success: false, message: err.message || 'Unknown error' }
    } finally {
      setLoading(false)
    }
  }

  // Upload multiple files
  const uploadFiles = async (
    files: File[],
    type: string,
    bucket: string = DEFAULT_BUCKET
  ): Promise<string[]> => {
    if (!files.length) return []

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      files.forEach((file) => formData.append('files', file))

      const res = await fetch(
        `${API_URL}/files/upload-multiple/${bucket}/${type}`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!res.ok) {
        const errData = await res.json().catch(() => null)
        throw new Error(errData?.message || 'Multiple upload failed')
      }

      const data = await res.json()
      // Expect backend to return { files: [{ url: "..." }, ...] }
      return data.files.map((f: { url: string }) => f.url)
    } catch (err: any) {
      setError(err.message || 'Unknown error')
      return []
    } finally {
      setLoading(false)
    }
  }

  // Get a single file
  const getFile = async (
    folder: string,
    filename: string,
    bucket: string = DEFAULT_BUCKET
  ): Promise<string | null> => {
    try {
      const url = `${API_URL}/files/${bucket}/${folder}/${encodeURIComponent(filename)}`
      const res = await fetch(url)

      if (!res.ok) {
        throw new Error(`Failed to fetch file: ${res.statusText}`)
      }

      const blob = await res.blob()
      return URL.createObjectURL(blob)
    } catch (err: any) {
      console.error('getFile error:', err.message)
      return null
    }
  }

  // Get multiple files
  const getFiles = async (
    folder: string,
    filenames: string[],
    bucket: string = DEFAULT_BUCKET
  ): Promise<string[]> => {
    setLoading(true)
    setError(null)

    try {
      const urls = await Promise.all(
        filenames.map(async (filename) => {
          const blobUrl = await getFile(folder, filename, bucket)
          return blobUrl || ''
        })
      )
      return urls.filter(Boolean)
    } catch (err: any) {
      console.error('getFiles error:', err)
      setError(err.message)
      return []
    } finally {
      setLoading(false)
    }
  }

  return { uploadFile, uploadFiles, getFile, getFiles, loading, error }
}

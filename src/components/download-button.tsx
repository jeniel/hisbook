import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

type DownloadButtonProps = {
  endpoint: string
  filename: string
  label: string
}

export function DownloadButton({
  endpoint,
  filename,
  label,
}: DownloadButtonProps) {
  const handleDownload = async () => {
    const API_URL = import.meta.env.VITE_API_URL

    const res = await fetch(`${API_URL}/${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
    })
    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()

    window.URL.revokeObjectURL(url)
  }

  return (
    <Button onClick={handleDownload} className='flex items-center gap-2'>
      <Download className='h-4 w-4' />
      {label}
    </Button>
  )
}

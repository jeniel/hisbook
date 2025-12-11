/* eslint-disable no-console */
import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

// GraphQL mutation for exporting tickets
const EXPORT_TICKETS = gql`
  mutation ExportTickets {
    exportTicketsBase64
  }
`

export default function DownloadTickets() {
  const [exportTickets] = useMutation(EXPORT_TICKETS)
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    try {
      setLoading(true)
      const { data } = await exportTickets()

      const base64 = data.exportTicketsBase64
      const blob = new Blob(
        [Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))],
        {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }
      )

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'tickets.xlsx' // change filename
      link.click()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Download failed', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={loading}
      className='flex items-center gap-2'
    >
      <Download className='h-4 w-4' />
      {loading ? 'Downloading...' : 'Export Tickets'}
    </Button>
  )
}

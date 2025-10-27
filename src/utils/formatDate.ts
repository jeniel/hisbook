export function formatDate(dateString?: string | null, dateOnly = false): string {
  if (!dateString) return 'TBD'

  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = dateOnly
    ? { year: 'numeric', month: 'long', day: 'numeric' }
    : {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }

  const formatted = date.toLocaleString('en-US', options)
  return dateOnly ? formatted : formatted.replace(',', ' at')
}

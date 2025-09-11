import { createFileRoute } from '@tanstack/react-router'
import Tickets from '@/features/tickets/pages/user-page'

export const Route = createFileRoute('/_authenticated/tickets/')({
  component: Tickets,
})


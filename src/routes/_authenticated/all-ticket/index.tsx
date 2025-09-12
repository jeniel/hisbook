import { createFileRoute } from '@tanstack/react-router'
import AllTicketPage from '@/features/tickets/pages/all-ticket-page'

export const Route = createFileRoute('/_authenticated/all-ticket/')({
  component: AllTicketPage,
})

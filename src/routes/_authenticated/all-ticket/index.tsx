import { createFileRoute } from '@tanstack/react-router'
import AllTickets from '@/features/tickets/pages/all-tickets'

export const Route = createFileRoute('/_authenticated/all-ticket/')({
  component: AllTickets,
})

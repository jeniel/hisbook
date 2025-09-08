import { createFileRoute } from '@tanstack/react-router'
import ReceivedTickets from '@/features/admin-tickets/components/received-tickets'

export const Route = createFileRoute('/_authenticated/received-tickets/')({
  component: ReceivedTickets,
})

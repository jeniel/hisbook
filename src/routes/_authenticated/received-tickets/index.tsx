import ReceivedTickets from '@/features/tickets/components/received-tickets'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/received-tickets/')({
  component: ReceivedTickets,
})

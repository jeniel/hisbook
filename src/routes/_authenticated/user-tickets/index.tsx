import { createFileRoute } from '@tanstack/react-router'
import UserTickets from '@/features/tickets/pages/user-tickets'

export const Route = createFileRoute('/_authenticated/user-tickets/')({
  component: UserTickets,
})

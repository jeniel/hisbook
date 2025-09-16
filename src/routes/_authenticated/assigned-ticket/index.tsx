import { createFileRoute } from '@tanstack/react-router'
import AssignedTickets from '@/features/tickets/pages/assigned-page'

export const Route = createFileRoute('/_authenticated/assigned-ticket/')({
  component: AssignedTickets,
})

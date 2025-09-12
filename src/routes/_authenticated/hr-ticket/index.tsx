import { createFileRoute } from '@tanstack/react-router'
import HrTickets from '@/features/tickets/pages/hr-page'

export const Route = createFileRoute('/_authenticated/hr-ticket/')({
  component: HrTickets,
})

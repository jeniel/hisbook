import { createFileRoute } from '@tanstack/react-router'
import MisTicket from '@/features/tickets/pages/mis-page'

export const Route = createFileRoute('/_authenticated/mis-ticket/')({
  component: MisTicket,
})

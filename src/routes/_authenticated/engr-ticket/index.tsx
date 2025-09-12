import EngrTicket from '@/features/tickets/pages/engr-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/engr-ticket/')({
  component: EngrTicket,
})

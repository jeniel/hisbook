import { createFileRoute } from '@tanstack/react-router'
import Tickets from '@/features/tickets/index'

export const Route = createFileRoute('/_authenticated/tickets/')({
  component: Tickets,
})


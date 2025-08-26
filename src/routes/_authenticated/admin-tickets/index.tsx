import { createFileRoute } from '@tanstack/react-router'
import AdminTickets from '@/features/admin-tickets'

export const Route = createFileRoute('/_authenticated/admin-tickets/')({
  component: AdminTickets,
})

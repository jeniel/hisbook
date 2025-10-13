import { createFileRoute } from '@tanstack/react-router'
import DepartmentTickets from '@/features/tickets/pages/department-tickets'

export const Route = createFileRoute('/_authenticated/department-ticket/')({
  component: DepartmentTickets,
})

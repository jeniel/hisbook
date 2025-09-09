import AttendancePage from '@/features/attendance'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/attendance/')({
  component: AttendancePage,
})


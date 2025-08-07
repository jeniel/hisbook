import { createFileRoute } from '@tanstack/react-router'
import Users from '@/features/users/index'

export const Route = createFileRoute('/_authenticated/users/')({
  component: Users,
})


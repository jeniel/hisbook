import { createFileRoute } from '@tanstack/react-router'
import EditProfile from '@/features/profile/components/edit-profile'

export const Route = createFileRoute('/_authenticated/edit-profile/')({
  component: EditProfile,
})

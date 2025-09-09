import { createFileRoute } from '@tanstack/react-router'
import HomePage from '@/features/home'
import HomePage2 from '@/features/home2'

export const Route = createFileRoute('/_authenticated/')({
  component: HomePage2,
})

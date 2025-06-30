import ClientPage from '@/features/ai-agent/client'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/ai-agent/client/')({
  component: ClientPage,
})


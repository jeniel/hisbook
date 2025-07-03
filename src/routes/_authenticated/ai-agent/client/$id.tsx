import ClientIdPage from '@/features/ai-agent/client/client-id'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/ai-agent/client/$id')({
  component: ClientIdPage,
})



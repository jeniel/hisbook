import { createFileRoute } from '@tanstack/react-router'
import ChatUI from '@/features/chat'

export const Route = createFileRoute('/_authenticated/chat/')({
  component: ChatUI,
})

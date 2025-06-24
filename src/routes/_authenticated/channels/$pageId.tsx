import { createFileRoute } from '@tanstack/react-router'
import FbPageId from '@/features/channels/facebook/pageId'

export const Route = createFileRoute('/_authenticated/channels/$pageId')({
  component: FbPageId,
})

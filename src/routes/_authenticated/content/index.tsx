import { createFileRoute } from '@tanstack/react-router'
import Content from '@/features/content'
import ContentPage from '@/features/content'

export const Route = createFileRoute('/_authenticated/content/')({
  component: ContentPage,
})

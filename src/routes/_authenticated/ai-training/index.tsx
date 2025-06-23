import { createFileRoute } from '@tanstack/react-router'
import AiTrainingPage from '@/features/ai-training'

export const Route = createFileRoute('/_authenticated/ai-training/')({
  component: AiTrainingPage,
})

// function RouteComponent() {
//   return <div>Hello "/_authenticated/ai-training/"!</div>
// }

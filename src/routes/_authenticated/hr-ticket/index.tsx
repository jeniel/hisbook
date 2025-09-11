import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/hr-ticket/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/hr-ticket/"!</div>
}

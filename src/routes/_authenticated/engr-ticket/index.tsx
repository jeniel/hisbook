import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/engr-ticket/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/engr-ticket/"!</div>
}

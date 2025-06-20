import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/content/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/content/"!</div>
}

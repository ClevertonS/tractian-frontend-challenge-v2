import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/company/$companyId/$assetId')({
  component: () => <div>Hello /company/$companyId/$assetId!</div>
})
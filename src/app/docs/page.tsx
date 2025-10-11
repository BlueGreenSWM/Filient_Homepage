import { redirect } from 'next/navigation'

export default function DocsIndexPage() {
  // Redirect to the first document
  redirect('/docs/getting-started/introduction')
}
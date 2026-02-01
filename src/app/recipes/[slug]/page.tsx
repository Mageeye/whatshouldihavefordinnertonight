import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'

export default function RecipePage({
  params,
}: {
  params: { slug: string }
}) {
  // Placeholder - will be implemented when recipe directory is built
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/recipes"
          className="mb-6 text-sm text-blue-600 hover:text-blue-800"
        >
          ← Back to Recipes
        </Link>
        <div className="mx-auto max-w-3xl text-center">
          <div className="rounded-lg bg-white p-12 shadow-sm">
            <div className="text-6xl mb-4">🍳</div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Recipe Detail Page
            </h1>
            <p className="mt-4 text-gray-600">
              Recipe detail pages are coming soon. This page will show full
              recipe details, ingredients, instructions, and more.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Slug: {params.slug}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

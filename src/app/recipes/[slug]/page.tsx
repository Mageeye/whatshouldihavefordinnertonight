import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'

export default function RecipePage({
  params,
}: {
  params: { slug: string }
}) {
  // Placeholder - will be implemented when recipe directory is built
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/recipes"
          className="mb-6 text-sm text-primary hover:text-primary/80"
        >
          ← Back to Recipes
        </Link>
        <div className="mx-auto max-w-3xl text-center">
          <div className="rounded-lg bg-card p-12 shadow-sm border border-border">
            <div className="text-6xl mb-4">🍳</div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Recipe Detail Page
            </h1>
            <p className="mt-4 text-muted-foreground">
              Recipe detail pages are coming soon. This page will show full
              recipe details, ingredients, instructions, and more.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Slug: {params.slug}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { RecipeBuilder } from '@/components/RecipeBuilder'

export default function CookPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 md:px-6">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to home
          </Link>
        </div>
        
        <div className="text-center mb-4">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Cook Mode
          </h1>
          <p className="mt-2 text-base text-muted-foreground md:text-lg">
            Fast recipes that fit what you&apos;ve got, your diet, and your time.
          </p>
        </div>

        <RecipeBuilder />
      </main>
    </div>
  )
}

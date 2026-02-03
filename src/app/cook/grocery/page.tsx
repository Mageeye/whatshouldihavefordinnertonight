'use client'

import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { Button } from '@/components/ui/button'
import { RecipeBuilder } from '@/components/RecipeBuilder'

export default function GroceryPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="mb-6">
          <Link href="/cook">
            <Button variant="outline" size="sm">
              ← Back
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
          Grocery plan
        </h1>
        <p className="mt-4 text-base text-muted-foreground md:text-lg">
          Tell us what sounds good—we&apos;ll suggest recipes + a simple list.
        </p>
        <RecipeBuilder type="grocery" />
      </main>
    </div>
  )
}

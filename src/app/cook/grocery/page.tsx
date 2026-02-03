'use client'

import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { Button } from '@/components/ui/button'
import { RecipeBuilder } from '@/components/RecipeBuilder'

export default function GroceryPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/cook">
            <Button variant="outline" size="sm">
              ← Back
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Recipe Builder - Grocery Shopping
        </h1>
        <p className="mt-2 text-muted-foreground">
          Get recipe suggestions and a shopping list based on your preferences
          and budget.
        </p>
        <RecipeBuilder type="grocery" />
      </main>
    </div>
  )
}

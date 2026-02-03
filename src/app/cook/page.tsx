import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { Button } from '@/components/ui/button'

export default function CookPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Let&apos;s Cook Something!
        </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose whether you want to use what you already have or go grocery
            shopping.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <Link href="/cook/pantry">
              <div className="rounded-lg border-2 border-border bg-card p-8 shadow-sm transition-all hover:border-primary hover:shadow-md">
                <div className="text-4xl mb-4">🥫</div>
                <h2 className="text-2xl font-semibold text-foreground">
                  Use What I Have
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Tell us what ingredients you have, and we&apos;ll suggest recipes
                  you can make right now.
                </p>
              </div>
            </Link>
            <Link href="/cook/grocery">
              <div className="rounded-lg border-2 border-border bg-card p-8 shadow-sm transition-all hover:border-primary hover:shadow-md">
                <div className="text-4xl mb-4">🛒</div>
                <h2 className="text-2xl font-semibold text-foreground">
                  Go Grocery Shopping
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Get recipe suggestions and a shopping list based on your
                  preferences and budget.
                </p>
              </div>
            </Link>
          </div>
          <div className="mt-8 flex gap-4">
            <Link href="/start">
              <Button variant="outline">Back</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

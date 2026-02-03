import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { Button } from '@/components/ui/button'

export default function StartPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            What&apos;s the move tonight?
          </h1>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Pick a path. We&apos;ll handle the decision fatigue.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Link
              href="/cook"
              className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div className="text-4xl mb-3">👨‍🍳</div>
              <h2 className="text-lg font-medium text-foreground">
                Cook something easy
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Use pantry ingredients or build a quick grocery plan.
              </p>
              <div className="mt-4">
                <span className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors group-hover:bg-primary/90">
                  Cook
                </span>
              </div>
            </Link>
            <Link
              href="/orderout"
              className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div className="text-4xl mb-3">🍽️</div>
              <h2 className="text-lg font-medium text-foreground">
                Order the right thing
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Find food that matches your mood + diet near you.
              </p>
              <div className="mt-4">
                <span className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors group-hover:bg-primary/90">
                  Order Out
                </span>
              </div>
            </Link>
          </div>
          <div className="mt-8">
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

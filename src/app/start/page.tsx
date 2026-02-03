import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { Button } from '@/components/ui/button'

export default function StartPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            How would you like to proceed?
          </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose whether you&apos;d like to cook something or order out.
        </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <Link href="/cook">
              <div className="rounded-lg border-2 border-border bg-card p-8 shadow-sm transition-all hover:border-primary hover:shadow-md">
                <div className="text-4xl mb-4">👨‍🍳</div>
                <h2 className="text-2xl font-semibold text-foreground">Cook</h2>
                <p className="mt-2 text-muted-foreground">
                  Make something delicious at home. Use what you have or get
                  grocery suggestions.
                </p>
              </div>
            </Link>
            <Link href="/orderout">
              <div className="rounded-lg border-2 border-border bg-card p-8 shadow-sm transition-all hover:border-primary hover:shadow-md">
                <div className="text-4xl mb-4">🍽️</div>
                <h2 className="text-2xl font-semibold text-foreground">
                  Order Out
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Find the perfect restaurant near you based on your mood and
                  preferences.
                </p>
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

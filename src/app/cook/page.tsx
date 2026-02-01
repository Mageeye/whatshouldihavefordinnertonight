import Link from 'next/link'
import { Header } from '@/components/Header'
import { Button } from '@/components/Button'

export default function CookPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Let's Cook Something!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Choose whether you want to use what you already have or go grocery
            shopping.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <Link href="/cook/pantry">
              <div className="rounded-lg border-2 border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-blue-500 hover:shadow-md">
                <div className="text-4xl mb-4">🥫</div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Use What I Have
                </h2>
                <p className="mt-2 text-gray-600">
                  Tell us what ingredients you have, and we'll suggest recipes
                  you can make right now.
                </p>
              </div>
            </Link>
            <Link href="/cook/grocery">
              <div className="rounded-lg border-2 border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-blue-500 hover:shadow-md">
                <div className="text-4xl mb-4">🛒</div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Go Grocery Shopping
                </h2>
                <p className="mt-2 text-gray-600">
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

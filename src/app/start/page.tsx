import Link from 'next/link'
import { Header } from '@/components/Header'
import { Button } from '@/components/Button'

export default function StartPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            How would you like to proceed?
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Choose whether you'd like to cook something or order out.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <Link href="/cook">
              <div className="rounded-lg border-2 border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-blue-500 hover:shadow-md">
                <div className="text-4xl mb-4">👨‍🍳</div>
                <h2 className="text-2xl font-semibold text-gray-900">Cook</h2>
                <p className="mt-2 text-gray-600">
                  Make something delicious at home. Use what you have or get
                  grocery suggestions.
                </p>
              </div>
            </Link>
            <Link href="/orderout">
              <div className="rounded-lg border-2 border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-blue-500 hover:shadow-md">
                <div className="text-4xl mb-4">🍽️</div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Order Out
                </h2>
                <p className="mt-2 text-gray-600">
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

import { Header } from '@/components/Header'

export default function RecipesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Recipe Directory
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Browse our curated collection of recipes. Coming soon!
          </p>
          <div className="mt-12 rounded-lg bg-white p-12 shadow-sm">
            <div className="text-6xl mb-4">🍳</div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Recipe Directory Coming Soon
            </h2>
            <p className="mt-4 text-gray-600">
              We're working on building a comprehensive recipe directory with
              search, filtering, and detailed recipe pages. Stay tuned!
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

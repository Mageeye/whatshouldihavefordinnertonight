'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Button } from '@/components/Button'
import { Restaurant } from '@/lib/restaurantProviders/provider'

const MOODS = [
  'Italian',
  'Japanese',
  'Mexican',
  'American',
  'Chinese',
  'Thai',
  'Indian',
  'Mediterranean',
  'Vegetarian',
  'Pizza',
  'Burgers',
  'Sushi',
]

const DIETARY_NEEDS = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Keto',
  'Halal',
  'Kosher',
]

export default function OrderOutPage() {
  const [zipCode, setZipCode] = useState('')
  const [mood, setMood] = useState('')
  const [dietaryNeeds, setDietaryNeeds] = useState<string[]>([])
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggleDietary = (item: string) => {
    if (dietaryNeeds.includes(item)) {
      setDietaryNeeds(dietaryNeeds.filter((d) => d !== item))
    } else {
      setDietaryNeeds([...dietaryNeeds, item])
    }
  }

  const handleSearch = async () => {
    if (!zipCode.match(/^\d{5}(-\d{4})?$/)) {
      setError('Please enter a valid zip code')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/restaurants/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          zipCode,
          mood: mood || undefined,
          dietaryNeeds: dietaryNeeds.length > 0 ? dietaryNeeds : undefined,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to search restaurants')
      }

      const data = await response.json()
      setRestaurants(data.restaurants)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/start">
            <Button variant="outline" size="sm">
              ← Back
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Order Out
        </h1>
        <p className="mt-2 text-gray-600">
          Find the perfect restaurant near you based on your mood and
          preferences.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <label className="block text-sm font-medium text-gray-700">
                Zip Code *
              </label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="12345"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">
                What are you in the mood for?
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {MOODS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMood(mood === m ? '' : m)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      mood === m
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">
                Dietary Needs
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {DIETARY_NEEDS.map((need) => (
                  <button
                    key={need}
                    onClick={() => toggleDietary(need)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      dietaryNeeds.includes(need)
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {need}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4 text-red-800">
                {error}
              </div>
            )}

            <Button
              onClick={handleSearch}
              disabled={loading || !zipCode}
              size="lg"
              className="w-full"
            >
              {loading ? 'Searching...' : 'Find Restaurants'}
            </Button>
          </div>

          {/* Right Column - Results */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">
                Restaurant Results
              </h2>
              {loading && (
                <div className="mt-6 text-center text-gray-600">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                  <p className="mt-2">Searching restaurants...</p>
                </div>
              )}
              {!loading && restaurants.length === 0 && (
                <div className="mt-6 text-center text-gray-500">
                  <p>
                    Enter your zip code and click "Find Restaurants" to see
                    results here.
                  </p>
                </div>
              )}
              {!loading && restaurants.length > 0 && (
                <div className="mt-6 space-y-4">
                  {restaurants.map((restaurant) => (
                    <div
                      key={restaurant.id}
                      className="rounded-lg border border-gray-200 p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {restaurant.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-600">
                            {restaurant.cuisine} • {restaurant.priceRange} •{' '}
                            {restaurant.distance}
                          </p>
                          <div className="mt-2 flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm font-medium text-gray-700">
                              {restaurant.rating}
                            </span>
                          </div>
                          {restaurant.description && (
                            <p className="mt-2 text-sm text-gray-600">
                              {restaurant.description}
                            </p>
                          )}
                          <div className="mt-3 text-sm text-gray-600">
                            <p>{restaurant.address}</p>
                            {restaurant.phone && <p>{restaurant.phone}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

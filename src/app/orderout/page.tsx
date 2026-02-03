'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { Button } from '@/components/ui/button'
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
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" size="sm">
              ← Back
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
          Order out
        </h1>
        <p className="mt-4 text-base text-muted-foreground md:text-lg">
          Pick a vibe + diet. Get a short list you&apos;ll actually want.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <div className="rounded-xl bg-card p-6 shadow-sm border border-border">
              <label className="block text-sm font-medium text-foreground">
                Zip Code *
              </label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="12345"
                className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="rounded-xl bg-card p-6 shadow-sm border border-border">
              <h2 className="text-lg font-medium text-foreground">
                What sounds good?
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {MOODS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMood(mood === m ? '' : m)}
                    className={`rounded-full px-4 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      mood === m
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-card p-6 shadow-sm border border-border">
              <h2 className="text-lg font-medium text-foreground">
                Diet &amp; restrictions
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {DIETARY_NEEDS.map((need) => (
                  <button
                    key={need}
                    onClick={() => toggleDietary(need)}
                    className={`rounded-full px-4 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      dietaryNeeds.includes(need)
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    }`}
                  >
                    {need}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-destructive/10 p-4 text-destructive">
                {error}
              </div>
            )}

            <Button
              onClick={handleSearch}
              disabled={loading || !zipCode}
              size="lg"
              className="w-full h-12 text-base shadow-sm"
            >
              {loading ? 'Searching...' : 'Show me options'}
            </Button>
          </div>

          {/* Right Column - Results */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="rounded-xl bg-card p-6 shadow-sm border border-border">
              <h2 className="text-lg font-medium text-foreground">
                Results
              </h2>
              {loading && (
                <div className="mt-6 text-center text-muted-foreground">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  <p className="mt-2">Searching restaurants...</p>
                </div>
              )}
              {!loading && restaurants.length === 0 && (
                <div className="mt-6 text-center text-muted-foreground">
                  <p>
                    Enter your zip and click Show me options.
                  </p>
                </div>
              )}
              {!loading && restaurants.length > 0 && (
                <div className="mt-6 space-y-4">
                  {restaurants.map((restaurant) => (
                    <div
                      key={restaurant.id}
                      className="rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-foreground">
                            {restaurant.name}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {restaurant.cuisine} • {restaurant.priceRange} •{' '}
                            {restaurant.distance}
                          </p>
                          <div className="mt-2 flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm font-medium text-foreground">
                              {restaurant.rating}
                            </span>
                          </div>
                          {restaurant.description && (
                            <p className="mt-2 text-sm text-muted-foreground">
                              {restaurant.description}
                            </p>
                          )}
                          <div className="mt-3 text-sm text-muted-foreground">
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

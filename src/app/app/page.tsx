'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Button } from '@/components/Button'
import Link from 'next/link'

interface RecipeRequest {
  id: string
  type: string
  inputJson: any
  createdAt: string
  results: {
    id: string
    outputJson: any
    createdAt: string
  }[]
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [requests, setRequests] = useState<RecipeRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
      return
    }

    if (status === 'authenticated') {
      fetchRequests()
    }
  }, [status, router])

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/app/history')
      if (response.ok) {
        const data = await response.json()
        setRequests(data.requests)
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">Loading...</div>
        </main>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <p className="mt-2 text-gray-600">
          Your recent recipe requests and restaurant searches.
        </p>

        {requests.length === 0 ? (
          <div className="mt-8 rounded-lg bg-white p-8 text-center shadow-sm">
            <p className="text-gray-600">
              You haven't made any requests yet. Get started by{' '}
              <Link href="/start" className="text-blue-600 hover:text-blue-800">
                choosing what to have for dinner
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                        {request.type}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(request.createdAt).toLocaleDateString()}{' '}
                        {new Date(request.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="mt-4">
                      {request.type === 'orderout' && (
                        <div className="text-sm text-gray-600">
                          <p>
                            <strong>Zip Code:</strong>{' '}
                            {request.inputJson.zipCode}
                          </p>
                          {request.inputJson.mood && (
                            <p>
                              <strong>Mood:</strong> {request.inputJson.mood}
                            </p>
                          )}
                          {request.results.length > 0 && (
                            <p className="mt-2">
                              <strong>Found:</strong>{' '}
                              {request.results[0].outputJson?.length || 0}{' '}
                              restaurants
                            </p>
                          )}
                        </div>
                      )}
                      {(request.type === 'pantry' ||
                        request.type === 'grocery') && (
                        <div className="text-sm text-gray-600">
                          <p>
                            <strong>Ingredients:</strong>{' '}
                            {request.inputJson.ingredients?.join(', ')}
                          </p>
                          {request.results.length > 0 && (
                            <p className="mt-2">
                              <strong>Generated:</strong>{' '}
                              {request.results[0].outputJson?.length || 0}{' '}
                              recipes
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

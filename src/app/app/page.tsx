'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SiteHeader } from '@/components/SiteHeader'
import { Button } from '@/components/ui/button'
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

interface SavedRecipe {
  id: string
  title: string
  description?: string
  ingredients: string[]
  instructions: string[]
  prepTime?: number
  cookTime?: number
  servings?: number
  cuisine?: string
  difficulty?: string
  calories?: number
  protein?: number
  carbs?: number
  fat?: number
  createdAt: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [requests, setRequests] = useState<RecipeRequest[]>([])
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([])
  const [loading, setLoading] = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [deletingRecipeId, setDeletingRecipeId] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
      return
    }

    if (status === 'authenticated') {
      fetchData()
    }
  }, [status, router])

  const fetchData = async () => {
    try {
      const [historyRes, savedRes] = await Promise.all([
        fetch('/api/app/history'),
        fetch('/api/recipes/saved'),
      ])
      
      if (historyRes.ok) {
        const data = await historyRes.json()
        setRequests(data.requests)
      }
      
      if (savedRes.ok) {
        const data = await savedRes.json()
        setSavedRecipes(data.recipes)
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteSavedRecipe = async (recipeId: string) => {
    setDeletingRecipeId(recipeId)
    try {
      const response = await fetch(`/api/recipes/saved/${recipeId}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setSavedRecipes(prev => prev.filter(r => r.id !== recipeId))
      }
    } catch (error) {
      console.error('Failed to delete recipe:', error)
    } finally {
      setDeletingRecipeId(null)
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      setDeleteError('Please type DELETE to confirm')
      return
    }

    setIsDeleting(true)
    setDeleteError(null)

    try {
      const response = await fetch('/api/account/delete', {
        method: 'DELETE',
      })

      if (response.ok) {
        // Sign out and redirect to home
        await signOut({ callbackUrl: '/' })
      } else {
        const data = await response.json()
        setDeleteError(data.error || 'Failed to delete account')
      }
    } catch (error) {
      setDeleteError('Something went wrong. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
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
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="mt-2 text-muted-foreground">
          Your saved recipes and recent activity.
        </p>

        {/* Saved Recipes Section */}
        {savedRecipes.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-foreground">Saved Recipes</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="rounded-lg border border-border bg-card p-4 shadow-sm"
                >
                  <h3 className="font-medium text-foreground">{recipe.title}</h3>
                  {recipe.description && (
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {recipe.description}
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {recipe.prepTime && <span>Prep: {recipe.prepTime}m</span>}
                    {recipe.cookTime && <span>Cook: {recipe.cookTime}m</span>}
                    {recipe.servings && <span>Serves: {recipe.servings}</span>}
                    {recipe.cuisine && <span>{recipe.cuisine}</span>}
                  </div>
                  <div className="mt-4">
                    <details className="text-sm">
                      <summary className="cursor-pointer font-medium text-primary hover:text-primary/80">
                        View Recipe
                      </summary>
                      <div className="mt-2 space-y-2">
                        <div>
                          <strong className="text-foreground">Ingredients:</strong>
                          <ul className="ml-4 list-disc text-muted-foreground">
                            {recipe.ingredients.map((ing, idx) => (
                              <li key={idx}>{ing}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <strong className="text-foreground">Instructions:</strong>
                          <ol className="ml-4 list-decimal text-muted-foreground">
                            {recipe.instructions.map((step, idx) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ol>
                        </div>
                        {(recipe.calories || recipe.protein) && (
                          <div className="text-xs text-muted-foreground">
                            <strong className="text-foreground">Nutrition:</strong>{' '}
                            {recipe.calories && <span>{recipe.calories} cal</span>}
                            {recipe.protein && <span>, {recipe.protein}g protein</span>}
                            {recipe.carbs && <span>, {recipe.carbs}g carbs</span>}
                            {recipe.fat && <span>, {recipe.fat}g fat</span>}
                          </div>
                        )}
                      </div>
                    </details>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      Saved {new Date(recipe.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleDeleteSavedRecipe(recipe.id)}
                      disabled={deletingRecipeId === recipe.id}
                      className="text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                    >
                      {deletingRecipeId === recipe.id ? 'Removing...' : 'Remove'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
        </div>

        {requests.length === 0 ? (
          <div className="mt-8 rounded-lg bg-card p-8 text-center shadow-sm border border-border">
            <p className="text-muted-foreground">
              You haven&apos;t made any requests yet. Get started by{' '}
              <Link href="/start" className="text-primary hover:text-primary/80">
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
                className="rounded-lg border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        {request.type}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(request.createdAt).toLocaleDateString()}{' '}
                        {new Date(request.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="mt-4">
                      {request.type === 'orderout' && (
                        <div className="text-sm text-muted-foreground">
                          <p>
                            <strong className="text-foreground">Zip Code:</strong>{' '}
                            {request.inputJson.zipCode}
                          </p>
                          {request.inputJson.mood && (
                            <p>
                              <strong className="text-foreground">Mood:</strong> {request.inputJson.mood}
                            </p>
                          )}
                          {request.results.length > 0 && (
                            <p className="mt-2">
                              <strong className="text-foreground">Found:</strong>{' '}
                              {request.results[0].outputJson?.length || 0}{' '}
                              restaurants
                            </p>
                          )}
                        </div>
                      )}
                      {(request.type === 'pantry' ||
                        request.type === 'grocery') && (
                        <div className="text-sm text-muted-foreground">
                          <p>
                            <strong className="text-foreground">Ingredients:</strong>{' '}
                            {request.inputJson.ingredients?.join(', ')}
                          </p>
                          {request.results.length > 0 && (
                            <p className="mt-2">
                              <strong className="text-foreground">Generated:</strong>{' '}
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

        {/* Account Section - subtle at bottom */}
        <div className="mt-16 pt-8 border-t border-border">
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors"
            >
              Delete my account
            </button>
          ) : (
            <div className="max-w-sm space-y-3">
              <p className="text-xs text-muted-foreground">
                This will permanently delete your account and all data. Type <strong>DELETE</strong> to confirm.
              </p>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="Type DELETE"
                className="block w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-destructive focus:outline-none"
              />
              {deleteError && (
                <p className="text-xs text-destructive">{deleteError}</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting || deleteConfirmText !== 'DELETE'}
                  className="text-xs text-destructive hover:text-destructive/80 disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Confirm delete'}
                </button>
                <span className="text-xs text-muted-foreground">·</span>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false)
                    setDeleteConfirmText('')
                    setDeleteError(null)
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SiteHeader } from '@/components/SiteHeader'
import Link from 'next/link'

type Tab = 'recipes' | 'activity' | 'wheel' | 'account'

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

const TABS: { id: Tab; label: string }[] = [
  { id: 'recipes', label: 'Saved Recipes' },
  { id: 'activity', label: 'Recent Activity' },
  { id: 'wheel', label: 'Wheel Preferences' },
  { id: 'account', label: 'Account' },
]

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('recipes')
  const [requests, setRequests] = useState<RecipeRequest[]>([])
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([])
  const [wheelPlaces, setWheelPlaces] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  
  // Delete recipe state
  const [deletingRecipeId, setDeletingRecipeId] = useState<string | null>(null)
  
  // Wheel preferences state
  const [wheelLoading, setWheelLoading] = useState(false)
  const [wheelMessage, setWheelMessage] = useState<string | null>(null)
  
  // Account delete state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

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
      const [historyRes, savedRes, wheelRes] = await Promise.all([
        fetch('/api/app/history'),
        fetch('/api/recipes/saved'),
        fetch('/api/wheel/preferences'),
      ])
      
      if (historyRes.ok) {
        const data = await historyRes.json()
        setRequests(data.requests)
      }
      
      if (savedRes.ok) {
        const data = await savedRes.json()
        setSavedRecipes(data.recipes)
      }
      
      if (wheelRes.ok) {
        const data = await wheelRes.json()
        if (data.places) {
          setWheelPlaces(data.places)
        }
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

  const handleClearWheelPreferences = async () => {
    setWheelLoading(true)
    try {
      const response = await fetch('/api/wheel/preferences', {
        method: 'DELETE',
      })
      if (response.ok) {
        setWheelPlaces([])
        setWheelMessage('Preferences cleared!')
        setTimeout(() => setWheelMessage(null), 3000)
      }
    } catch (error) {
      console.error('Failed to clear wheel preferences:', error)
    } finally {
      setWheelLoading(false)
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
        <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">Loading...</div>
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
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Welcome back, {session.user?.name || 'there'}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-border">
          <nav className="flex gap-1 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {/* Saved Recipes Tab */}
          {activeTab === 'recipes' && (
            <div>
              {savedRecipes.length === 0 ? (
                <div className="rounded-lg bg-card p-8 text-center shadow-sm border border-border">
                  <p className="text-muted-foreground">
                    No saved recipes yet. Generate recipes and click Save to keep them here.
                  </p>
                  <Link
                    href="/cook/pantry"
                    className="mt-4 inline-block text-sm text-primary hover:text-primary/80"
                  >
                    Generate recipes →
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
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
              )}
            </div>
          )}

          {/* Recent Activity Tab */}
          {activeTab === 'activity' && (
            <div>
              {requests.length === 0 ? (
                <div className="rounded-lg bg-card p-8 text-center shadow-sm border border-border">
                  <p className="text-muted-foreground">
                    No activity yet. Start by{' '}
                    <Link href="/" className="text-primary hover:text-primary/80">
                      deciding what to have for dinner
                    </Link>
                    .
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {requests.map((request) => (
                    <div
                      key={request.id}
                      className="rounded-lg border border-border bg-card p-4 shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          {request.type}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(request.createdAt).toLocaleDateString()}{' '}
                          {new Date(request.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        {request.type === 'orderout' && (
                          <>
                            Searched for restaurants near {request.inputJson.zipCode}
                            {request.inputJson.mood && ` • ${request.inputJson.mood}`}
                          </>
                        )}
                        {(request.type === 'pantry' || request.type === 'grocery') && (
                          <>
                            Generated recipes with: {request.inputJson.ingredients?.slice(0, 3).join(', ')}
                            {request.inputJson.ingredients?.length > 3 && '...'}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Wheel Preferences Tab */}
          {activeTab === 'wheel' && (
            <div className="max-w-md">
              <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <h3 className="font-medium text-foreground">Spin the Wheel Preferences</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your saved dinner spots for the wheel.
                </p>
                
                {wheelPlaces.length === 0 ? (
                  <div className="mt-4 rounded-lg bg-muted/50 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      No saved places yet.
                    </p>
                    <Link
                      href="/wheel"
                      className="mt-2 inline-block text-sm text-primary hover:text-primary/80"
                    >
                      Go to Spin the Wheel →
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="mt-4 space-y-2">
                      {wheelPlaces.map((place, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2"
                        >
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                            {index + 1}
                          </span>
                          <span className="text-sm text-foreground">{place}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex gap-3">
                      <Link
                        href="/wheel"
                        className="text-sm text-primary hover:text-primary/80"
                      >
                        Edit places
                      </Link>
                      <span className="text-muted-foreground">·</span>
                      <button
                        onClick={handleClearWheelPreferences}
                        disabled={wheelLoading}
                        className="text-sm text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                      >
                        {wheelLoading ? 'Clearing...' : 'Clear all'}
                      </button>
                    </div>
                    
                    {wheelMessage && (
                      <p className="mt-3 text-sm text-primary">✓ {wheelMessage}</p>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Account Tab */}
          {activeTab === 'account' && (
            <div className="max-w-md space-y-6">
              {/* Profile Info */}
              <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <h3 className="font-medium text-foreground">Profile</h3>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span className="text-foreground">{session.user?.name || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="text-foreground">{session.user?.email || '—'}</span>
                  </div>
                </div>
              </div>
              
              {/* Sign Out */}
              <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <h3 className="font-medium text-foreground">Session</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Sign out of your account on this device.
                </p>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="mt-4 rounded-lg bg-muted px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/80 transition-colors"
                >
                  Sign Out
                </button>
              </div>
              
              {/* Delete Account */}
              <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <h3 className="font-medium text-foreground">Delete Account</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Permanently delete your account and all data.
                </p>
                
                {!showDeleteConfirm ? (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="mt-4 text-sm text-muted-foreground hover:text-destructive transition-colors"
                  >
                    Delete my account
                  </button>
                ) : (
                  <div className="mt-4 space-y-3">
                    <p className="text-xs text-muted-foreground">
                      Type <strong>DELETE</strong> to confirm.
                    </p>
                    <input
                      type="text"
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      placeholder="Type DELETE"
                      className="block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-destructive focus:outline-none"
                    />
                    {deleteError && (
                      <p className="text-xs text-destructive">{deleteError}</p>
                    )}
                    <div className="flex gap-3">
                      <button
                        onClick={handleDeleteAccount}
                        disabled={isDeleting || deleteConfirmText !== 'DELETE'}
                        className="rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors disabled:opacity-50"
                      >
                        {isDeleting ? 'Deleting...' : 'Delete Account'}
                      </button>
                      <button
                        onClick={() => {
                          setShowDeleteConfirm(false)
                          setDeleteConfirmText('')
                          setDeleteError(null)
                        }}
                        className="rounded-lg bg-muted px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/80 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

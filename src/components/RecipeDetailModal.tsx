'use client'

import { useEffect, useCallback } from 'react'
import { RecipeIdea } from '@/lib/seo/recipe-ideas'

interface RecipeDetailModalProps {
  recipe: RecipeIdea
  onClose: () => void
}

const methodLabels: Record<string, string> = {
  'stir-fry': 'Stir-Fry',
  'one-pan': 'One-Pan',
  'casserole': 'Casserole',
  'bowl': 'Bowl',
  'skillet': 'Skillet',
  'sheet-pan': 'Sheet Pan',
  'slow-cooker': 'Slow Cooker',
  'instant-pot': 'Instant Pot',
  'baked': 'Baked',
  'soup': 'Soup',
  'salad': 'Salad',
}

export function RecipeDetailModal({ recipe, onClose }: RecipeDetailModalProps) {
  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  // Body scroll lock + keyboard listener
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  const totalTime = recipe.prepTime && recipe.cookTime
    ? recipe.prepTime + recipe.cookTime
    : recipe.timeMinutes

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-[5vh] pb-[5vh]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={recipe.title}
    >
      <div className="relative w-full max-w-2xl rounded-xl bg-card shadow-2xl border border-border animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 rounded-t-xl border-b border-border bg-card px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-foreground leading-tight">
              {recipe.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {recipe.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Close recipe"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-6">
          {/* Meta badges */}
          <div className="flex flex-wrap gap-2">
            {recipe.prepTime != null && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Prep: {recipe.prepTime} min
              </span>
            )}
            {recipe.cookTime != null && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
                Cook: {recipe.cookTime} min
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
              Total: {totalTime} min
            </span>
            {recipe.servings != null && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Serves {recipe.servings}
              </span>
            )}
            {recipe.cuisine && (
              <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                {recipe.cuisine}
              </span>
            )}
            <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              {methodLabels[recipe.method] || recipe.method}
            </span>
            {recipe.difficulty === 'easy' && (
              <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 text-xs font-medium">
                Easy
              </span>
            )}
            {recipe.difficulty === 'medium' && (
              <span className="inline-flex items-center rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-3 py-1 text-xs font-medium">
                Medium
              </span>
            )}
          </div>

          {/* Nutrition */}
          {recipe.nutrition && (
            <div className="rounded-lg bg-muted/50 p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">Nutrition (per serving)</h3>
              <div className="grid grid-cols-4 gap-3 text-center">
                {recipe.nutrition.calories != null && (
                  <div>
                    <p className="text-lg font-bold text-foreground">{recipe.nutrition.calories}</p>
                    <p className="text-xs text-muted-foreground">Calories</p>
                  </div>
                )}
                {recipe.nutrition.protein != null && (
                  <div>
                    <p className="text-lg font-bold text-foreground">{recipe.nutrition.protein}g</p>
                    <p className="text-xs text-muted-foreground">Protein</p>
                  </div>
                )}
                {recipe.nutrition.carbs != null && (
                  <div>
                    <p className="text-lg font-bold text-foreground">{recipe.nutrition.carbs}g</p>
                    <p className="text-xs text-muted-foreground">Carbs</p>
                  </div>
                )}
                {recipe.nutrition.fat != null && (
                  <div>
                    <p className="text-lg font-bold text-foreground">{recipe.nutrition.fat}g</p>
                    <p className="text-xs text-muted-foreground">Fat</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Ingredients */}
          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <div>
              <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Ingredients
              </h3>
              <ul className="space-y-1.5">
                {recipe.ingredients.map((ingredient, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Instructions */}
          {recipe.instructions && recipe.instructions.length > 0 && (
            <div>
              <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Instructions
              </h3>
              <ol className="space-y-3">
                {recipe.instructions.map((step, idx) => (
                  <li key={idx} className="flex gap-3 text-sm">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {idx + 1}
                    </span>
                    <p className="text-muted-foreground leading-relaxed pt-0.5">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Recipe from Dinner Decision Maker
          </p>
          <button
            onClick={onClose}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

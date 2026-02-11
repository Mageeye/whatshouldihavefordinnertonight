'use client'

import { useState } from 'react'
import { RecipeIdea } from '@/lib/seo/recipe-ideas'
import { RecipeIdeaCard } from './RecipeIdeaCard'
import { RecipeDetailModal } from './RecipeDetailModal'

interface RecipeIdeasGridProps {
  title: string
  ideas: RecipeIdea[]
}

export function RecipeIdeasGrid({ title, ideas }: RecipeIdeasGridProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeIdea | null>(null)

  if (!ideas || ideas.length === 0) {
    return null
  }

  return (
    <>
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          {title}
        </h2>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {ideas.map((idea) => (
            <RecipeIdeaCard
              key={idea.title}
              idea={idea}
              onClick={() => setSelectedRecipe(idea)}
            />
          ))}
        </div>
      </section>

      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </>
  )
}

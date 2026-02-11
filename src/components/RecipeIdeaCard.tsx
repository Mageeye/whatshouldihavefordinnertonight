import { RecipeIdea, isFullRecipe } from '@/lib/seo/recipe-ideas'

interface RecipeIdeaCardProps {
  idea: RecipeIdea
  onClick?: () => void
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

export function RecipeIdeaCard({ idea, onClick }: RecipeIdeaCardProps) {
  const hasFullRecipe = isFullRecipe(idea)

  return (
    <button
      type="button"
      onClick={hasFullRecipe ? onClick : undefined}
      className={`rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md flex flex-col h-full text-left w-full ${
        hasFullRecipe ? 'cursor-pointer group' : ''
      }`}
      disabled={!hasFullRecipe}
    >
      <h3 className="font-semibold text-foreground text-sm leading-tight">
        {idea.title}
      </h3>
      <p className="mt-2 text-xs text-muted-foreground flex-grow line-clamp-2">
        {idea.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
          {idea.timeMinutes} min
        </span>
        <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs">
          {methodLabels[idea.method] || idea.method}
        </span>
        {idea.difficulty === 'easy' && (
          <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 text-xs">
            Easy
          </span>
        )}
      </div>
      {hasFullRecipe && (
        <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary opacity-70 group-hover:opacity-100 transition-opacity">
          <span>View full recipe</span>
          <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </button>
  )
}

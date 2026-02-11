import { RecipeIdea, isFullRecipe } from '@/lib/seo/recipe-ideas'

interface ItemListSchemaProps {
  name: string
  items: { name: string; description?: string }[]
}

// ItemList structured data for recipe idea lists
export function ItemListSchema({ name, items }: ItemListSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.description && { description: item.description }),
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Helper to create ItemList from RecipeIdeas
export function RecipeIdeasSchema({ title, ideas }: { title: string; ideas: RecipeIdea[] }) {
  if (!ideas || ideas.length === 0) {
    return null
  }

  return (
    <ItemListSchema
      name={title}
      items={ideas.map((idea) => ({
        name: idea.title,
        description: idea.description,
      }))}
    />
  )
}

// WebPage structured data for the page itself
interface WebPageSchemaProps {
  title: string
  description: string
  url: string
}

export function WebPageSchema({ title, description, url }: WebPageSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Dinner Decision Maker',
      url: 'https://www.dinnerdecisionmaker.com',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Convert minutes to ISO 8601 duration (e.g. 30 -> "PT30M")
function toIsoDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h > 0 && m > 0) return `PT${h}H${m}M`
  if (h > 0) return `PT${h}H`
  return `PT${m}M`
}

// Individual Recipe JSON-LD structured data for full recipes
// Outputs schema.org/Recipe for each recipe that has full data,
// which can trigger rich recipe snippets in search results.
export function RecipeSchemaList({ recipes, comboTitle }: { recipes: RecipeIdea[]; comboTitle: string }) {
  const fullRecipes = recipes.filter(isFullRecipe)
  if (fullRecipes.length === 0) return null

  return (
    <>
      {fullRecipes.map((recipe) => {
        const totalTime = (recipe.prepTime ?? 0) + (recipe.cookTime ?? 0) || recipe.timeMinutes

        const schema: Record<string, unknown> = {
          '@context': 'https://schema.org',
          '@type': 'Recipe',
          name: recipe.title,
          description: recipe.description,
          author: {
            '@type': 'Organization',
            name: 'Dinner Decision Maker',
          },
          totalTime: toIsoDuration(totalTime),
          ...(recipe.prepTime != null && { prepTime: toIsoDuration(recipe.prepTime) }),
          ...(recipe.cookTime != null && { cookTime: toIsoDuration(recipe.cookTime) }),
          ...(recipe.servings != null && { recipeYield: `${recipe.servings} servings` }),
          ...(recipe.cuisine && { recipeCuisine: recipe.cuisine }),
          recipeCategory: 'Dinner',
          recipeIngredient: recipe.ingredients,
          recipeInstructions: recipe.instructions!.map((step, idx) => ({
            '@type': 'HowToStep',
            position: idx + 1,
            text: step,
          })),
          ...(recipe.nutrition && {
            nutrition: {
              '@type': 'NutritionInformation',
              ...(recipe.nutrition.calories != null && { calories: `${recipe.nutrition.calories} calories` }),
              ...(recipe.nutrition.protein != null && { proteinContent: `${recipe.nutrition.protein} g` }),
              ...(recipe.nutrition.carbs != null && { carbohydrateContent: `${recipe.nutrition.carbs} g` }),
              ...(recipe.nutrition.fat != null && { fatContent: `${recipe.nutrition.fat} g` }),
            },
          }),
          keywords: comboTitle,
        }

        return (
          <script
            key={recipe.title}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )
      })}
    </>
  )
}

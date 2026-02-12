import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { RecipeBuilder } from '@/components/RecipeBuilder'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { RecipeIdeasGrid } from '@/components/RecipeIdeasGrid'
import { FAQSection } from '@/components/FAQSection'
import { RecipeIdeasSchema, RecipeSchemaList } from '@/components/StructuredData'
import { getRecipeIdeas, getFAQs, hasRecipeIdeas } from '@/lib/seo/recipe-ideas'
import {
  ingredients,
  getIngredientCombos,
  dietPages,
  appliancePages,
  timePages,
  getPageBySlug,
  getRelatedPages,
  getAllPSEOSlugs,
  dietSlugToOption,
  applianceSlugToOption,
  timeSlugToOption,
  getSuggestedIngredientsForDiet,
  getSuggestedIngredientsForAppliance,
  getSuggestedIngredientsForTime,
  type Ingredient,
  type IngredientCombo,
  type ConstraintPage,
} from '@/lib/seo/ingredients'

interface PageProps {
  params: { slug: string }
}

// Generate all static paths at build time
export async function generateStaticParams() {
  return getAllPSEOSlugs().map((slug) => ({ slug }))
}

// Generate metadata for each page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = getPageBySlug(params.slug)
  if (!page) return {}

  const baseUrl = 'https://www.dinnerdecisionmaker.com'
  let title = ''
  let description = ''
  let isIndexable = true // Default to indexable

  switch (page.type) {
    case 'ingredient':
      title = `${page.data.name} Recipes | Easy Dinner Ideas`
      description = `Discover easy ${page.data.name.toLowerCase()} dinner recipes. ${page.data.description} Generate personalized recipes in seconds.`
      isIndexable = true // All ingredient pages are indexable
      break
    case 'combo':
      title = `${page.data.title} | Easy Dinner Ideas`
      description = page.data.description + ' Get personalized recipe ideas in seconds.'
      // Use the indexable flag from data, default to false for combos without rich content
      isIndexable = page.data.indexable ?? false
      break
    case 'diet':
      title = page.data.metaTitle
      description = `${page.data.description} Browse our top-rated ${page.data.title.toLowerCase()} with full recipes, nutrition info, and smart ingredient swaps.`
      isIndexable = true
      break
    case 'appliance':
    case 'time':
      title = page.data.metaTitle
      description = page.data.description + ' Find your perfect dinner recipe.'
      isIndexable = true // Constraint pages are indexable
      break
  }

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/recipes/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/recipes/${params.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    // Smart indexing: only index pages with rich content
    robots: isIndexable 
      ? { index: true, follow: true }
      : { index: false, follow: true },
  }
}

// Internal link component
function InternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-block rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary/5"
    >
      {children}
    </Link>
  )
}

// Ingredient page component
function IngredientPage({ ingredient }: { ingredient: Ingredient }) {
  const relatedPages = getRelatedPages(ingredient.slug)
  const combos = getIngredientCombos().filter((c) => c.ingredients.includes(ingredient.slug))
  const recipeIdeas = getRecipeIdeas(ingredient.slug)
  const faqs = getFAQs(ingredient.slug)
  const hasIdeas = hasRecipeIdeas(ingredient.slug)
  
  // Get initial ingredients for the recipe builder
  const initialIngredients = [ingredient.name.toLowerCase()]
  
  // Get related ingredients for suggested adds (use contextual add-ins if available)
  const relatedIngredients = ingredient.commonAddIns || ingredients
    .filter((i) => i.slug !== ingredient.slug)
    .slice(0, 8)
    .map((i) => i.name.toLowerCase())

  // Build breadcrumbs
  const breadcrumbItems = [
    { name: 'Recipes', href: '/recipes' },
    { name: `${ingredient.name} Recipes`, href: `/recipes/${ingredient.slug}` },
  ]

  return (
    <div className="space-y-12">
      {/* Structured Data */}
      {hasIdeas && <RecipeIdeasSchema title={`${ingredient.name} Recipes`} ideas={recipeIdeas} />}
      {hasIdeas && <RecipeSchemaList recipes={recipeIdeas} comboTitle={`${ingredient.name} Recipes`} />}

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Hero section with extended intro */}
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {ingredient.name} Recipes
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          {ingredient.extendedIntro || `${ingredient.description} Discover delicious ${ingredient.name.toLowerCase()} dinner ideas, from quick weeknight meals to impressive dishes. Find the perfect recipe for what you have on hand.`}
        </p>
      </section>

      {/* Static Recipe Ideas - Satisfies search intent immediately */}
      {hasIdeas && (
        <RecipeIdeasGrid
          title={`Top ${ingredient.name} Dinner Ideas`}
          ideas={recipeIdeas}
        />
      )}

      {/* Flavor Directions - Contextual unique content */}
      {ingredient.flavorDirections && ingredient.flavorDirections.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Flavor Directions</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {ingredient.flavorDirections.map((direction) => (
              <div
                key={direction.name}
                className="rounded-lg border border-border bg-card p-4"
              >
                <h3 className="font-semibold text-foreground mb-2">{direction.name}</h3>
                <ul className="space-y-1">
                  {direction.suggestions.map((suggestion) => (
                    <li key={suggestion} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="text-primary">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Popular Add-Ins - Contextual unique content */}
      {ingredient.commonAddIns && ingredient.commonAddIns.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Popular Add-Ins</h2>
          <div className="flex flex-wrap gap-2">
            {ingredient.commonAddIns.map((addIn) => (
              <span
                key={addIn}
                className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-sm text-muted-foreground"
              >
                {addIn}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Substitutions - Contextual unique content */}
      {ingredient.substitutions && ingredient.substitutions.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Easy Substitutions</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {ingredient.substitutions.map((sub) => (
              <div
                key={sub.original}
                className="rounded-lg border border-border bg-card p-4"
              >
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Swap {sub.original}</span>
                  {' → '}
                  {sub.alternatives.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Popular combinations */}
      {combos.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Popular {ingredient.name} Combinations
          </h2>
          <p className="text-muted-foreground mb-4">
            See what pairs best with {ingredient.name.toLowerCase()} for quick, delicious meals.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {combos.map((combo) => (
              <Link
                key={combo.slug}
                href={`/recipes/${combo.slug}`}
                className="rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
              >
                <h3 className="font-medium text-foreground">{combo.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{combo.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recipe Generator - Now positioned after static content */}
      <section className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
        <h2 className="text-xl font-semibold text-foreground mb-2 text-center">
          Generate Your Perfect {ingredient.name} Recipe
        </h2>
        <p className="text-muted-foreground text-center mb-6">
          Add more ingredients and preferences to get personalized recipe ideas.
        </p>
        <RecipeBuilder 
          initialIngredients={initialIngredients}
          suggestedIngredients={relatedIngredients}
          compact
        />
      </section>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <FAQSection faqs={faqs} />
      )}

      {/* Related searches - internal links */}
      {relatedPages.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Related Recipe Ideas</h2>
          <div className="flex flex-wrap gap-3">
            {relatedPages.slice(0, 8).map((page) => (
              <InternalLink key={page.slug} href={`/recipes/${page.slug}`}>
                {page.title}
              </InternalLink>
            ))}
          </div>
        </section>
      )}

      {/* Browse by constraint - more relevant links */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Browse by Preference</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">By Diet</h3>
            <div className="flex flex-wrap gap-2">
              {dietPages.slice(0, 4).map((page) => (
                <InternalLink key={page.slug} href={`/recipes/${page.slug}`}>
                  {page.title}
                </InternalLink>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">By Time</h3>
            <div className="flex flex-wrap gap-2">
              {timePages.slice(0, 3).map((page) => (
                <InternalLink key={page.slug} href={`/recipes/${page.slug}`}>
                  {page.title}
                </InternalLink>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Combo page component
function ComboPage({ combo }: { combo: IngredientCombo }) {
  const relatedPages = getRelatedPages(combo.slug)
  const ingredientData = combo.ingredients
    .map((slug) => ingredients.find((i) => i.slug === slug))
    .filter(Boolean)
  
  // Get initial ingredients from the combo
  const initialIngredients = ingredientData.map((i) => i!.name.toLowerCase())
  
  // Get related ingredients for suggested adds (use contextual add-ins if available)
  const relatedIngredients = combo.commonAddIns || ingredients
    .filter((i) => !combo.ingredients.includes(i.slug))
    .slice(0, 8)
    .map((i) => i.name.toLowerCase())

  // Get recipe ideas and FAQs for this combo
  const recipeIdeas = getRecipeIdeas(combo.slug)
  const faqs = getFAQs(combo.slug)
  const hasIdeas = hasRecipeIdeas(combo.slug)

  // Build breadcrumbs
  const breadcrumbItems = [
    { name: 'Recipes', href: '/recipes' },
    { name: combo.title, href: `/recipes/${combo.slug}` },
  ]

  return (
    <div className="space-y-12">
      {/* Structured Data */}
      {hasIdeas && <RecipeIdeasSchema title={combo.title} ideas={recipeIdeas} />}
      {hasIdeas && <RecipeSchemaList recipes={recipeIdeas} comboTitle={combo.title} />}

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Hero section with extended intro */}
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {combo.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          {combo.extendedIntro || `${combo.description} Discover the best ways to combine these ingredients for a delicious dinner.`}
        </p>
      </section>

      {/* Static Recipe Ideas - PRIORITY A: Satisfies search intent immediately */}
      {hasIdeas && (
        <RecipeIdeasGrid
          title={`Top ${combo.title.replace(' Recipes', '')} Dinner Ideas`}
          ideas={recipeIdeas}
        />
      )}

      {/* Flavor Directions - PRIORITY B: Contextual unique content */}
      {combo.flavorDirections && combo.flavorDirections.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Flavor Directions</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {combo.flavorDirections.map((direction) => (
              <div
                key={direction.name}
                className="rounded-lg border border-border bg-card p-4"
              >
                <h3 className="font-semibold text-foreground mb-2">{direction.name}</h3>
                <ul className="space-y-1">
                  {direction.suggestions.map((suggestion) => (
                    <li key={suggestion} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="text-primary">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Common Add-Ins - PRIORITY B: Contextual unique content */}
      {combo.commonAddIns && combo.commonAddIns.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Popular Add-Ins</h2>
          <div className="flex flex-wrap gap-2">
            {combo.commonAddIns.map((addIn) => (
              <span
                key={addIn}
                className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-sm text-muted-foreground"
              >
                {addIn}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Substitutions - PRIORITY B: Contextual unique content */}
      {combo.substitutions && combo.substitutions.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Easy Substitutions</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {combo.substitutions.map((sub) => (
              <div
                key={sub.original}
                className="rounded-lg border border-border bg-card p-4"
              >
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Swap {sub.original}</span>
                  {' → '}
                  {sub.alternatives.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recipe Generator - Now positioned after static content */}
      <section className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
        <h2 className="text-xl font-semibold text-foreground mb-2 text-center">
          Generate Your Perfect Recipe
        </h2>
        <p className="text-muted-foreground text-center mb-6">
          Customize your {combo.title.toLowerCase().replace(' recipes', '')} with our AI-powered recipe generator.
        </p>
        <RecipeBuilder 
          initialIngredients={initialIngredients}
          suggestedIngredients={relatedIngredients}
          compact
        />
      </section>

      {/* FAQs - PRIORITY C: Structured data */}
      {faqs.length > 0 && (
        <FAQSection faqs={faqs} />
      )}

      {/* Individual ingredient pages */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Explore Each Ingredient
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {ingredientData.map((ing) => ing && (
            <Link
              key={ing.slug}
              href={`/recipes/${ing.slug}`}
              className="rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
            >
              <h3 className="font-medium text-foreground">More {ing.name} Recipes</h3>
              <p className="mt-1 text-sm text-muted-foreground">{ing.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Related combos - Limited to most relevant */}
      {relatedPages.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Related Recipes</h2>
          <div className="flex flex-wrap gap-3">
            {relatedPages.slice(0, 8).map((page) => (
              <InternalLink key={page.slug} href={`/recipes/${page.slug}`}>
                {page.title}
              </InternalLink>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

// Diet constraint page component
function DietPage({ page }: { page: ConstraintPage }) {
  const relatedPages = getRelatedPages(page.slug)
  const dietOption = dietSlugToOption[page.slug]
  const suggestedIngredients = getSuggestedIngredientsForDiet(page.slug)
  const recipeIdeas = getRecipeIdeas(page.slug)
  const faqs = getFAQs(page.slug)
  const hasIdeas = hasRecipeIdeas(page.slug)

  // Build breadcrumbs
  const breadcrumbItems = [
    { name: 'Recipes', href: '/recipes' },
    { name: page.title, href: `/recipes/${page.slug}` },
  ]

  return (
    <div className="space-y-12">
      {/* Structured Data */}
      {hasIdeas && <RecipeIdeasSchema title={page.title} ideas={recipeIdeas} />}
      {hasIdeas && <RecipeSchemaList recipes={recipeIdeas} comboTitle={page.title} />}

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Hero section with extended intro */}
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          {page.extendedIntro || `${page.description} Generate personalized ${page.title.toLowerCase()} with our AI-powered tool below.`}
        </p>
      </section>

      {/* Static Recipe Ideas - Satisfies search intent immediately */}
      {hasIdeas && (
        <RecipeIdeasGrid
          title={`Top ${page.title}`}
          ideas={recipeIdeas}
        />
      )}

      {/* Flavor Directions - Contextual unique content */}
      {page.flavorDirections && page.flavorDirections.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Flavor Directions</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {page.flavorDirections.map((direction) => (
              <div
                key={direction.name}
                className="rounded-lg border border-border bg-card p-4"
              >
                <h3 className="font-semibold text-foreground mb-2">{direction.name}</h3>
                <ul className="space-y-1">
                  {direction.suggestions.map((suggestion) => (
                    <li key={suggestion} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="text-primary">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Popular Add-Ins - Contextual unique content */}
      {page.commonAddIns && page.commonAddIns.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Popular Ingredients</h2>
          <div className="flex flex-wrap gap-2">
            {page.commonAddIns.map((addIn) => (
              <span
                key={addIn}
                className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-sm text-muted-foreground"
              >
                {addIn}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Substitutions - Contextual unique content */}
      {page.substitutions && page.substitutions.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Smart Swaps</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {page.substitutions.map((sub) => (
              <div
                key={sub.original}
                className="rounded-lg border border-border bg-card p-4"
              >
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Swap {sub.original}</span>
                  {' → '}
                  {sub.alternatives.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recipe Generator - Now positioned after static content */}
      <section className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
        <h2 className="text-xl font-semibold text-foreground mb-2 text-center">
          Generate Your Perfect {page.title.replace(' Ideas', '').replace(' Meals', ' Meal').replace(' Dinners', ' Dinner')} Recipe
        </h2>
        <p className="text-muted-foreground text-center mb-6">
          Add your favorite ingredients and preferences to get personalized {page.title.toLowerCase()}.
        </p>
        <RecipeBuilder 
          initialDietaryRequirements={dietOption ? [dietOption] : []}
          suggestedIngredients={suggestedIngredients}
          compact
        />
      </section>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <FAQSection faqs={faqs} />
      )}

      {/* Popular ingredients for this diet */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Explore by Ingredient
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ingredients.slice(0, 8).map((ing) => (
            <Link
              key={ing.slug}
              href={`/recipes/${ing.slug}`}
              className="rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md text-center"
            >
              <h3 className="font-medium text-foreground">{ing.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Related categories */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Related Categories</h2>
        <div className="flex flex-wrap gap-3">
          {relatedPages.map((p) => (
            <InternalLink key={p.slug} href={`/recipes/${p.slug}`}>
              {p.title}
            </InternalLink>
          ))}
          {appliancePages.slice(0, 3).map((p) => (
            <InternalLink key={p.slug} href={`/recipes/${p.slug}`}>
              {p.title}
            </InternalLink>
          ))}
        </div>
      </section>
    </div>
  )
}

// Appliance constraint page component
function AppliancePage({ page }: { page: ConstraintPage }) {
  const relatedPages = getRelatedPages(page.slug)
  const applianceOption = applianceSlugToOption[page.slug]
  const suggestedIngredients = getSuggestedIngredientsForAppliance(page.slug)

  return (
    <div className="space-y-12">
      {/* Hero section */}
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {page.description} Generate personalized {page.title.toLowerCase()} with our AI-powered tool below.
        </p>
      </section>

      {/* Embedded Recipe Builder with appliance pre-selected */}
      <section>
        <RecipeBuilder 
          initialAppliances={applianceOption ? [applianceOption] : []}
          suggestedIngredients={suggestedIngredients}
          compact
        />
      </section>

      {/* Popular ingredients for this cooking method */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Popular Ingredients for {page.title}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ingredients.slice(0, 8).map((ing) => (
            <Link
              key={ing.slug}
              href={`/recipes/${ing.slug}`}
              className="rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md text-center"
            >
              <h3 className="font-medium text-foreground">{ing.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Related categories */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Related Categories</h2>
        <div className="flex flex-wrap gap-3">
          {relatedPages.map((p) => (
            <InternalLink key={p.slug} href={`/recipes/${p.slug}`}>
              {p.title}
            </InternalLink>
          ))}
          {dietPages.slice(0, 3).map((p) => (
            <InternalLink key={p.slug} href={`/recipes/${p.slug}`}>
              {p.title}
            </InternalLink>
          ))}
        </div>
      </section>
    </div>
  )
}

// Time constraint page component
function TimePage({ page }: { page: ConstraintPage }) {
  const relatedPages = getRelatedPages(page.slug)
  const timeOption = timeSlugToOption[page.slug]
  const suggestedIngredients = getSuggestedIngredientsForTime(page.slug)

  return (
    <div className="space-y-12">
      {/* Hero section */}
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {page.description} Generate personalized quick recipes with our AI-powered tool below.
        </p>
      </section>

      {/* Embedded Recipe Builder with time pre-selected */}
      <section>
        <RecipeBuilder 
          initialTimeAvailable={timeOption || ''}
          suggestedIngredients={suggestedIngredients}
          compact
        />
      </section>

      {/* Popular quick ingredients */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Popular Quick-Cook Ingredients
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ingredients.slice(0, 8).map((ing) => (
            <Link
              key={ing.slug}
              href={`/recipes/${ing.slug}`}
              className="rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md text-center"
            >
              <h3 className="font-medium text-foreground">{ing.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Related categories */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Related Categories</h2>
        <div className="flex flex-wrap gap-3">
          {relatedPages.map((p) => (
            <InternalLink key={p.slug} href={`/recipes/${p.slug}`}>
              {p.title}
            </InternalLink>
          ))}
          {appliancePages.slice(0, 3).map((p) => (
            <InternalLink key={p.slug} href={`/recipes/${p.slug}`}>
              {p.title}
            </InternalLink>
          ))}
        </div>
      </section>
    </div>
  )
}

export default function RecipeSlugPage({ params }: PageProps) {
  const page = getPageBySlug(params.slug)

  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 md:px-6">
        <Link
          href="/recipes"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          ← Back to Recipe Directory
        </Link>

        {page.type === 'ingredient' && <IngredientPage ingredient={page.data} />}
        {page.type === 'combo' && <ComboPage combo={page.data} />}
        {page.type === 'diet' && <DietPage page={page.data} />}
        {page.type === 'appliance' && <AppliancePage page={page.data} />}
        {page.type === 'time' && <TimePage page={page.data} />}
      </main>

      {/* Content freshness signal */}
      <div className="mx-auto max-w-5xl px-4 md:px-6 mt-12">
        <p className="text-xs text-muted-foreground/60 text-center">
          Last updated February 2026
        </p>
      </div>

      {/* Footer with more internal links */}
      <footer className="border-t border-border bg-muted/30 py-12 mt-16">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-semibold text-foreground mb-3">By Ingredient</h3>
              <div className="space-y-2">
                {ingredients.slice(0, 6).map((ing) => (
                  <Link
                    key={ing.slug}
                    href={`/recipes/${ing.slug}`}
                    className="block text-sm text-muted-foreground hover:text-foreground"
                  >
                    {ing.name} Recipes
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">By Diet</h3>
              <div className="space-y-2">
                {dietPages.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/recipes/${p.slug}`}
                    className="block text-sm text-muted-foreground hover:text-foreground"
                  >
                    {p.title}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">By Time</h3>
              <div className="space-y-2">
                {timePages.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/recipes/${p.slug}`}
                    className="block text-sm text-muted-foreground hover:text-foreground"
                  >
                    {p.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border flex justify-between text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

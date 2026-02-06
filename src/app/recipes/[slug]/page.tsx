import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { RecipeBuilder } from '@/components/RecipeBuilder'
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

  switch (page.type) {
    case 'ingredient':
      title = `${page.data.name} Recipes | Easy Dinner Ideas`
      description = `Discover easy ${page.data.name.toLowerCase()} dinner recipes. ${page.data.description} Generate personalized recipes in seconds.`
      break
    case 'combo':
      title = `${page.data.title} | Easy Dinner Ideas`
      description = page.data.description + ' Get personalized recipe ideas in seconds.'
      break
    case 'diet':
    case 'appliance':
    case 'time':
      title = page.data.metaTitle
      description = page.data.description + ' Find your perfect dinner recipe.'
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
  
  // Get related ingredients for suggested adds
  const relatedIngredients = ingredients
    .filter((i) => i.slug !== ingredient.slug)
    .slice(0, 8)
    .map((i) => i.name.toLowerCase())

  return (
    <div className="space-y-12">
      {/* Hero section */}
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {ingredient.name} Recipes
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {ingredient.description} Generate the perfect {ingredient.name.toLowerCase()} dinner 
          idea using our AI-powered recipe generator below.
        </p>
      </section>

      {/* Embedded Recipe Builder */}
      <section>
        <RecipeBuilder 
          type="pantry"
          initialIngredients={[ingredient.name.toLowerCase()]}
          suggestedIngredients={relatedIngredients}
          compact
        />
      </section>

      {/* Popular combinations */}
      {combos.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Popular {ingredient.name} Combinations
          </h2>
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

      {/* Related searches - internal links */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Related Recipe Ideas</h2>
        <div className="flex flex-wrap gap-3">
          {relatedPages.map((page) => (
            <InternalLink key={page.slug} href={`/recipes/${page.slug}`}>
              {page.title}
            </InternalLink>
          ))}
          <InternalLink href="/recipes/20-minute-meals">Quick Meals</InternalLink>
          <InternalLink href="/recipes/one-pot-meals">One Pot Meals</InternalLink>
        </div>
      </section>

      {/* Browse by diet */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Browse by Diet</h2>
        <div className="flex flex-wrap gap-3">
          {dietPages.slice(0, 4).map((page) => (
            <InternalLink key={page.slug} href={`/recipes/${page.slug}`}>
              {page.title}
            </InternalLink>
          ))}
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
  
  // Get related ingredients for suggested adds
  const relatedIngredients = ingredients
    .filter((i) => !combo.ingredients.includes(i.slug))
    .slice(0, 8)
    .map((i) => i.name.toLowerCase())

  return (
    <div className="space-y-12">
      {/* Hero section */}
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {combo.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {combo.description} Use our AI recipe generator below to create the perfect meal.
        </p>
      </section>

      {/* Embedded Recipe Builder */}
      <section>
        <RecipeBuilder 
          type="pantry"
          initialIngredients={initialIngredients}
          suggestedIngredients={relatedIngredients}
          compact
        />
      </section>

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

      {/* Related combos */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Similar Recipes</h2>
        <div className="flex flex-wrap gap-3">
          {relatedPages.map((page) => (
            <InternalLink key={page.slug} href={`/recipes/${page.slug}`}>
              {page.title}
            </InternalLink>
          ))}
        </div>
      </section>

      {/* Quick constraints */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Filters</h2>
        <div className="flex flex-wrap gap-3">
          {timePages.map((page) => (
            <InternalLink key={page.slug} href={`/recipes/${page.slug}`}>
              {page.title}
            </InternalLink>
          ))}
        </div>
      </section>
    </div>
  )
}

// Diet constraint page component
function DietPage({ page }: { page: ConstraintPage }) {
  const relatedPages = getRelatedPages(page.slug)
  const dietOption = dietSlugToOption[page.slug]
  const suggestedIngredients = getSuggestedIngredientsForDiet(page.slug)

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

      {/* Embedded Recipe Builder with diet pre-selected */}
      <section>
        <RecipeBuilder 
          type="pantry"
          initialDietaryRequirements={dietOption ? [dietOption] : []}
          suggestedIngredients={suggestedIngredients}
          compact
        />
      </section>

      {/* Popular ingredients for this diet */}
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
          type="pantry"
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
          type="pantry"
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

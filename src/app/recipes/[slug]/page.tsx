import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { PageShell } from '@/components/PageShell'
import {
  ingredients,
  getIngredientCombos,
  dietPages,
  appliancePages,
  timePages,
  getPageBySlug,
  getRelatedPages,
  getAllPSEOSlugs,
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

  return (
    <div className="space-y-12">
      {/* Hero section */}
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {ingredient.name} Recipes
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {ingredient.description} Find the perfect {ingredient.name.toLowerCase()} dinner 
          idea for tonight using our AI-powered recipe generator.
        </p>
      </section>

      {/* CTA to generator */}
      <section className="rounded-xl border border-border bg-card p-8 text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Have {ingredient.name}? Generate a Recipe Now
        </h2>
        <p className="text-muted-foreground mb-6">
          Tell us what else you have in your pantry, and we&apos;ll create a personalized 
          {ingredient.name.toLowerCase()} recipe in seconds.
        </p>
        <Link
          href={`/cook/pantry?ingredient=${encodeURIComponent(ingredient.name)}`}
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
        >
          Generate {ingredient.name} Recipes →
        </Link>
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
          {/* Constraint links */}
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

  return (
    <div className="space-y-12">
      {/* Hero section */}
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {combo.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {combo.description} Use our AI recipe generator to create the perfect meal 
          with these ingredients.
        </p>
      </section>

      {/* CTA to generator */}
      <section className="rounded-xl border border-border bg-card p-8 text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Generate a Recipe Now
        </h2>
        <p className="text-muted-foreground mb-6">
          We&apos;ll create a personalized recipe using {combo.ingredients.map((slug) => {
            const ing = ingredients.find((i) => i.slug === slug)
            return ing?.name.toLowerCase()
          }).join(' and ')}.
        </p>
        <Link
          href={`/cook/pantry?ingredients=${combo.ingredients.map((slug) => {
            const ing = ingredients.find((i) => i.slug === slug)
            return encodeURIComponent(ing?.name || '')
          }).join(',')}`}
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
        >
          Generate Recipe →
        </Link>
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

// Constraint page component (diet, appliance, time)
function ConstraintPage({ page, type }: { page: ConstraintPage; type: 'diet' | 'appliance' | 'time' }) {
  const relatedPages = getRelatedPages(page.slug)

  // Get relevant ingredients for this constraint
  const relevantIngredients = type === 'diet' && page.slug.includes('keto')
    ? ingredients.filter((i) => i.category === 'protein')
    : type === 'diet' && page.slug.includes('vegetarian')
    ? ingredients.filter((i) => i.category !== 'protein' || i.slug === 'eggs')
    : ingredients.slice(0, 8)

  return (
    <div className="space-y-12">
      {/* Hero section */}
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {page.description} Get personalized recipe ideas tailored to your preferences.
        </p>
      </section>

      {/* CTA to generator */}
      <section className="rounded-xl border border-border bg-card p-8 text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Generate {page.title} Now
        </h2>
        <p className="text-muted-foreground mb-6">
          Tell us what ingredients you have, and we&apos;ll create the perfect 
          {page.slug.includes('minute') ? ' quick' : ''} recipe for you.
        </p>
        <Link
          href="/cook/pantry"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
        >
          Start Generating →
        </Link>
      </section>

      {/* Popular ingredients */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Popular Ingredients for {page.title}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {relevantIngredients.map((ing) => (
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

      {/* Related constraints */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Related Categories</h2>
        <div className="flex flex-wrap gap-3">
          {relatedPages.map((p) => (
            <InternalLink key={p.slug} href={`/recipes/${p.slug}`}>
              {p.title}
            </InternalLink>
          ))}
          {type !== 'appliance' && appliancePages.slice(0, 3).map((p) => (
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
      <main className="mx-auto max-w-5xl px-4 py-12 md:px-6">
        <Link
          href="/recipes"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          ← Back to Recipe Directory
        </Link>

        {page.type === 'ingredient' && <IngredientPage ingredient={page.data} />}
        {page.type === 'combo' && <ComboPage combo={page.data} />}
        {(page.type === 'diet' || page.type === 'appliance' || page.type === 'time') && (
          <ConstraintPage page={page.data} type={page.type} />
        )}
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

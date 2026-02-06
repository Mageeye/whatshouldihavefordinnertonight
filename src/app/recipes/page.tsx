import { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { PageShell } from '@/components/PageShell'
import {
  ingredients,
  getIngredientCombos,
  dietPages,
  appliancePages,
  timePages,
} from '@/lib/seo/ingredients'

export const metadata: Metadata = {
  title: 'Recipe Directory | Find Dinner Ideas by Ingredient',
  description:
    'Browse dinner recipes by ingredient, diet, cooking method, or time. Find the perfect recipe for what you have in your pantry.',
  alternates: {
    canonical: 'https://www.dinnerdecisionmaker.com/recipes',
  },
}

export default function RecipesPage() {
  const combos = getIngredientCombos()
  const proteins = ingredients.filter((i) => i.category === 'protein')
  const carbs = ingredients.filter((i) => i.category === 'carb')
  const pantryItems = ingredients.filter((i) => i.category === 'pantry' || i.category === 'vegetable')

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageShell
        title="Recipe Directory"
        description="Find dinner ideas by ingredient, diet, or cooking style"
      >
        {/* Hero CTA */}
        <section className="rounded-xl border border-border bg-card p-8 text-center mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Not Sure What to Make?
          </h2>
          <p className="text-muted-foreground mb-6">
            Tell us what ingredients you have, and we&apos;ll generate personalized recipes
            in seconds.
          </p>
          <Link
            href="/cook/pantry"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
          >
            Generate Recipes →
          </Link>
        </section>

        {/* Browse by Protein */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">Browse by Protein</h2>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {proteins.map((ing) => (
              <Link
                key={ing.slug}
                href={`/recipes/${ing.slug}`}
                className="rounded-lg border border-border bg-card p-4 text-center transition-all hover:border-primary/50 hover:shadow-md"
              >
                <span className="font-medium text-foreground text-sm">{ing.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Browse by Carb/Base */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">Browse by Base</h2>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {carbs.map((ing) => (
              <Link
                key={ing.slug}
                href={`/recipes/${ing.slug}`}
                className="rounded-lg border border-border bg-card p-4 text-center transition-all hover:border-primary/50 hover:shadow-md"
              >
                <span className="font-medium text-foreground text-sm">{ing.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Combinations */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">Popular Combinations</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {combos.slice(0, 9).map((combo) => (
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
          {combos.length > 9 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {combos.slice(9).map((combo) => (
                <Link
                  key={combo.slug}
                  href={`/recipes/${combo.slug}`}
                  className="inline-block rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors hover:border-primary hover:bg-primary/5"
                >
                  {combo.title}
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Browse by Diet */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">Browse by Diet</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dietPages.map((page) => (
              <Link
                key={page.slug}
                href={`/recipes/${page.slug}`}
                className="rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
              >
                <h3 className="font-medium text-foreground">{page.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{page.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Browse by Cooking Method */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">Browse by Cooking Method</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {appliancePages.map((page) => (
              <Link
                key={page.slug}
                href={`/recipes/${page.slug}`}
                className="rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
              >
                <h3 className="font-medium text-foreground">{page.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{page.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Browse by Time */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">Browse by Time</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {timePages.map((page) => (
              <Link
                key={page.slug}
                href={`/recipes/${page.slug}`}
                className="rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
              >
                <h3 className="font-medium text-foreground">{page.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{page.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Pantry Staples */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">Pantry Staples</h2>
          <div className="flex flex-wrap gap-3">
            {pantryItems.map((ing) => (
              <Link
                key={ing.slug}
                href={`/recipes/${ing.slug}`}
                className="inline-block rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors hover:border-primary hover:bg-primary/5"
              >
                {ing.name} Recipes
              </Link>
            ))}
          </div>
        </section>
      </PageShell>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8 mt-8">
        <div className="mx-auto max-w-5xl px-4 md:px-6 flex justify-between text-sm text-muted-foreground">
          <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
        </div>
      </footer>
    </div>
  )
}

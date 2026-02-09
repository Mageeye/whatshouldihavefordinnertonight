import Link from 'next/link'
import Image from 'next/image'
import { SiteHeader } from '@/components/SiteHeader'
import { RecipeBuilder } from '@/components/RecipeBuilder'
import { SignInCallout } from '@/components/SignInCallout'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <Image
              src="/logo/logo.webp"
              alt="Dinner Decision Maker logo"
              width={140}
              height={140}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Dinner, decided.<br />
            In under 60 seconds.
          </h1>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Cook with what you have, pick the perfect takeout, or spin the wheel—fast, personalized, zero overthinking.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            No signup required • Mobile-friendly • Diet-aware
          </p>

          {/* Choice Cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Cook Card */}
            <Link
              href="/cook"
              className="group rounded-xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div className="text-4xl mb-3">👨‍🍳</div>
              <h2 className="text-lg font-medium text-foreground">
                Cook something
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Use pantry ingredients or build a quick grocery plan.
              </p>
              <div className="mt-4">
                <span className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors group-hover:bg-primary/90">
                  Cook
                </span>
              </div>
            </Link>

            {/* Order Out Card */}
            <Link
              href="/orderout"
              className="group rounded-xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div className="text-4xl mb-3">🍽️</div>
              <h2 className="text-lg font-medium text-foreground">
                Order out
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Get a short list that matches your mood + diet near you.
              </p>
              <div className="mt-4">
                <span className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors group-hover:bg-primary/90">
                  Order Out
                </span>
              </div>
            </Link>

            {/* Spin the Wheel Card */}
            <Link
              href="/wheel"
              className="group rounded-xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:col-span-2 lg:col-span-1"
            >
              <div className="text-4xl mb-3">🎡</div>
              <h2 className="text-lg font-medium text-foreground">
                Spin the Wheel
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Drop in 4–10 favorite places and let randomness choose dinner for you.
              </p>
              <div className="mt-4">
                <span className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors group-hover:bg-primary/90">
                  Spin
                </span>
              </div>
            </Link>
          </div>

          {/* Sign In Callout */}
          <div className="mt-10">
            <SignInCallout />
          </div>

          {/* Recipe Generator - Embedded */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Generate Recipes Instantly
            </h2>
            <p className="text-muted-foreground mb-6">
              Enter what you have, get personalized dinner ideas in seconds.
            </p>
            <RecipeBuilder compact />
          </div>

          {/* Popular Recipe Ideas - SEO Links */}
          <div className="mt-16 text-left">
            <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
              Popular Recipe Ideas
            </h2>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* By Ingredient */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  By Ingredient
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/recipes/chicken-breast" className="text-foreground hover:text-primary transition-colors">
                      Chicken Breast Recipes
                    </Link>
                  </li>
                  <li>
                    <Link href="/recipes/ground-beef" className="text-foreground hover:text-primary transition-colors">
                      Ground Beef Recipes
                    </Link>
                  </li>
                  <li>
                    <Link href="/recipes/eggs" className="text-foreground hover:text-primary transition-colors">
                      Egg Recipes
                    </Link>
                  </li>
                  <li>
                    <Link href="/recipes/pasta" className="text-foreground hover:text-primary transition-colors">
                      Pasta Recipes
                    </Link>
                  </li>
                  <li>
                    <Link href="/recipes/rice" className="text-foreground hover:text-primary transition-colors">
                      Rice Recipes
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Popular Combos */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Popular Combos
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/recipes/chicken-breast-rice" className="text-foreground hover:text-primary transition-colors">
                      Chicken and Rice
                    </Link>
                  </li>
                  <li>
                    <Link href="/recipes/chicken-breast-broccoli" className="text-foreground hover:text-primary transition-colors">
                      Chicken and Broccoli
                    </Link>
                  </li>
                  <li>
                    <Link href="/recipes/ground-beef-potatoes" className="text-foreground hover:text-primary transition-colors">
                      Ground Beef and Potatoes
                    </Link>
                  </li>
                  <li>
                    <Link href="/recipes/chicken-breast-pasta" className="text-foreground hover:text-primary transition-colors">
                      Chicken Pasta
                    </Link>
                  </li>
                  <li>
                    <Link href="/recipes/sausage-pasta" className="text-foreground hover:text-primary transition-colors">
                      Sausage Pasta
                    </Link>
                  </li>
                </ul>
              </div>

              {/* By Constraint */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Quick & Easy
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/recipes/15-minute-meals" className="text-foreground hover:text-primary transition-colors">
                      15-Minute Meals
                    </Link>
                  </li>
                  <li>
                    <Link href="/recipes/30-minute-dinners" className="text-foreground hover:text-primary transition-colors">
                      30-Minute Dinners
                    </Link>
                  </li>
                  <li>
                    <Link href="/recipes/air-fryer-recipes" className="text-foreground hover:text-primary transition-colors">
                      Air Fryer Recipes
                    </Link>
                  </li>
                  <li>
                    <Link href="/recipes/keto-dinner-ideas" className="text-foreground hover:text-primary transition-colors">
                      Keto Dinner Ideas
                    </Link>
                  </li>
                  <li>
                    <Link href="/recipes/one-pot-meals" className="text-foreground hover:text-primary transition-colors">
                      One-Pot Meals
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link 
                href="/recipes" 
                className="text-sm text-primary hover:text-primary/80 font-medium"
              >
                Browse all recipe ideas →
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-8">
        <div className="mx-auto max-w-5xl px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex gap-6">
            <Link href="/recipes" className="hover:text-foreground">Recipes</Link>
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

import { MetadataRoute } from 'next'
import { ingredients, getIngredientCombos, dietPages, appliancePages, timePages } from '@/lib/seo/ingredients'

const BASE_URL = 'https://www.dinnerdecisionmaker.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Core pages (highest priority)
  const corePages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/cook`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/cook/pantry`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/cook/grocery`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/orderout`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/wheel`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/recipes`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // Ingredient hub pages (e.g., /recipes/chicken-breast)
  const ingredientPages: MetadataRoute.Sitemap = ingredients.map((ingredient) => ({
    url: `${BASE_URL}/recipes/${ingredient.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Combo pages (e.g., /recipes/chicken-breast-rice)
  const comboPages: MetadataRoute.Sitemap = getIngredientCombos().map((combo) => ({
    url: `${BASE_URL}/recipes/${combo.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Diet constraint pages (e.g., /recipes/keto-dinner-ideas)
  const dietConstraintPages: MetadataRoute.Sitemap = dietPages.map((page) => ({
    url: `${BASE_URL}/recipes/${page.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Appliance pages (e.g., /recipes/air-fryer-recipes)
  const applianceConstraintPages: MetadataRoute.Sitemap = appliancePages.map((page) => ({
    url: `${BASE_URL}/recipes/${page.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Time constraint pages (e.g., /recipes/20-minute-meals)
  const timeConstraintPages: MetadataRoute.Sitemap = timePages.map((page) => ({
    url: `${BASE_URL}/recipes/${page.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Legal pages
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  return [
    ...corePages,
    ...ingredientPages,
    ...comboPages,
    ...dietConstraintPages,
    ...applianceConstraintPages,
    ...timeConstraintPages,
    ...legalPages,
  ]
}

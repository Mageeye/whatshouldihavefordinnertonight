import { z } from 'zod'

export const PantryRecipeRequestSchema = z.object({
  ingredients: z.array(z.string()).min(1, 'At least one ingredient is required'),
  dietaryRequirements: z.array(z.string()).optional(),
  allergies: z.array(z.string()).optional(),
  mealType: z.string().optional(),
  timeAvailable: z.string().optional(),
  skillLevel: z.string().optional(),
  cuisine: z.string().optional(),
  appliances: z.array(z.string()).optional(),
  macroTargets: z
    .object({
      calories: z.number().optional(),
      protein: z.number().optional(),
      carbs: z.number().optional(),
      fat: z.number().optional(),
    })
    .optional(),
  servings: z.number().min(1).max(20).default(2),
  numberOfRecipes: z.number().min(1).max(10).default(3),
})

export const GroceryRecipeRequestSchema = PantryRecipeRequestSchema.extend({
  budget: z.number().positive().optional(),
  storePreference: z.string().optional(),
})

export const OrderOutRequestSchema = z.object({
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid zip code format'),
  mood: z.string().optional(),
  dietaryNeeds: z.array(z.string()).optional(),
  filters: z
    .object({
      priceRange: z.array(z.string()).optional(),
      cuisine: z.array(z.string()).optional(),
      rating: z.number().min(0).max(5).optional(),
    })
    .optional(),
})

export type PantryRecipeRequest = z.infer<typeof PantryRecipeRequestSchema>
export type GroceryRecipeRequest = z.infer<typeof GroceryRecipeRequestSchema>
export type OrderOutRequest = z.infer<typeof OrderOutRequestSchema>

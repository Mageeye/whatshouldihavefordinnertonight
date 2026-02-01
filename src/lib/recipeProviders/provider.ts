export interface Recipe {
  id: string
  title: string
  description: string
  ingredients: string[]
  instructions: string[]
  prepTime?: number
  cookTime?: number
  servings?: number
  cuisine?: string
  difficulty?: string
  nutrition?: {
    calories?: number
    protein?: number
    carbs?: number
    fat?: number
  }
}

export interface RecipeRequest {
  ingredients: string[]
  dietaryRequirements?: string[]
  allergies?: string[]
  mealType?: string
  timeAvailable?: string
  skillLevel?: string
  cuisine?: string
  appliances?: string[]
  macroTargets?: {
    calories?: number
    protein?: number
    carbs?: number
    fat?: number
  }
  servings?: number
  numberOfRecipes?: number
  budget?: number
  storePreference?: string
}

export interface RecipeProvider {
  generateRecipes(request: RecipeRequest): Promise<Recipe[]>
}

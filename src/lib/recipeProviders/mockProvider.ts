import { Recipe, RecipeProvider, RecipeRequest } from './provider'
import { OpenAIRecipeProvider } from './openaiProvider'

export class MockRecipeProvider implements RecipeProvider {
  async generateRecipes(request: RecipeRequest): Promise<Recipe[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const numRecipes = request.numberOfRecipes || 3
    const recipes: Recipe[] = []

    const mockRecipes = [
      {
        title: 'Quick Pasta Primavera',
        description: 'A fresh and colorful pasta dish with seasonal vegetables.',
        ingredients: ['pasta', 'olive oil', 'garlic', 'bell peppers', 'zucchini', 'cherry tomatoes'],
        instructions: [
          'Cook pasta according to package directions.',
          'Heat olive oil in a large pan.',
          'Add garlic and sauté until fragrant.',
          'Add vegetables and cook until tender.',
          'Toss with cooked pasta and serve.',
        ],
        prepTime: 10,
        cookTime: 20,
        servings: request.servings || 2,
        cuisine: 'Italian',
        difficulty: 'Easy',
        nutrition: {
          calories: 450,
          protein: 15,
          carbs: 65,
          fat: 12,
        },
      },
      {
        title: 'One-Pan Chicken and Vegetables',
        description: 'A simple, healthy meal with minimal cleanup.',
        ingredients: ['chicken breast', 'broccoli', 'carrots', 'potatoes', 'olive oil', 'herbs'],
        instructions: [
          'Preheat oven to 400°F.',
          'Cut vegetables into bite-sized pieces.',
          'Place chicken and vegetables on a baking sheet.',
          'Drizzle with olive oil and season with herbs.',
          'Bake for 25-30 minutes until chicken is cooked through.',
        ],
        prepTime: 15,
        cookTime: 30,
        servings: request.servings || 2,
        cuisine: 'American',
        difficulty: 'Easy',
        nutrition: {
          calories: 380,
          protein: 35,
          carbs: 30,
          fat: 14,
        },
      },
      {
        title: 'Stir-Fry with Rice',
        description: 'A quick and flavorful Asian-inspired dish.',
        ingredients: ['rice', 'soy sauce', 'vegetables', 'protein of choice', 'ginger', 'garlic'],
        instructions: [
          'Cook rice according to package directions.',
          'Heat a wok or large pan over high heat.',
          'Add protein and cook until done, then remove.',
          'Add vegetables and stir-fry until crisp-tender.',
          'Return protein to pan, add sauce, and serve over rice.',
        ],
        prepTime: 10,
        cookTime: 15,
        servings: request.servings || 2,
        cuisine: 'Asian',
        difficulty: 'Medium',
        nutrition: {
          calories: 420,
          protein: 20,
          carbs: 55,
          fat: 10,
        },
      },
    ]

    for (let i = 0; i < numRecipes && i < mockRecipes.length; i++) {
      recipes.push({
        id: `recipe-${i + 1}`,
        ...mockRecipes[i],
      })
    }

    return recipes
  }
}

export const getRecipeProvider = (): RecipeProvider => {
  const provider = process.env.RECIPE_PROVIDER || 'mock'
  
  switch (provider) {
    case 'openai':
      return new OpenAIRecipeProvider()
    case 'mock':
      return new MockRecipeProvider()
    default:
      return new MockRecipeProvider()
  }
}

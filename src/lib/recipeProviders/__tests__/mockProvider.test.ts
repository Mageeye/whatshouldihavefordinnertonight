import { describe, it, expect } from 'vitest'
import { MockRecipeProvider } from '../mockProvider'

describe('MockRecipeProvider', () => {
  it('should generate recipes', async () => {
    const provider = new MockRecipeProvider()
    const recipes = await provider.generateRecipes({
      ingredients: ['chicken', 'rice'],
      servings: 2,
      numberOfRecipes: 2,
    })

    expect(recipes).toBeDefined()
    expect(recipes.length).toBe(2)
    expect(recipes[0]).toHaveProperty('title')
    expect(recipes[0]).toHaveProperty('ingredients')
    expect(recipes[0]).toHaveProperty('instructions')
  })
})

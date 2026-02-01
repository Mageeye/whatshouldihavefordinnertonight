import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { getRecipeProvider } from '@/lib/recipeProviders/mockProvider'
import {
  PantryRecipeRequestSchema,
  GroceryRecipeRequestSchema,
} from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, ...requestData } = body

    // Validate based on type
    let validatedData
    if (type === 'grocery') {
      validatedData = GroceryRecipeRequestSchema.parse(requestData)
    } else {
      validatedData = PantryRecipeRequestSchema.parse(requestData)
    }

    // Generate recipes
    const provider = getRecipeProvider()
    const recipes = await provider.generateRecipes(validatedData)

    // Get session for saving to DB
    const session = await auth()
    const userId = session?.user?.id

    // Save to database if user is logged in
    if (userId) {
      const recipeRequest = await prisma.recipeRequest.create({
        data: {
          userId,
          type: type === 'grocery' ? 'grocery' : 'pantry',
          inputJson: validatedData,
        },
      })

      await prisma.recipeResult.create({
        data: {
          requestId: recipeRequest.id,
          outputJson: recipes,
        },
      })
    }

    return NextResponse.json({ recipes })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Error generating recipes:', error)
    return NextResponse.json(
      { error: 'Failed to generate recipes' },
      { status: 500 }
    )
  }
}

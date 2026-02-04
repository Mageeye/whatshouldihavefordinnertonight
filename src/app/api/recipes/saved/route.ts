import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

// Validation schema for saving a recipe
const SaveRecipeSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  prepTime: z.number().optional(),
  cookTime: z.number().optional(),
  servings: z.number().optional(),
  cuisine: z.string().optional(),
  difficulty: z.string().optional(),
  nutrition: z.object({
    calories: z.number().optional(),
    protein: z.number().optional(),
    carbs: z.number().optional(),
    fat: z.number().optional(),
  }).optional(),
})

// GET - List all saved recipes for the user
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const savedRecipes = await prisma.savedRecipe.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ recipes: savedRecipes })
  } catch (error) {
    console.error('Error loading saved recipes:', error)
    return NextResponse.json(
      { error: 'Failed to load saved recipes' },
      { status: 500 }
    )
  }
}

// POST - Save a recipe
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validated = SaveRecipeSchema.parse(body)

    const savedRecipe = await prisma.savedRecipe.create({
      data: {
        userId: session.user.id,
        title: validated.title,
        description: validated.description,
        ingredients: validated.ingredients,
        instructions: validated.instructions,
        prepTime: validated.prepTime,
        cookTime: validated.cookTime,
        servings: validated.servings,
        cuisine: validated.cuisine,
        difficulty: validated.difficulty,
        calories: validated.nutrition?.calories,
        protein: validated.nutrition?.protein,
        carbs: validated.nutrition?.carbs,
        fat: validated.nutrition?.fat,
      },
    })

    return NextResponse.json({ 
      success: true, 
      recipe: savedRecipe,
      message: 'Recipe saved!'
    })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Error saving recipe:', error)
    return NextResponse.json(
      { error: 'Failed to save recipe' },
      { status: 500 }
    )
  }
}

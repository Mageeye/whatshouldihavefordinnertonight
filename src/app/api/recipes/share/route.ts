import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { authOptions } from '@/lib/auth'
import { rateLimit } from '@/lib/rateLimit'

export const dynamic = 'force-dynamic'

const ShareRecipeSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  ingredients: z.array(z.string()).min(1).max(50),
  instructions: z.array(z.string()).min(1).max(50),
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

// POST - Create a shareable recipe link
export async function POST(request: Request) {
  try {
    // Rate limit: 10 shares per minute per IP
    const headersList = headers()
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'anonymous'
    const rateLimitResult = await rateLimit(`share:${ip}`, 10, 60000)
    if (!rateLimitResult.ok) {
      return NextResponse.json(
        { error: 'Too many share requests. Please wait a moment.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const validatedData = ShareRecipeSchema.parse(body)

    // Get user ID if logged in (optional)
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id || null

    // Create the shared recipe
    const sharedRecipe = await prisma.sharedRecipe.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        ingredients: validatedData.ingredients,
        instructions: validatedData.instructions,
        prepTime: validatedData.prepTime,
        cookTime: validatedData.cookTime,
        servings: validatedData.servings,
        cuisine: validatedData.cuisine,
        difficulty: validatedData.difficulty,
        calories: validatedData.nutrition?.calories,
        protein: validatedData.nutrition?.protein,
        carbs: validatedData.nutrition?.carbs,
        fat: validatedData.nutrition?.fat,
        createdBy: userId,
      },
    })

    const shareUrl = `${process.env.NEXTAUTH_URL || 'https://www.dinnerdecisionmaker.com'}/recipe/${sharedRecipe.id}`

    return NextResponse.json({
      id: sharedRecipe.id,
      url: shareUrl,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid recipe data', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Error sharing recipe:', error)
    return NextResponse.json(
      { error: 'Failed to share recipe' },
      { status: 500 }
    )
  }
}

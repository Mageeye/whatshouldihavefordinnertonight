import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { getRestaurantProvider } from '@/lib/restaurantProviders/mockProvider'
import { OrderOutRequestSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = OrderOutRequestSchema.parse(body)

    // Search restaurants
    const provider = getRestaurantProvider()
    const restaurants = await provider.searchRestaurants(validatedData)

    // Get session for saving to DB
    const session = await auth()
    const userId = session?.user?.id

    // Save to database if user is logged in
    if (userId) {
      const recipeRequest = await prisma.recipeRequest.create({
        data: {
          userId,
          type: 'orderout',
          inputJson: validatedData,
        },
      })

      await prisma.recipeResult.create({
        data: {
          requestId: recipeRequest.id,
          outputJson: restaurants,
        },
      })
    }

    return NextResponse.json({ restaurants })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Error searching restaurants:', error)
    return NextResponse.json(
      { error: 'Failed to search restaurants' },
      { status: 500 }
    )
  }
}

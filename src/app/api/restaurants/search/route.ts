import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { getRestaurantProvider } from '@/lib/restaurantProviders/mockProvider'
import { rateLimit } from '@/lib/rateLimit'
import { OrderOutRequestSchema } from '@/lib/validations'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'
    const limit = rateLimit(`restaurants:${ip}`, 10, 60_000)
    if (!limit.ok) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Try again in a minute.' },
        { status: 429 }
      )
    }

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
          outputJson: restaurants as unknown as Prisma.InputJsonValue,
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

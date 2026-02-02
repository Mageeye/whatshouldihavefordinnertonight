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
    // Get IP address - prioritize forwarded headers, fallback to connection IP
    const forwardedFor = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const ip =
      forwardedFor?.split(',')[0]?.trim() ||
      realIp ||
      request.headers.get('cf-connecting-ip') ||
      '127.0.0.1' // Default to localhost for dev
    
    const limit = await rateLimit(`restaurants:${ip}`, 10, 60_000)
    const rateHeaders = {
      'x-rate-limit-source': limit.source,
      'x-rate-limit-remaining': String(limit.remaining),
      'x-rate-limit-reset': new Date(limit.resetAt).toISOString(),
    }

    if (!limit.ok) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded. Try again in a minute.',
          remaining: limit.remaining,
          resetAt: new Date(limit.resetAt).toISOString(),
        },
        { status: 429, headers: rateHeaders }
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

    return NextResponse.json({ restaurants }, { headers: rateHeaders })
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

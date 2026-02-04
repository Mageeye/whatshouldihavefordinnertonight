import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

// Validation schema for saving preferences
const SaveWheelSchema = z.object({
  places: z.array(z.string()).min(2).max(10),
})

// GET - Load saved wheel preferences
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const savedWheel = await prisma.savedWheel.findUnique({
      where: { userId: session.user.id },
    })

    if (!savedWheel) {
      return NextResponse.json({ places: null })
    }

    return NextResponse.json({ places: savedWheel.places })
  } catch (error) {
    console.error('Error loading wheel preferences:', error)
    return NextResponse.json(
      { error: 'Failed to load preferences' },
      { status: 500 }
    )
  }
}

// POST - Save wheel preferences
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { places } = SaveWheelSchema.parse(body)

    // Filter out empty strings
    const validPlaces = places.filter((p: string) => p.trim().length > 0)

    if (validPlaces.length < 2) {
      return NextResponse.json(
        { error: 'At least 2 places are required' },
        { status: 400 }
      )
    }

    // Upsert - create or update
    const savedWheel = await prisma.savedWheel.upsert({
      where: { userId: session.user.id },
      update: { places: validPlaces },
      create: {
        userId: session.user.id,
        places: validPlaces,
      },
    })

    return NextResponse.json({ 
      success: true, 
      places: savedWheel.places,
      message: 'Preferences saved!'
    })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Error saving wheel preferences:', error)
    return NextResponse.json(
      { error: 'Failed to save preferences' },
      { status: 500 }
    )
  }
}

// DELETE - Clear saved preferences
export async function DELETE() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.savedWheel.delete({
      where: { userId: session.user.id },
    }).catch(() => {
      // Ignore if doesn't exist
    })

    return NextResponse.json({ 
      success: true,
      message: 'Preferences cleared!'
    })
  } catch (error) {
    console.error('Error clearing wheel preferences:', error)
    return NextResponse.json(
      { error: 'Failed to clear preferences' },
      { status: 500 }
    )
  }
}

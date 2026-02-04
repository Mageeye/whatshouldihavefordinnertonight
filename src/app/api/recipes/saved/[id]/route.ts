import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

// DELETE - Remove a saved recipe
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params

    // Verify the recipe belongs to the user before deleting
    const recipe = await prisma.savedRecipe.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 })
    }

    await prisma.savedRecipe.delete({
      where: { id },
    })

    return NextResponse.json({ 
      success: true,
      message: 'Recipe removed from saved'
    })
  } catch (error) {
    console.error('Error deleting saved recipe:', error)
    return NextResponse.json(
      { error: 'Failed to delete recipe' },
      { status: 500 }
    )
  }
}

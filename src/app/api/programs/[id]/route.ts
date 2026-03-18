import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const program = await prisma.program.findUnique({ where: { id } })
    if (!program) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ data: program })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    const body = await request.json()
    const { title, slug, category, description, content, imageUrl, ageGroup, duration, order, isPublished } = body

    const program = await prisma.program.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(category !== undefined && { category }),
        ...(description !== undefined && { description }),
        ...(content !== undefined && { content }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(ageGroup !== undefined && { ageGroup }),
        ...(duration !== undefined && { duration }),
        ...(order !== undefined && { order }),
        ...(isPublished !== undefined && { isPublished }),
      },
    })

    return NextResponse.json({ data: program })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    await prisma.program.delete({ where: { id } })

    return NextResponse.json({ message: 'Deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

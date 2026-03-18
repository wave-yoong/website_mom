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
    const staffMember = await prisma.staffProfile.findUnique({ where: { id } })
    if (!staffMember) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ data: staffMember })
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
    const { name, slug, title, department, bio, specialties, education, imageUrl, order, isPublished } = body

    const staffMember = await prisma.staffProfile.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(slug !== undefined && { slug }),
        ...(title !== undefined && { title }),
        ...(department !== undefined && { department }),
        ...(bio !== undefined && { bio }),
        ...(specialties !== undefined && { specialties }),
        ...(education !== undefined && { education }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(order !== undefined && { order }),
        ...(isPublished !== undefined && { isPublished }),
      },
    })

    return NextResponse.json({ data: staffMember })
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
    await prisma.staffProfile.delete({ where: { id } })

    return NextResponse.json({ message: 'Deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

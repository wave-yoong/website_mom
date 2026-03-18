import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { slugify } from '@/lib/utils'

export async function GET() {
  try {
    const staff = await prisma.staffProfile.findMany({
      where: { isPublished: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json({ data: staff })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { name, title, department, bio, specialties, education, imageUrl, order, isPublished } = body

    if (!name || !title || !bio) {
      return NextResponse.json({ error: 'name, title, and bio are required' }, { status: 400 })
    }

    const slug = body.slug || `${slugify(name)}-${Date.now()}`

    const staffMember = await prisma.staffProfile.create({
      data: {
        name,
        slug,
        title,
        department: department ?? null,
        bio,
        specialties: specialties ?? [],
        education: education ?? [],
        imageUrl: imageUrl ?? null,
        order: order ?? 0,
        isPublished: isPublished ?? true,
      },
    })

    return NextResponse.json({ data: staffMember }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

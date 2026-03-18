import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { slugify } from '@/lib/utils'

export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      where: { isPublished: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json({ data: programs })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { title, category, description, content, imageUrl, ageGroup, duration, order, isPublished } = body

    if (!title || !category || !description || !content) {
      return NextResponse.json(
        { error: 'title, category, description, and content are required' },
        { status: 400 }
      )
    }

    const slug = body.slug || `${slugify(title)}-${Date.now()}`

    const program = await prisma.program.create({
      data: {
        title,
        slug,
        category,
        description,
        content,
        imageUrl: imageUrl ?? null,
        ageGroup: ageGroup ?? null,
        duration: duration ?? null,
        order: order ?? 0,
        isPublished: isPublished ?? true,
      },
    })

    return NextResponse.json({ data: program }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

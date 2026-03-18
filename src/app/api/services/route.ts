import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { slugify } from '@/lib/utils'

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { isPublished: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json({ data: services })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { title, description, content, imageUrl, icon, order, isPublished } = body

    if (!title || !description || !content) {
      return NextResponse.json(
        { error: 'title, description, and content are required' },
        { status: 400 }
      )
    }

    const slug = body.slug || `${slugify(title)}-${Date.now()}`

    const service = await prisma.service.create({
      data: {
        title,
        slug,
        description,
        content,
        imageUrl: imageUrl ?? null,
        icon: icon ?? null,
        order: order ?? 0,
        isPublished: isPublished ?? true,
      },
    })

    return NextResponse.json({ data: service }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

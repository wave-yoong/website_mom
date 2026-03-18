import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const faqs = await prisma.faqItem.findMany({
      where: { isPublished: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json({ data: faqs })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { question, answer, category, order, isPublished } = body

    if (!question || !answer) {
      return NextResponse.json({ error: 'question and answer are required' }, { status: 400 })
    }

    const faq = await prisma.faqItem.create({
      data: {
        question,
        answer,
        category: category ?? 'general',
        order: order ?? 0,
        isPublished: isPublished ?? true,
      },
    })

    return NextResponse.json({ data: faq }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

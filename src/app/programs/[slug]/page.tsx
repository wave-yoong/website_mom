import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, Users } from 'lucide-react'
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import MainLayout from '@/components/layout/MainLayout'
import PageHeader from '@/components/ui/PageHeader'

const categoryConfig: Record<string, { label: string; color: string; bg: string }> = {
  infant: { label: '영아 (0-3세)', color: 'text-teal-700', bg: 'bg-teal-100' },
  child: { label: '아동 (4-7세)', color: 'text-blue-700', bg: 'bg-blue-100' },
  teen: { label: '청소년 (8-18세)', color: 'text-purple-700', bg: 'bg-purple-100' },
  parent: { label: '부모교육', color: 'text-orange-700', bg: 'bg-orange-100' },
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const program = await prisma.program.findUnique({ where: { slug } })
  if (!program) return { title: '프로그램을 찾을 수 없습니다' }
  return {
    title: `${program.title} | 서울아이발달지원센터`,
    description: program.description,
  }
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params
  const program = await prisma.program.findUnique({
    where: { slug, isPublished: true },
  })

  if (!program) notFound()

  const cfg = categoryConfig[program.category] ?? {
    label: program.category,
    color: 'text-gray-700',
    bg: 'bg-gray-100',
  }

  return (
    <MainLayout>
      <PageHeader
        title={program.title}
        subtitle={program.description}
        breadcrumbs={[
          { label: '프로그램', href: '/programs' },
          { label: program.title },
        ]}
      />

      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 배지 */}
          <div className="flex flex-wrap gap-3 mb-8">
            <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>
              <Users size={14} />
              {cfg.label}
            </span>
            {program.ageGroup && (
              <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>
                대상: {program.ageGroup}
              </span>
            )}
            {program.duration && (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                <Clock size={14} />
                {program.duration}
              </span>
            )}
          </div>

          {/* 내용 */}
          <div className="prose-content space-y-4">
            {program.content.split('\n').map((paragraph, i) => {
              if (!paragraph.trim()) return null
              return (
                <p key={i} className="text-gray-700 leading-relaxed text-base">
                  {paragraph}
                </p>
              )
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-blue-700 font-medium hover:text-blue-800 transition-colors"
            >
              <ArrowLeft size={18} />
              프로그램 목록으로 돌아가기
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-800 transition-colors"
            >
              이 프로그램 상담 신청하기
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

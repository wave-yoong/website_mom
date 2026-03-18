import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import MainLayout from '@/components/layout/MainLayout'
import PageHeader from '@/components/ui/PageHeader'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await prisma.service.findUnique({ where: { slug } })
  if (!service) return { title: '서비스를 찾을 수 없습니다' }
  return {
    title: `${service.title} | 서울아이발달지원센터`,
    description: service.description,
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = await prisma.service.findUnique({
    where: { slug, isPublished: true },
  })

  if (!service) notFound()

  return (
    <MainLayout>
      <PageHeader
        title={service.title}
        subtitle={service.description}
        breadcrumbs={[
          { label: '치료 서비스', href: '/services' },
          { label: service.title },
        ]}
      />

      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose-content">
            {service.content.split('\n').map((paragraph, i) => {
              if (!paragraph.trim()) return null
              return (
                <p key={i} className="text-gray-700 leading-relaxed mb-4 text-base">
                  {paragraph}
                </p>
              )
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-blue-700 font-medium hover:text-blue-800 transition-colors"
            >
              <ArrowLeft size={18} />
              치료 서비스 목록으로 돌아가기
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-800 transition-colors"
            >
              이 서비스 상담 신청하기
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

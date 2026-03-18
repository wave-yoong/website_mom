import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Eye, Calendar } from 'lucide-react'
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import MainLayout from '@/components/layout/MainLayout'
import PageHeader from '@/components/ui/PageHeader'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const post = await prisma.post.findUnique({ where: { id } })
  if (!post) return { title: '공지사항을 찾을 수 없습니다' }
  return {
    title: `${post.title} | 서울아이발달지원센터`,
    description: post.excerpt ?? post.content.slice(0, 160),
  }
}

export default async function NoticeDetailPage({ params }: Props) {
  const { id } = await params
  const post = await prisma.post.findUnique({
    where: { id, isPublished: true },
  })

  if (!post) notFound()

  // 조회수 증가 (fire-and-forget)
  prisma.post.update({ where: { id }, data: { viewCount: { increment: 1 } } }).catch(() => {})

  return (
    <MainLayout>
      <PageHeader
        title="공지사항"
        breadcrumbs={[
          { label: '공지사항', href: '/notices' },
          { label: post.title },
        ]}
      />

      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* 게시글 헤더 */}
            <div className="px-6 sm:px-8 pt-8 pb-6 border-b border-gray-100">
              {post.isPinned && (
                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded mb-3">
                  공지
                </span>
              )}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {formatDate(post.createdAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye size={14} />
                  조회 {(post.viewCount + 1).toLocaleString()}
                </span>
              </div>
            </div>

            {/* 게시글 내용 */}
            <div className="px-6 sm:px-8 py-8">
              <div className="prose-content space-y-4 max-w-none">
                {post.content.split('\n').map((paragraph, i) => {
                  if (!paragraph.trim()) return <br key={i} />
                  return (
                    <p key={i} className="text-gray-700 leading-relaxed text-base">
                      {paragraph}
                    </p>
                  )
                })}
              </div>
            </div>
          </article>

          {/* 목록으로 */}
          <div className="mt-6">
            <Link
              href="/notices"
              className="inline-flex items-center gap-2 text-blue-700 font-medium hover:text-blue-800 transition-colors"
            >
              <ArrowLeft size={18} />
              공지사항 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export default async function NoticeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const notice = await prisma.notice.findUnique({ where: { id: Number(id) } }).catch(() => null)

  if (!notice) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Link href="/notice" className="text-green-700 text-sm hover:underline mb-6 inline-block">
        ← 목록으로 돌아가기
      </Link>

      <article className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <div className="mb-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            {notice.isPinned && (
              <span className="text-xs font-bold text-white bg-green-600 px-2 py-0.5 rounded">공지</span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">{notice.title}</h1>
          <p className="text-sm text-gray-400">
            {new Date(notice.publishedAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
          {notice.content}
        </div>
      </article>
    </div>
  )
}

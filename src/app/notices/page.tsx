import Link from 'next/link'
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import MainLayout from '@/components/layout/MainLayout'
import PageHeader from '@/components/ui/PageHeader'

const PAGE_SIZE = 10

interface Props {
  searchParams: Promise<{ page?: string }>
}

export default async function NoticesPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1)
  const skip = (page - 1) * PAGE_SIZE

  const [total, pinnedPosts, regularPosts] = await Promise.all([
    prisma.post.count({ where: { isPublished: true, category: 'notice' } }),
    prisma.post.findMany({
      where: { isPublished: true, category: 'notice', isPinned: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.post.findMany({
      where: { isPublished: true, category: 'notice', isPinned: false },
      orderBy: { createdAt: 'desc' },
      skip,
      take: PAGE_SIZE,
    }),
  ])

  const totalPages = Math.max(1, Math.ceil((total - pinnedPosts.length) / PAGE_SIZE))
  const posts = page === 1 ? [...pinnedPosts, ...regularPosts] : regularPosts

  return (
    <MainLayout>
      <PageHeader
        title="공지사항"
        subtitle="서울아이발달지원센터의 새로운 소식을 확인하세요"
        breadcrumbs={[{ label: '공지사항' }]}
      />

      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-500 text-lg">등록된 공지사항이 없습니다.</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              {/* 헤더 */}
              <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wide">
                <div className="col-span-7">제목</div>
                <div className="col-span-2 text-center">작성일</div>
                <div className="col-span-2 text-center">조회</div>
              </div>

              <div className="divide-y divide-gray-100">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/notices/${post.id}`}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 px-6 py-4 hover:bg-blue-50 transition-colors group"
                  >
                    <div className="col-span-7 flex items-center gap-2 min-w-0">
                      {post.isPinned && (
                        <span className="flex-shrink-0 bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded">
                          공지
                        </span>
                      )}
                      <span
                        className={`truncate text-sm font-medium group-hover:text-blue-700 transition-colors ${
                          post.isPinned ? 'text-blue-900' : 'text-gray-800'
                        }`}
                      >
                        {post.title}
                      </span>
                    </div>
                    <div className="col-span-2 text-xs text-gray-400 sm:text-center mt-1 sm:mt-0">
                      {formatDate(post.createdAt)}
                    </div>
                    <div className="col-span-2 hidden sm:flex items-center justify-center gap-1 text-xs text-gray-400">
                      <Eye size={12} />
                      {post.viewCount.toLocaleString()}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {page > 1 && (
                <Link
                  href={`/notices?page=${page - 1}`}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft size={16} />
                  이전
                </Link>
              )}

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(page - 2, totalPages - 4)) + i
                  return (
                    <Link
                      key={pageNum}
                      href={`/notices?page=${pageNum}`}
                      className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${
                        pageNum === page
                          ? 'bg-blue-700 text-white'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </Link>
                  )
                })}
              </div>

              {page < totalPages && (
                <Link
                  href={`/notices?page=${page + 1}`}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  다음
                  <ChevronRight size={16} />
                </Link>
              )}
            </div>
          )}

          <p className="text-center text-xs text-gray-400 mt-4">
            전체 {total.toLocaleString()}건 · {page} / {totalPages} 페이지
          </p>
        </div>
      </section>
    </MainLayout>
  )
}

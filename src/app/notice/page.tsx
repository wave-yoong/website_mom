import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const metadata = { title: '공지사항 | 서울아이심리발달연구소' }

export default async function NoticePage() {
  const notices = await prisma.notice
    .findMany({ orderBy: [{ isPinned: 'desc' }, { publishedAt: 'desc' }] })
    .catch(() => [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">공지사항</h1>
        <p className="text-gray-500">센터의 최신 소식과 공지사항을 확인하세요</p>
        <div className="w-16 h-1 bg-green-600 mx-auto rounded mt-3"></div>
      </div>

      {notices.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">등록된 공지사항이 없습니다.</p>
        </div>
      ) : (
        <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-12 bg-gray-50 px-5 py-3 text-xs font-semibold text-gray-500 border-b border-gray-100">
            <span className="col-span-1">구분</span>
            <span className="col-span-8">제목</span>
            <span className="col-span-3 text-right">날짜</span>
          </div>
          {notices.map((notice, idx) => (
            <Link
              key={notice.id}
              href={`/notice/${notice.id}`}
              className={`grid grid-cols-12 px-5 py-4 items-center hover:bg-green-50 transition-colors border-b border-gray-50 last:border-0 ${notice.isPinned ? 'bg-green-50/50' : idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
            >
              <span className="col-span-1">
                {notice.isPinned ? (
                  <span className="text-xs font-bold text-white bg-green-600 px-1.5 py-0.5 rounded">공지</span>
                ) : (
                  <span className="text-xs text-gray-400">{notice.id}</span>
                )}
              </span>
              <span className="col-span-8 text-sm font-medium text-gray-700 truncate pr-4">
                {notice.title}
              </span>
              <span className="col-span-3 text-xs text-gray-400 text-right">
                {new Date(notice.publishedAt).toLocaleDateString('ko-KR')}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

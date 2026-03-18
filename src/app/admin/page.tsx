import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const metadata = { title: '관리자 대시보드' }

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const [noticeCount, programCount, researcherCount, inquiryCount] = await Promise.all([
    prisma.notice.count().catch(() => 0),
    prisma.program.count().catch(() => 0),
    prisma.researcher.count().catch(() => 0),
    prisma.inquiry.count().catch(() => 0),
  ])

  const pendingCount = await prisma.inquiry.count({ where: { status: 'pending' } }).catch(() => 0)

  const cards = [
    { label: '공지사항', count: noticeCount, href: '/admin/notices', icon: '📢', color: 'bg-blue-50 text-blue-700' },
    { label: '프로그램', count: programCount, href: '/admin/programs', icon: '📋', color: 'bg-purple-50 text-purple-700' },
    { label: '연구원', count: researcherCount, href: '/admin/researchers', icon: '👩‍⚕️', color: 'bg-green-50 text-green-700' },
    { label: '상담 신청', count: inquiryCount, href: '/admin/inquiries', icon: '💬', color: 'bg-orange-50 text-orange-700' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">관리자 대시보드</h1>
        <p className="text-gray-500 mt-1">안녕하세요, {session.user?.name}님</p>
      </div>

      {pendingCount > 0 && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
          <span className="text-2xl">🔔</span>
          <div>
            <p className="font-semibold text-amber-800">미확인 상담 신청이 {pendingCount}건 있습니다</p>
            <Link href="/admin/inquiries" className="text-sm text-amber-700 hover:underline">확인하기 →</Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
          >
            <div className={`inline-flex w-10 h-10 rounded-lg items-center justify-center text-xl mb-3 ${card.color}`}>
              {card.icon}
            </div>
            <p className="text-2xl font-bold text-gray-800">{card.count}</p>
            <p className="text-sm text-gray-500">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: '공지사항 관리', href: '/admin/notices', desc: '공지사항 작성, 수정, 삭제' },
          { label: '프로그램 관리', href: '/admin/programs', desc: '프로그램 등록 및 수정' },
          { label: '연구원 관리', href: '/admin/researchers', desc: '연구원 정보 관리' },
          { label: '상담 신청 관리', href: '/admin/inquiries', desc: '접수된 상담 신청 확인 및 처리' },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:bg-green-50 hover:border-green-200 transition-all"
          >
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{item.label}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
            <span className="text-gray-400">→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

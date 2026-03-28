import Link from 'next/link'
import { prisma } from '@/lib/prisma'

const services = [
  { title: '놀이치료', icon: '🎮', desc: '놀이를 통해 아이의 심리적 문제를 치료합니다.', href: '/services/play-therapy' },
  { title: '사회성그룹치료', icon: '👥', desc: '또래 관계 개선과 사회성 발달을 돕습니다.', href: '/services/social-group' },
  { title: '인지학습치료', icon: '🧠', desc: '학습 능력 향상과 인지 발달을 지원합니다.', href: '/services/cognitive' },
  { title: '언어치료', icon: '💬', desc: '언어 발달 지연과 의사소통 문제를 개선합니다.', href: '/services/language' },
  { title: '부모상담', icon: '💝', desc: '자녀 양육에 대한 전문적인 상담을 제공합니다.', href: '/services/parent-counseling' },
  { title: '발달평가', icon: '📊', desc: '아동의 전반적인 발달 수준을 전문적으로 평가합니다.', href: '/about/procedure' },
]

const steps = [
  { step: '01', title: '온라인 상담 신청', desc: '홈페이지를 통해 간편하게 상담을 신청하세요.' },
  { step: '02', title: '전화 상담', desc: '전문 상담사가 연락을 드려 초기 상황을 파악합니다.' },
  { step: '03', title: '초기 평가', desc: '전문적인 평가 도구를 사용하여 아이를 평가합니다.' },
  { step: '04', title: '치료/상담 시작', desc: '개인화된 치료 계획을 수립하고 서비스를 시작합니다.' },
]

export default async function HomePage() {
  const [notices, programs] = await Promise.all([
    prisma.notice.findMany({ orderBy: [{ isPinned: 'desc' }, { publishedAt: 'desc' }], take: 3 }).catch(() => []),
    prisma.program.findMany({ where: { published: true }, orderBy: { order: 'asc' }, take: 3 }).catch(() => []),
  ])

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-800 to-green-600 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            아이의 건강한 성장을<br />함께합니다
          </h1>
          <p className="text-lg md:text-xl text-green-100 mb-8 leading-relaxed">
            서울아이심리발달연구소는 전문 치료사와 함께<br />
            아이의 심리 발달을 위한 맞춤형 솔루션을 제공합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/inquiry"
              className="px-8 py-3 bg-white text-green-700 font-semibold rounded-full hover:bg-green-50 transition-colors"
            >
              온라인 상담 신청
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
            >
              센터 소개
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">치료/상담 서비스</h2>
            <p className="text-gray-500">전문가와 함께하는 맞춤형 심리 치료 프로그램</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, idx) => (
              <Link
                key={idx}
                href={svc.href}
                className="p-6 bg-gray-50 rounded-xl hover:shadow-md hover:bg-green-50 transition-all group"
              >
                <div className="text-4xl mb-3">{svc.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-700 mb-2">{svc.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{svc.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Programs preview */}
      {programs.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-1">프로그램</h2>
                <p className="text-gray-500">현재 운영 중인 프로그램을 확인하세요</p>
              </div>
              <Link href="/programs" className="text-green-700 text-sm font-medium hover:underline">전체 보기 →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {programs.map((prog) => (
                <div key={prog.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <span className="inline-block text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded mb-3">
                    {prog.category}
                  </span>
                  <h3 className="text-base font-semibold text-gray-800 mb-2">{prog.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{prog.description}</p>
                  {prog.targetAge && (
                    <p className="text-xs text-gray-400 mt-2">대상: {prog.targetAge}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Notices */}
      {notices.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-1">공지사항</h2>
                <p className="text-gray-500">센터의 최신 소식을 전해드립니다</p>
              </div>
              <Link href="/notice" className="text-green-700 text-sm font-medium hover:underline">전체 보기 →</Link>
            </div>
            <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
              {notices.map((notice) => (
                <Link
                  key={notice.id}
                  href={`/notice/${notice.id}`}
                  className="flex items-center gap-4 px-6 py-4 bg-white hover:bg-green-50 transition-colors"
                >
                  {notice.isPinned && (
                    <span className="text-xs font-bold text-white bg-green-600 px-2 py-0.5 rounded flex-shrink-0">공지</span>
                  )}
                  <span className="flex-1 text-sm font-medium text-gray-700 truncate">{notice.title}</span>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {new Date(notice.publishedAt).toLocaleDateString('ko-KR')}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">상담 절차</h2>
            <p className="text-gray-500">간단한 4단계로 전문 상담을 시작하세요</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, idx) => (
              <div key={idx} className="text-center">
                <div className="w-14 h-14 bg-green-700 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                  {s.step}
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-green-700 text-white text-center">
        <h2 className="text-3xl font-bold mb-3">지금 바로 상담을 시작해보세요</h2>
        <p className="text-green-100 mb-8">전문가와의 첫 상담을 통해 아이에게 맞는 솔루션을 찾아보세요.</p>
        <Link
          href="/inquiry"
          className="inline-block px-10 py-3 bg-white text-green-700 font-semibold rounded-full hover:bg-green-50 transition-colors"
        >
          온라인 상담 신청하기
        </Link>
      </section>
    </div>
  )
}

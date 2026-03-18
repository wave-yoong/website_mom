import Link from 'next/link'

export const metadata = { title: '센터 소개 | 서울아이심리발달연구소' }

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">센터 소개</h1>
        <p className="text-gray-500 text-lg">아이의 건강한 성장을 함께하는 전문 심리발달 연구소</p>
      </div>

      <div className="space-y-12">
        {/* Mission */}
        <section className="bg-green-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-green-800 mb-4">미션</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            서울아이심리발달연구소는 모든 아이가 건강한 심리적 기반 위에서 행복하게 성장할 수 있도록
            최고 수준의 전문적인 심리 치료 및 상담 서비스를 제공합니다.
          </p>
        </section>

        {/* Vision */}
        <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">비전</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            아동 심리 치료 분야의 선도적인 연구소로서, 과학적 근거에 기반한 치료법을 통해
            아이와 가족 모두가 행복한 삶을 영위할 수 있는 사회를 만들어가겠습니다.
          </p>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">핵심 가치</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🌱', title: '전문성', desc: '최신 연구와 근거 기반 치료법으로 최고 수준의 서비스를 제공합니다.' },
              { icon: '💚', title: '신뢰', desc: '아이와 가족을 존중하고 신뢰를 바탕으로 한 투명한 치료 과정을 진행합니다.' },
              { icon: '🤝', title: '협력', desc: '부모, 교사, 의료진과 긴밀히 협력하여 아이의 전인적 성장을 지원합니다.' },
            ].map((v, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* History */}
        <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">연혁</h2>
          <div className="space-y-4">
            {[
              { year: '2024', event: '서울아이심리발달연구소 개소' },
              { year: '2023', event: '강남 심리발달 연구센터 인증 획득' },
              { year: '2022', event: '아동발달 연구팀 구성 및 프로그램 개발' },
            ].map((h, i) => (
              <div key={i} className="flex gap-6 items-start">
                <span className="text-green-700 font-bold w-12 flex-shrink-0">{h.year}</span>
                <span className="text-gray-700">{h.event}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {[
            { label: '원장 인사말', href: '/about/greeting' },
            { label: '연구원 소개', href: '/about/researchers' },
            { label: '상담 절차', href: '/about/procedure' },
            { label: '오시는 길', href: '/about/location' },
          ].map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="block text-center px-4 py-3 border-2 border-green-600 text-green-700 rounded-xl font-medium hover:bg-green-700 hover:text-white transition-colors text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

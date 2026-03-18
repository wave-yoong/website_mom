import { MapPin, Phone, Clock, Mail } from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'
import PageHeader from '@/components/ui/PageHeader'

const coreValues = [
  {
    title: '아이 중심',
    description:
      '모든 치료와 프로그램은 아이의 관점에서 설계됩니다. 아이의 강점을 발견하고 개별적인 발달 목표를 설정하여 맞춤형 지원을 제공합니다.',
    icon: '❤️',
  },
  {
    title: '근거 기반',
    description:
      '최신 연구와 과학적으로 검증된 치료 방법을 사용합니다. 지속적인 전문성 개발을 통해 효과적인 치료 결과를 보장합니다.',
    icon: '🔬',
  },
  {
    title: '가족 참여',
    description:
      '부모님과 가족이 치료 과정의 핵심 파트너입니다. 가정에서도 발달 지원이 이어질 수 있도록 부모 교육과 코칭을 제공합니다.',
    icon: '👨‍👩‍👧',
  },
  {
    title: '지속적 성장',
    description:
      '단기적 치료를 넘어 아이의 장기적 성장과 자립을 목표로 합니다. 발달의 각 단계에서 필요한 지원을 지속적으로 제공합니다.',
    icon: '🌱',
  },
]

export default function AboutPage() {
  return (
    <MainLayout>
      <PageHeader
        title="센터 소개"
        subtitle="서울아이발달지원센터를 소개합니다"
        breadcrumbs={[{ label: '센터 소개' }]}
      />

      {/* 센터 소개 */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-blue-700 font-semibold text-sm uppercase tracking-wide">About Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-6">
              서울아이발달지원센터
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              서울아이발달지원센터는 2009년 설립 이후 발달 지연 및 장애를 가진 아동과 청소년의 건강한 성장을
              지원해 왔습니다. 15년 이상의 경험을 바탕으로, 언어치료·행동치료·인지치료·작업치료·놀이치료 등
              다양한 전문 서비스를 제공합니다.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              저희 센터는 단순한 치료 기관을 넘어, 아이와 가족이 함께 성장하는 공간을 지향합니다. 20여 명의
              전문 치료사와 함께 3,000명 이상의 아동에게 개별 맞춤형 치료 서비스를 제공한 경험을 토대로,
              과학적이고 따뜻한 접근 방식으로 아이의 잠재력을 최대한 이끌어 냅니다.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '15+', label: '년 운영 경험' },
              { value: '20+', label: '명의 전문 치료사' },
              { value: '3,000+', label: '명의 치료 경험' },
              { value: '5가지', label: '전문 치료 서비스' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center bg-blue-50 rounded-xl p-6"
              >
                <p className="text-4xl font-bold text-blue-700 mb-1">{stat.value}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 핵심 가치 */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-700 font-semibold text-sm uppercase tracking-wide">Core Values</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
              4가지 핵심 가치
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              서울아이발달지원센터의 모든 활동은 다음 네 가지 핵심 가치를 바탕으로 이루어집니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 오시는 길 */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-700 font-semibold text-sm uppercase tracking-wide">Location</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">오시는 길</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 지도 */}
            <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200 min-h-[350px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.4847!2d127.0276!3d37.4979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z7ISc7Jq47Yq567OE7Iqk6rSA!5e0!3m2!1sko!2skr!4v1620000000000"
                width="100%"
                height="100%"
                style={{ minHeight: '350px', border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="서울아이발달지원센터 위치"
              />
            </div>

            {/* 연락처 정보 */}
            <div className="flex flex-col justify-center gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">주소</p>
                  <p className="text-gray-600">
                    서울특별시 강남구 테헤란로 123, 발달빌딩 5층
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    지하철 2호선 강남역 3번 출구에서 도보 5분
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">전화</p>
                  <a href="tel:02-123-4567" className="text-blue-700 hover:text-blue-800 font-medium">
                    02-123-4567
                  </a>
                  <p className="text-gray-500 text-sm mt-1">팩스: 02-123-4568</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">이메일</p>
                  <a
                    href="mailto:info@seoulchild.com"
                    className="text-blue-700 hover:text-blue-800 font-medium"
                  >
                    info@seoulchild.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">운영 시간</p>
                  <div className="text-gray-600 text-sm space-y-1">
                    <p>월요일 – 금요일: 오전 9:00 – 오후 7:00</p>
                    <p>토요일: 오전 9:00 – 오후 3:00</p>
                    <p className="text-gray-400">일요일 및 공휴일 휴무</p>
                  </div>
                </div>
              </div>

              <div className="mt-2 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-blue-800 text-sm font-medium">
                  💡 방문 상담은 사전 예약제로 운영됩니다. 전화 또는 온라인으로 예약해 주세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

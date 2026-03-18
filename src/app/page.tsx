import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import MainLayout from '@/components/layout/MainLayout'
import {
  MessageSquare, Brain, Heart, Hand, Lightbulb,
  ArrowRight, CheckCircle, Phone, Calendar
} from 'lucide-react'

const serviceIcons: Record<string, React.ReactNode> = {
  MessageSquare: <MessageSquare className="w-8 h-8" />,
  Brain: <Brain className="w-8 h-8" />,
  Heart: <Heart className="w-8 h-8" />,
  Hand: <Hand className="w-8 h-8" />,
  Lightbulb: <Lightbulb className="w-8 h-8" />,
}

export default async function HomePage() {
  const [services, programs, recentPosts] = await Promise.all([
    prisma.service.findMany({ where: { isPublished: true }, orderBy: { order: 'asc' }, take: 3 }),
    prisma.program.findMany({ where: { isPublished: true }, orderBy: { order: 'asc' } }),
    prisma.post.findMany({ where: { isPublished: true }, orderBy: { createdAt: 'desc' }, take: 3 }),
  ])

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white opacity-5 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-300 opacity-10 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <span className="inline-block bg-blue-600 bg-opacity-50 text-blue-100 text-sm font-medium px-3 py-1 rounded-full mb-6">
              서울아이발달지원센터
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              아이의 성장을<br />
              <span className="text-blue-300">함께합니다</span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed">
              전문 치료사들이 아이의 발달을 체계적으로 지원합니다.<br className="hidden sm:block" />
              언어치료, 행동치료, 인지치료, 작업치료, 놀이치료를 통해<br className="hidden sm:block" />
              아이의 잠재력을 최대한 발휘할 수 있도록 도와드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-800 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                <Phone size={18} />
                상담 신청하기
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 border border-blue-400 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                치료 서비스 보기
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '15+', label: '년 운영 경험' },
              { value: '20+', label: '명의 전문 치료사' },
              { value: '3,000+', label: '명의 아동 치료 경험' },
              { value: '5가지', label: '전문 치료 서비스' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-blue-700 mb-1">{stat.value}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-700 font-semibold text-sm uppercase tracking-wide">치료 서비스</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">전문 치료 서비스</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              각 분야의 전문 치료사들이 아이의 발달 수준에 맞는 맞춤형 치료를 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 mb-4 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                  {serviceIcons[service.icon ?? 'MessageSquare'] ?? <MessageSquare className="w-8 h-8" />}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                <div className="mt-4 flex items-center gap-1 text-blue-700 text-sm font-medium">
                  자세히 보기 <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-800 transition-colors"
            >
              모든 치료 서비스 보기 <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-700 font-semibold text-sm uppercase tracking-wide">프로그램</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">연령별 맞춤 프로그램</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              영아부터 청소년까지, 각 발달 단계에 맞는 전문 프로그램을 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => {
              const colors = [
                'from-blue-500 to-blue-700',
                'from-teal-500 to-teal-700',
                'from-purple-500 to-purple-700',
                'from-orange-500 to-orange-600',
              ]
              return (
                <Link
                  key={program.id}
                  href={`/programs/${program.slug}`}
                  className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className={`bg-gradient-to-br ${colors[index % colors.length]} p-6 h-full min-h-[200px] flex flex-col justify-between`}>
                    <div>
                      <span className="text-white text-opacity-70 text-sm font-medium">{program.ageGroup}</span>
                      <h3 className="text-white text-lg font-bold mt-1">{program.title}</h3>
                    </div>
                    <p className="text-white text-opacity-80 text-sm mt-3 leading-relaxed line-clamp-3">{program.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-white text-opacity-80 text-sm">
                      자세히 보기 <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-300 font-semibold text-sm uppercase tracking-wide">센터의 강점</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">왜 서울아이발달지원센터인가요?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '전문 치료사 팀',
                desc: '각 분야의 경력 있는 전문 치료사들이 근거 기반의 치료를 제공합니다.',
              },
              {
                title: '개별 맞춤 치료',
                desc: '아이의 특성과 발달 수준을 정확히 파악하여 개인화된 치료 계획을 수립합니다.',
              },
              {
                title: '가족 중심 접근',
                desc: '부모님을 치료의 파트너로 참여시켜 가정에서도 발달을 지원할 수 있도록 합니다.',
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-blue-200 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Notices */}
      {recentPosts.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-blue-700 font-semibold text-sm uppercase tracking-wide">공지사항</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">최신 소식</h2>
              </div>
              <Link
                href="/notices"
                className="text-blue-700 text-sm font-medium flex items-center gap-1 hover:text-blue-800"
              >
                전체 보기 <ArrowRight size={16} />
              </Link>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/notices/${post.id}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-blue-50 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {post.isPinned && (
                      <span className="flex-shrink-0 bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">
                        공지
                      </span>
                    )}
                    <span className="text-gray-800 font-medium truncate group-hover:text-blue-700 transition-colors">
                      {post.title}
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm flex-shrink-0 ml-4">{formatDate(post.createdAt)}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Calendar className="w-12 h-12 text-blue-700 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            지금 바로 상담을 신청하세요
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            아이의 발달이 걱정되신다면 전문가와 상담해 보세요.<br />
            초기 상담은 무료로 진행됩니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors shadow-lg"
            >
              온라인 상담 신청
              <ArrowRight size={18} />
            </Link>
            <a
              href="tel:02-123-4567"
              className="inline-flex items-center justify-center gap-2 border-2 border-blue-700 text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Phone size={18} />
              02-123-4567
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

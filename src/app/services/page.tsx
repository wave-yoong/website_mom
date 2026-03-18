import Link from 'next/link'
import {
  MessageSquare, Brain, Heart, Hand, Lightbulb,
  Activity, BookOpen, Users, Star, ArrowRight,
} from 'lucide-react'
import { prisma } from '@/lib/prisma'
import MainLayout from '@/components/layout/MainLayout'
import PageHeader from '@/components/ui/PageHeader'

const iconMap: Record<string, React.ReactNode> = {
  MessageSquare: <MessageSquare className="w-8 h-8" />,
  Brain: <Brain className="w-8 h-8" />,
  Heart: <Heart className="w-8 h-8" />,
  Hand: <Hand className="w-8 h-8" />,
  Lightbulb: <Lightbulb className="w-8 h-8" />,
  Activity: <Activity className="w-8 h-8" />,
  BookOpen: <BookOpen className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
  Star: <Star className="w-8 h-8" />,
}

const fallbackIcons = [MessageSquare, Brain, Heart, Hand, Lightbulb, Activity, BookOpen, Users]

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isPublished: true },
    orderBy: { order: 'asc' },
  })

  return (
    <MainLayout>
      <PageHeader
        title="치료 서비스"
        subtitle="아이의 발달을 위한 전문 치료 서비스를 소개합니다"
        breadcrumbs={[{ label: '치료 서비스' }]}
      />

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">서비스 준비 중</h3>
              <p className="text-gray-500">치료 서비스 정보를 준비 중입니다. 잠시 후 다시 확인해 주세요.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const FallbackIcon = fallbackIcons[index % fallbackIcons.length]
                const icon = service.icon
                  ? (iconMap[service.icon] ?? <FallbackIcon className="w-8 h-8" />)
                  : <FallbackIcon className="w-8 h-8" />

                return (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="group bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col"
                  >
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 mb-4 group-hover:bg-blue-700 group-hover:text-white transition-colors flex-shrink-0">
                      {icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1">{service.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-blue-700 text-sm font-medium">
                      자세히 보기 <ArrowRight size={16} />
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">어떤 서비스가 필요한지 모르시겠나요?</h2>
          <p className="text-blue-200 mb-8">
            전문 치료사와의 초기 상담을 통해 아이에게 적합한 서비스를 안내해 드립니다.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-blue-800 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            무료 상담 신청하기 <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </MainLayout>
  )
}

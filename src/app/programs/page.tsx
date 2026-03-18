import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import MainLayout from '@/components/layout/MainLayout'
import PageHeader from '@/components/ui/PageHeader'

const categoryConfig: Record<string, { label: string; color: string; bg: string }> = {
  infant: { label: '영아 (0-3세)', color: 'text-teal-700', bg: 'bg-teal-100' },
  child: { label: '아동 (4-7세)', color: 'text-blue-700', bg: 'bg-blue-100' },
  teen: { label: '청소년 (8-18세)', color: 'text-purple-700', bg: 'bg-purple-100' },
  parent: { label: '부모교육', color: 'text-orange-700', bg: 'bg-orange-100' },
}

const categoryOrder = ['infant', 'child', 'teen', 'parent']

export default async function ProgramsPage() {
  const programs = await prisma.program.findMany({
    where: { isPublished: true },
    orderBy: [{ category: 'asc' }, { order: 'asc' }],
  })

  const grouped = categoryOrder.reduce<Record<string, typeof programs>>((acc, cat) => {
    acc[cat] = programs.filter((p) => p.category === cat)
    return acc
  }, {})

  const hasPrograms = programs.length > 0

  return (
    <MainLayout>
      <PageHeader
        title="프로그램"
        subtitle="연령별 맞춤 발달 지원 프로그램을 소개합니다"
        breadcrumbs={[{ label: '프로그램' }]}
      />

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!hasPrograms ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">프로그램 준비 중</h3>
              <p className="text-gray-500">프로그램 정보를 준비 중입니다. 잠시 후 다시 확인해 주세요.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {categoryOrder.map((cat) => {
                const catPrograms = grouped[cat]
                if (!catPrograms || catPrograms.length === 0) return null
                const cfg = categoryConfig[cat] ?? {
                  label: cat,
                  color: 'text-gray-700',
                  bg: 'bg-gray-100',
                }

                return (
                  <div key={cat}>
                    <div className="flex items-center gap-3 mb-6">
                      <span className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>
                        {cfg.label}
                      </span>
                      <div className="flex-1 border-t border-gray-200" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {catPrograms.map((program) => (
                        <Link
                          key={program.id}
                          href={`/programs/${program.slug}`}
                          className="group bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                              {program.title}
                            </h3>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {program.ageGroup && (
                              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                                {program.ageGroup}
                              </span>
                            )}
                            {program.duration && (
                              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                                {program.duration}
                              </span>
                            )}
                          </div>

                          <p className="text-gray-600 text-sm leading-relaxed flex-1">
                            {program.description}
                          </p>

                          <div className="mt-4 flex items-center gap-1 text-blue-700 text-sm font-medium">
                            자세히 보기 <ArrowRight size={16} />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">우리 아이에게 맞는 프로그램이 궁금하신가요?</h2>
          <p className="text-blue-200 mb-8">
            전문 치료사와의 무료 초기 상담을 통해 아이에게 적합한 프로그램을 안내받으세요.
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

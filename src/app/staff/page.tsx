import Link from 'next/link'
import { Users, ArrowRight } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import MainLayout from '@/components/layout/MainLayout'
import PageHeader from '@/components/ui/PageHeader'

export default async function StaffPage() {
  const staff = await prisma.staffProfile.findMany({
    where: { isPublished: true },
    orderBy: { order: 'asc' },
  })

  return (
    <MainLayout>
      <PageHeader
        title="전문가 소개"
        subtitle="서울아이발달지원센터의 전문 치료사를 소개합니다"
        breadcrumbs={[{ label: '전문가 소개' }]}
      />

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {staff.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">전문가 정보 준비 중</h3>
              <p className="text-gray-500">전문가 소개 정보를 준비 중입니다. 잠시 후 다시 확인해 주세요.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {staff.map((member) => (
                <Link
                  key={member.id}
                  href={`/staff/${member.slug}`}
                  className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden"
                >
                  {/* 프로필 상단 */}
                  <div className="bg-gradient-to-br from-blue-800 to-blue-700 p-6 text-white">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-blue-200 text-sm mt-1">{member.title}</p>
                    {member.department && (
                      <p className="text-blue-300 text-xs mt-0.5">{member.department}</p>
                    )}
                  </div>

                  {/* 전문 분야 태그 */}
                  <div className="p-5">
                    {member.specialties.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {member.specialties.slice(0, 4).map((specialty) => (
                          <span
                            key={specialty}
                            className="text-xs bg-blue-50 text-blue-700 font-medium px-2 py-0.5 rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                        {member.specialties.length > 4 && (
                          <span className="text-xs bg-gray-100 text-gray-500 font-medium px-2 py-0.5 rounded-full">
                            +{member.specialties.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{member.bio}</p>

                    <div className="mt-4 flex items-center gap-1 text-blue-700 text-sm font-medium group-hover:gap-2 transition-all">
                      자세히 보기 <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  )
}

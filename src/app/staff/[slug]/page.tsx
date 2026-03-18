import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, GraduationCap, BookOpen } from 'lucide-react'
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import MainLayout from '@/components/layout/MainLayout'
import PageHeader from '@/components/ui/PageHeader'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const member = await prisma.staffProfile.findUnique({ where: { slug } })
  if (!member) return { title: '전문가를 찾을 수 없습니다' }
  return {
    title: `${member.name} ${member.title} | 서울아이발달지원센터`,
    description: member.bio.slice(0, 160),
  }
}

export default async function StaffDetailPage({ params }: Props) {
  const { slug } = await params
  const member = await prisma.staffProfile.findUnique({
    where: { slug, isPublished: true },
  })

  if (!member) notFound()

  return (
    <MainLayout>
      <PageHeader
        title={member.name}
        subtitle={`${member.title}${member.department ? ` · ${member.department}` : ''}`}
        breadcrumbs={[
          { label: '전문가 소개', href: '/staff' },
          { label: member.name },
        ]}
      />

      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 사이드 정보 */}
            <div className="lg:col-span-1">
              {/* 프로필 카드 */}
              <div className="bg-gradient-to-br from-blue-800 to-blue-700 rounded-xl p-6 text-white mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  {member.name.charAt(0)}
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold">{member.name}</h2>
                  <p className="text-blue-200 text-sm mt-1">{member.title}</p>
                  {member.department && (
                    <p className="text-blue-300 text-xs mt-0.5">{member.department}</p>
                  )}
                </div>
              </div>

              {/* 전문 분야 */}
              {member.specialties.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-5 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-blue-700" />
                    <h3 className="font-semibold text-gray-900 text-sm">전문 분야</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="text-xs bg-blue-100 text-blue-700 font-medium px-2.5 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 학력 */}
              {member.education.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="w-4 h-4 text-blue-700" />
                    <h3 className="font-semibold text-gray-900 text-sm">학력 및 자격</h3>
                  </div>
                  <ul className="space-y-2">
                    {member.education.map((edu, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-1.5" />
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 본문 소개 */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">소개</h2>
              <div className="prose-content space-y-4">
                {member.bio.split('\n').map((paragraph, i) => {
                  if (!paragraph.trim()) return null
                  return (
                    <p key={i} className="text-gray-700 leading-relaxed text-base">
                      {paragraph}
                    </p>
                  )
                })}
              </div>

              <div className="mt-10 pt-8 border-t border-gray-200">
                <Link
                  href="/staff"
                  className="inline-flex items-center gap-2 text-blue-700 font-medium hover:text-blue-800 transition-colors"
                >
                  <ArrowLeft size={18} />
                  전문가 목록으로 돌아가기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

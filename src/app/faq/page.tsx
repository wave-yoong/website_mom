import { HelpCircle } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import MainLayout from '@/components/layout/MainLayout'
import PageHeader from '@/components/ui/PageHeader'
import FaqAccordion from './FaqAccordion'

export default async function FaqPage() {
  const faqs = await prisma.faqItem.findMany({
    where: { isPublished: true },
    orderBy: [{ category: 'asc' }, { order: 'asc' }],
  })

  return (
    <MainLayout>
      <PageHeader
        title="자주 묻는 질문"
        subtitle="자주 문의하시는 내용을 모아두었습니다"
        breadcrumbs={[{ label: '자주 묻는 질문' }]}
      />

      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-xl border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">FAQ 준비 중</h3>
              <p className="text-gray-500">자주 묻는 질문을 준비 중입니다. 잠시 후 다시 확인해 주세요.</p>
            </div>
          ) : (
            <FaqAccordion items={faqs} />
          )}

          <div className="mt-12 p-6 bg-blue-800 text-white rounded-xl text-center">
            <HelpCircle className="w-8 h-8 mx-auto mb-3 text-blue-300" />
            <h3 className="text-lg font-bold mb-2">원하시는 답변을 찾지 못하셨나요?</h3>
            <p className="text-blue-200 text-sm mb-4">
              직접 문의하시면 전문 상담사가 친절하게 안내해 드립니다.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-blue-800 font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-50 transition-colors"
            >
              문의하기
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

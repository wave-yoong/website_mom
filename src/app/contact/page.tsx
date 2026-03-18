'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle, AlertCircle, Phone, Mail, MapPin } from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'
import PageHeader from '@/components/ui/PageHeader'

const contactSchema = z.object({
  name: z.string().min(1, '이름을 입력해 주세요.'),
  email: z.string().email('올바른 이메일 주소를 입력해 주세요.'),
  phone: z.string().optional(),
  childAge: z.string().min(1, '연령대를 선택해 주세요.'),
  subject: z.string().min(1, '제목을 입력해 주세요.'),
  message: z.string().min(10, '문의 내용을 10자 이상 입력해 주세요.'),
})

type ContactFormData = z.infer<typeof contactSchema>

const childAgeOptions = [
  { value: '', label: '연령대를 선택해 주세요' },
  { value: '0-3세', label: '0-3세 (영아)' },
  { value: '4-7세', label: '4-7세 (유아)' },
  { value: '8-12세', label: '8-12세 (아동)' },
  { value: '13-18세', label: '13-18세 (청소년)' },
  { value: '성인/부모', label: '성인 / 부모' },
]

export default function ContactPage() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('서버 오류')
      setSubmitStatus('success')
      reset()
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <MainLayout>
      <PageHeader
        title="상담 문의"
        subtitle="궁금하신 사항을 문의해 주세요. 빠르게 답변드리겠습니다."
        breadcrumbs={[{ label: '상담 문의' }]}
      />

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 연락처 사이드바 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-5">연락처 정보</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-blue-700" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">전화 상담</p>
                      <a href="tel:02-123-4567" className="font-semibold text-blue-700 hover:text-blue-800">
                        02-123-4567
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-blue-700" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">이메일</p>
                      <a href="mailto:info@seoulchild.com" className="font-semibold text-blue-700 hover:text-blue-800 text-sm">
                        info@seoulchild.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-blue-700" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">주소</p>
                      <p className="text-sm text-gray-700">서울특별시 강남구<br />테헤란로 123, 발달빌딩 5층</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-700 text-white rounded-xl p-6">
                <h3 className="font-bold mb-2">운영 시간</h3>
                <div className="space-y-1.5 text-sm text-blue-100">
                  <div className="flex justify-between">
                    <span>월 – 금</span>
                    <span>09:00 – 19:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>토요일</span>
                    <span>09:00 – 15:00</span>
                  </div>
                  <div className="flex justify-between text-blue-300">
                    <span>일 / 공휴일</span>
                    <span>휴무</span>
                  </div>
                </div>
                <p className="mt-4 text-xs text-blue-200">
                  * 초기 상담은 무료로 진행됩니다.
                </p>
              </div>
            </div>

            {/* 문의 폼 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">온라인 상담 신청</h2>

                {submitStatus === 'success' && (
                  <div className="mb-6 flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-800">문의가 성공적으로 접수되었습니다!</p>
                      <p className="text-sm text-green-700 mt-0.5">
                        빠른 시일 내에 담당자가 연락드리겠습니다. 감사합니다.
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-800">문의 접수 중 오류가 발생했습니다.</p>
                      <p className="text-sm text-red-700 mt-0.5">
                        잠시 후 다시 시도하거나 전화로 문의해 주세요.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* 이름 */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                        이름 <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="홍길동"
                        {...register('name')}
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    {/* 이메일 */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                        이메일 <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        {...register('email')}
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* 연락처 */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                        연락처 <span className="text-gray-400 text-xs">(선택)</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="010-0000-0000"
                        {...register('phone')}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition-colors"
                      />
                    </div>

                    {/* 연령대 */}
                    <div>
                      <label htmlFor="childAge" className="block text-sm font-medium text-gray-700 mb-1.5">
                        자녀 연령대 <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="childAge"
                        {...register('childAge')}
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors appearance-none bg-white ${
                          errors.childAge ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {childAgeOptions.map((opt) => (
                          <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {errors.childAge && (
                        <p className="mt-1 text-xs text-red-600">{errors.childAge.message}</p>
                      )}
                    </div>
                  </div>

                  {/* 제목 */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                      제목 <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      placeholder="문의 제목을 입력해 주세요"
                      {...register('subject')}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.subject ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                      }`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-red-600">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* 문의 내용 */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                      문의 내용 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      placeholder="문의하실 내용을 자세히 입력해 주세요. (최소 10자)"
                      {...register('message')}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors ${
                        errors.message ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  <p className="text-xs text-gray-500">
                    <span className="text-red-500">*</span> 표시는 필수 입력 항목입니다.
                    입력하신 정보는 상담 목적으로만 사용됩니다.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        접수 중...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        문의 접수하기
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

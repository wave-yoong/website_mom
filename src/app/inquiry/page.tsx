'use client'

import { useState } from 'react'

const serviceOptions = [
  '놀이치료',
  '사회성그룹치료',
  '인지학습치료',
  '언어치료',
  '부모상담',
  '발달평가',
  '기타',
]

export default function InquiryPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    childAge: '',
    serviceType: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? '오류가 발생했습니다.')
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-6">✅</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">상담 신청이 완료되었습니다</h2>
        <p className="text-gray-500 mb-8">
          담당 상담사가 1-2 영업일 내에 연락드릴 예정입니다.<br />
          문의사항은 전화 02-1234-5678로 연락 주세요.
        </p>
        <button
          onClick={() => { setSuccess(false); setForm({ name: '', phone: '', email: '', childAge: '', serviceType: '', message: '' }) }}
          className="px-6 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition-colors text-sm"
        >
          새 상담 신청
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">온라인 상담 신청</h1>
        <p className="text-gray-500">아이에 대한 정보를 입력해 주시면 전문 상담사가 연락드립니다</p>
        <div className="w-16 h-1 bg-green-600 mx-auto rounded mt-3"></div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              보호자 성함 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="홍길동"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              연락처 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="010-0000-0000"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">아이 나이</label>
            <input
              type="text"
              name="childAge"
              value={form.childAge}
              onChange={handleChange}
              placeholder="예: 만 7세"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              원하시는 서비스 <span className="text-red-500">*</span>
            </label>
            <select
              name="serviceType"
              value={form.serviceType}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value="">선택해주세요</option>
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            상담 내용 <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            placeholder="아이에 대한 주요 어려움이나 상담하고 싶은 내용을 자유롭게 적어주세요."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <p className="text-xs text-gray-400">
          입력하신 정보는 상담 목적으로만 사용되며 외부에 공개되지 않습니다.
        </p>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-green-700 text-white font-semibold rounded-full hover:bg-green-800 transition-colors disabled:opacity-50"
        >
          {loading ? '제출 중...' : '상담 신청하기'}
        </button>
      </form>
    </div>
  )
}

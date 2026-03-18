'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    })

    if (result?.error) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">관리자 로그인</h1>
          <p className="text-sm text-gray-500 mt-1">서울아이심리발달연구소</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              required
              placeholder="admin@example.com"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              required
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm rounded-lg px-3 py-2">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-green-700 text-white font-semibold rounded-full hover:bg-green-800 transition-colors disabled:opacity-50"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  )
}

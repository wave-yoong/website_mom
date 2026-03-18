import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function AdminResearchersPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')
  const researchers = await prisma.researcher.findMany({ orderBy: { order: 'asc' } }).catch(() => [])
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">연구원 관리</h1>
        <Link href="/admin" className="text-sm text-gray-500 hover:underline">← 대시보드</Link>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {researchers.length === 0 ? <p className="text-center py-10 text-gray-400">연구원이 없습니다.</p> : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500"><tr><th className="px-4 py-3 text-left">이름</th><th className="px-4 py-3">직책</th><th className="px-4 py-3">공개</th></tr></thead>
            <tbody className="divide-y divide-gray-50">
              {researchers.map(r => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-700">{r.name}</td>
                  <td className="px-4 py-3 text-center text-gray-500">{r.title}</td>
                  <td className="px-4 py-3 text-center">{r.published ? '✅' : '❌'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

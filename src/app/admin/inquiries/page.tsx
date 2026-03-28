import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function AdminInquiriesPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')
  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => [])
  const statusLabel: Record<string, string> = { pending: '대기', confirmed: '확인', completed: '완료' }
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">상담 신청 관리</h1>
        <Link href="/admin" className="text-sm text-gray-500 hover:underline">← 대시보드</Link>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {inquiries.length === 0 ? <p className="text-center py-10 text-gray-400">신청이 없습니다.</p> : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500"><tr><th className="px-4 py-3 text-left">이름</th><th className="px-4 py-3">연락처</th><th className="px-4 py-3">서비스</th><th className="px-4 py-3">상태</th><th className="px-4 py-3">날짜</th></tr></thead>
            <tbody className="divide-y divide-gray-50">
              {inquiries.map(i => (
                <tr key={i.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-700">{i.name}</td>
                  <td className="px-4 py-3 text-gray-500">{i.phone}</td>
                  <td className="px-4 py-3 text-gray-500">{i.serviceType}</td>
                  <td className="px-4 py-3 text-center"><span className={`text-xs px-2 py-0.5 rounded-full ${i.status === 'pending' ? 'bg-amber-100 text-amber-700' : i.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{statusLabel[i.status] ?? i.status}</span></td>
                  <td className="px-4 py-3 text-center text-gray-400">{new Date(i.createdAt).toLocaleDateString('ko-KR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

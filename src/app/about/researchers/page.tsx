import { prisma } from '@/lib/prisma'

export const metadata = { title: '연구원 소개 | 서울아이심리발달연구소' }

export default async function ResearchersPage() {
  const researchers = await prisma.researcher
    .findMany({ where: { published: true }, orderBy: { order: 'asc' } })
    .catch(() => [])

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">연구원 소개</h1>
        <p className="text-gray-500">전문 자격을 갖춘 치료사와 연구원들이 함께합니다</p>
        <div className="w-16 h-1 bg-green-600 mx-auto rounded mt-3"></div>
      </div>

      {researchers.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">등록된 연구원이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {researchers.map((researcher) => (
            <div
              key={researcher.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex gap-5 hover:shadow-md transition-shadow"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">👩‍⚕️</span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800">{researcher.name}</h2>
                <p className="text-green-700 font-medium text-sm mb-2">{researcher.title}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {researcher.specialties.split(',').map((s, i) => (
                    <span key={i} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                      {s.trim()}
                    </span>
                  ))}
                </div>
                {researcher.bio && (
                  <p className="text-sm text-gray-500 leading-relaxed">{researcher.bio}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

import { prisma } from '@/lib/prisma'

export const metadata = { title: '프로그램 | 서울아이심리발달연구소' }

export default async function ProgramsPage() {
  const programs = await prisma.program
    .findMany({ where: { published: true }, orderBy: { order: 'asc' } })
    .catch(() => [])

  const categories = Array.from(new Set(programs.map((p) => p.category)))

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">프로그램</h1>
        <p className="text-gray-500">현재 운영 중인 치료 및 발달 프로그램을 안내합니다</p>
        <div className="w-16 h-1 bg-green-600 mx-auto rounded mt-3"></div>
      </div>

      {programs.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">등록된 프로그램이 없습니다.</p>
        </div>
      ) : (
        <>
          {categories.map((cat) => (
            <div key={cat} className="mb-12">
              <h2 className="text-xl font-bold text-green-700 mb-4 pb-2 border-b border-green-100">{cat}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {programs
                  .filter((p) => p.category === cat)
                  .map((prog) => (
                    <div
                      key={prog.id}
                      className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-gray-800">{prog.title}</h3>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex-shrink-0 ml-2">
                          {prog.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">{prog.description}</p>
                      {prog.targetAge && (
                        <p className="text-xs text-gray-400">
                          <strong className="text-gray-600">대상 연령:</strong> {prog.targetAge}
                        </p>
                      )}
                      {prog.details && (
                        <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-50">{prog.details}</p>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

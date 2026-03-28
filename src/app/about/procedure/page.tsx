import Link from 'next/link'

export const metadata = { title: '상담 절차 | 서울아이심리발달연구소' }

const steps = [
  {
    num: '01',
    title: '온라인 상담 신청',
    desc: '홈페이지 온라인 상담 신청 폼을 통해 간편하게 신청하세요. 아이의 나이, 주요 어려움, 원하시는 서비스 유형을 입력해 주세요.',
    icon: '📝',
  },
  {
    num: '02',
    title: '전화 상담 (접수)',
    desc: '담당 상담사가 1~2 영업일 내에 연락드립니다. 전화를 통해 현재 상황과 주요 어려움을 파악하고 초기 안내를 드립니다.',
    icon: '📞',
  },
  {
    num: '03',
    title: '초기 평가 (검사)',
    desc: '전문 평가 도구를 사용하여 아동의 발달 수준, 인지, 정서, 행동 등을 종합적으로 평가합니다. 보호자 면담도 함께 진행됩니다.',
    icon: '🔍',
  },
  {
    num: '04',
    title: '결과 해석 상담',
    desc: '평가 결과를 바탕으로 아이의 강점과 어려움을 설명하고, 권고되는 치료 방향과 서비스 내용을 안내합니다.',
    icon: '📊',
  },
  {
    num: '05',
    title: '치료 계획 수립',
    desc: '아이의 특성에 맞는 개인화된 치료 목표와 계획을 수립합니다. 서비스 빈도, 기간, 방법 등을 결정합니다.',
    icon: '📋',
  },
  {
    num: '06',
    title: '치료/상담 시작',
    desc: '전문 치료사와 함께 정기적인 치료를 시작합니다. 정기적인 경과 점검과 부모 상담을 통해 치료 효과를 높여나갑니다.',
    icon: '🌱',
  },
]

export default function ProcedurePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">상담 절차</h1>
        <p className="text-gray-500">처음 방문하시는 분들을 위한 상담 과정 안내입니다</p>
        <div className="w-16 h-1 bg-green-600 mx-auto rounded mt-3"></div>
      </div>

      <div className="space-y-6">
        {steps.map((step, idx) => (
          <div key={idx} className="flex gap-6 items-start">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                {step.num}
              </div>
              {idx < steps.length - 1 && <div className="w-0.5 h-12 bg-green-200 mt-2"></div>}
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex-1 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{step.icon}</span>
                <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">지금 바로 상담을 신청해보세요</p>
        <Link
          href="/inquiry"
          className="inline-block px-8 py-3 bg-green-700 text-white font-semibold rounded-full hover:bg-green-800 transition-colors"
        >
          온라인 상담 신청
        </Link>
      </div>
    </div>
  )
}

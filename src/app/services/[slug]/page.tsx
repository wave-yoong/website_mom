import { notFound } from 'next/navigation'
import Link from 'next/link'

const services: Record<string, {
  title: string
  subtitle: string
  icon: string
  overview: string
  goals: string[]
  process: string[]
  targetAge: string
  duration: string
}> = {
  'play-therapy': {
    title: '놀이치료',
    subtitle: 'Play Therapy',
    icon: '🎮',
    overview: '놀이치료는 아동의 자연스러운 언어인 놀이를 통해 심리적 문제를 치료하는 전문적인 심리치료 방법입니다. 아이들은 놀이를 통해 자신의 감정, 경험, 생각을 표현하며, 치료사는 이를 바탕으로 아이의 심리적 어려움을 이해하고 치료합니다.',
    goals: ['감정 표현 및 조절 능력 향상', '자아존중감 및 자신감 증진', '불안, 우울, 공격성 감소', '대인관계 기술 향상', '트라우마 치료 및 심리적 회복'],
    process: ['초기 평가 및 치료 목표 설정', '주 1-2회 50분 개인 세션 진행', '정기적 보호자 상담 (월 1회)', '중간 평가 및 목표 재설정', '종결 계획 및 사후 관리'],
    targetAge: '만 3세 ~ 12세',
    duration: '주 1-2회, 6개월 ~ 1년 권장',
  },
  'social-group': {
    title: '사회성그룹치료',
    subtitle: 'Social Group Therapy',
    icon: '👥',
    overview: '사회성그룹치료는 소그룹 환경에서 또래와 함께 사회적 기술을 배우고 연습하는 치료 프로그램입니다. 실제 상황과 유사한 그룹 활동을 통해 의사소통, 협력, 갈등 해결 등 다양한 사회적 기술을 습득합니다.',
    goals: ['또래 관계 형성 능력 향상', '의사소통 기술 향상', '감정 인식 및 공감 능력 발달', '그룹 내 규칙 이해 및 준수', '협동 및 문제 해결 능력 향상'],
    process: ['개인 평가 및 그룹 배정', '주 1회 60-90분 그룹 세션', '소그룹 (4-6명) 구성', '역할극, 게임, 토론 활동 포함', '가정 연계 활동 제공'],
    targetAge: '만 5세 ~ 14세',
    duration: '주 1회, 12-24주 프로그램',
  },
  'cognitive': {
    title: '인지학습치료',
    subtitle: 'Cognitive Learning Therapy',
    icon: '🧠',
    overview: '인지학습치료는 학습 능력과 인지 발달을 지원하는 전문 치료입니다. 집중력, 기억력, 문제 해결 능력 등 학습에 필요한 핵심 인지 기능을 강화하고, 학습 동기와 자신감을 향상시킵니다.',
    goals: ['집중력 및 주의력 향상', '기억력 및 학습 전략 강화', '실행 기능 발달 지원', '학습 불안 감소', '자기 조절 능력 향상'],
    process: ['인지 및 학습 능력 평가', '개인 맞춤 프로그램 설계', '주 1-2회 50분 개별 세션', '컴퓨터 기반 인지 훈련 병행', '학교 및 가정 연계 지원'],
    targetAge: '만 6세 ~ 15세',
    duration: '주 1-2회, 6개월 ~ 1년 권장',
  },
  'language': {
    title: '언어치료',
    subtitle: 'Language Therapy',
    icon: '💬',
    overview: '언어치료는 언어 발달 지연, 발음 문제, 의사소통 장애 등 다양한 언어 관련 어려움을 전문적으로 치료합니다. 언어 이해와 표현 능력을 향상시켜 의사소통 능력을 키웁니다.',
    goals: ['언어 이해 및 표현 능력 향상', '발음 및 조음 개선', '어휘 및 언어 구조 발달', '실용적 의사소통 기술 향상', '읽기/쓰기 기초 능력 지원'],
    process: ['언어 발달 평가', '개인 치료 목표 설정', '주 1-2회 50분 개별 세션', '가정 언어 훈련 지도', '주기적 평가 및 목표 수정'],
    targetAge: '만 2세 ~ 12세',
    duration: '주 1-2회, 6개월 이상 권장',
  },
  'parent-counseling': {
    title: '부모상담',
    subtitle: 'Parent Counseling',
    icon: '💝',
    overview: '부모상담은 자녀 양육의 어려움을 함께 나누고 효과적인 양육 방법을 지원하는 전문 상담입니다. 부모-자녀 관계 개선, 양육 스트레스 감소, 긍정적 양육 기술 향상을 목표로 합니다.',
    goals: ['긍정적 양육 기술 습득', '부모-자녀 의사소통 향상', '양육 스트레스 감소', '자녀 행동 이해 및 대처 능력 향상', '가족 관계 개선'],
    process: ['부모 상담 필요성 평가', '1:1 또는 부부 상담 진행', '격주 1회 50분 세션', '양육 전략 교육 및 실습', '필요시 자녀 치료 연계'],
    targetAge: '영유아 ~ 청소년 자녀를 둔 부모',
    duration: '격주 1회, 3-6개월 권장',
  },
}

export async function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const svc = services[slug]
  if (!svc) return { title: '서비스 | 서울아이심리발달연구소' }
  return { title: `${svc.title} | 서울아이심리발달연구소` }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const svc = services[slug]
  if (!svc) notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">{svc.icon}</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{svc.title}</h1>
        <p className="text-green-600 font-medium text-lg">{svc.subtitle}</p>
        <div className="w-16 h-1 bg-green-600 mx-auto rounded mt-4"></div>
      </div>

      <div className="space-y-8">
        {/* Overview */}
        <div className="bg-green-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-green-800 mb-3">서비스 개요</h2>
          <p className="text-gray-700 leading-relaxed">{svc.overview}</p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-600 text-sm mb-1">👶 대상 연령</h3>
            <p className="text-gray-800 font-medium">{svc.targetAge}</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-600 text-sm mb-1">📅 권장 기간</h3>
            <p className="text-gray-800 font-medium">{svc.duration}</p>
          </div>
        </div>

        {/* Goals */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">치료 목표</h2>
          <ul className="space-y-2">
            {svc.goals.map((goal, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700">
                <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  ✓
                </span>
                {goal}
              </li>
            ))}
          </ul>
        </div>

        {/* Process */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">치료 과정</h2>
          <ol className="space-y-3">
            {svc.process.map((step, i) => (
              <li key={i} className="flex items-center gap-4 text-gray-700">
                <span className="w-7 h-7 bg-green-700 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="text-center">
          <Link
            href="/inquiry"
            className="inline-block px-8 py-3 bg-green-700 text-white font-semibold rounded-full hover:bg-green-800 transition-colors"
          >
            상담 신청하기
          </Link>
        </div>
      </div>
    </div>
  )
}

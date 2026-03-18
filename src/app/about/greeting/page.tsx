export const metadata = { title: '원장 인사말 | 서울아이심리발달연구소' }

export default function GreetingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">원장 인사말</h1>
        <div className="w-16 h-1 bg-green-600 mx-auto rounded"></div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
        <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
          <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
            <span className="text-5xl">👩‍⚕️</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">김민지 원장</h2>
            <p className="text-green-700 font-medium mb-2">Ph.D. 아동심리학 | 공인 놀이치료사</p>
            <p className="text-sm text-gray-500">서울대학교 심리학과 박사 | 아동심리치료 전문가 20년 경력</p>
          </div>
        </div>

        <div className="prose prose-gray max-w-none space-y-5 text-gray-700 leading-relaxed">
          <p>
            안녕하십니까. 서울아이심리발달연구소 원장 김민지입니다.
          </p>
          <p>
            아이들은 각자 고유한 속도로 성장하고 발달합니다. 때로는 그 과정에서 예상치 못한 어려움을 
            마주하기도 하고, 부모님께서 걱정하시는 순간들이 찾아오기도 합니다. 저희 서울아이심리발달연구소는 
            바로 그런 순간에 여러분과 함께하기 위해 설립되었습니다.
          </p>
          <p>
            저는 지난 20여 년간 아동 심리 분야에서 수많은 아이들과 그 가족들을 만나왔습니다. 
            그 경험을 통해 확신한 것이 있습니다. 올바른 시기에 적절한 도움을 받는다면, 
            어떤 아이도 자신의 잠재력을 충분히 발휘할 수 있다는 것입니다.
          </p>
          <p>
            저희 연구소는 과학적 근거에 기반한 최신 치료 프로토콜을 적용하면서도, 
            각 아이의 개성과 특성을 존중하는 맞춤형 접근 방식을 취합니다. 
            놀이치료, 사회성 그룹치료, 인지학습치료, 언어치료, 그리고 부모 상담을 통해 
            아이와 가족 모두가 행복한 일상을 만들어갈 수 있도록 전력을 다하겠습니다.
          </p>
          <p>
            아이의 미래에 투자하는 가장 현명한 선택, 서울아이심리발달연구소와 함께해주세요.
          </p>
          <div className="pt-4">
            <p className="font-semibold text-gray-800">서울아이심리발달연구소 원장</p>
            <p className="text-2xl font-bold text-green-700 mt-1">김민지</p>
          </div>
        </div>
      </div>
    </div>
  )
}

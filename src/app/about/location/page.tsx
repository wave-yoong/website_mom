export const metadata = { title: '오시는 길 | 서울아이심리발달연구소' }

export default function LocationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">오시는 길</h1>
        <p className="text-gray-500">서울아이심리발달연구소를 찾아오시는 방법을 안내합니다</p>
        <div className="w-16 h-1 bg-green-600 mx-auto rounded mt-3"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Map placeholder */}
        <div className="bg-gray-100 rounded-2xl overflow-hidden h-64 md:h-auto flex items-center justify-center">
          <div className="text-center text-gray-400">
            <div className="text-5xl mb-3">🗺️</div>
            <p className="text-sm">지도 서비스</p>
            <p className="text-xs mt-1">서울시 강남구 테헤란로 123</p>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>📍</span> 주소
            </h2>
            <p className="text-gray-700 font-medium">서울시 강남구 테헤란로 123</p>
            <p className="text-gray-500 text-sm mt-1">○○빌딩 5층</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>🚇</span> 대중교통
            </h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong className="text-gray-800">지하철:</strong> 2호선 강남역 3번 출구 도보 5분</p>
              <p><strong className="text-gray-800">버스:</strong> 146, 341, 360, 740번 강남역 하차</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>🚗</span> 자가용
            </h2>
            <p className="text-sm text-gray-600">건물 내 주차장 이용 가능 (2시간 무료)</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>🕐</span> 운영 시간
            </h2>
            <div className="space-y-1 text-sm text-gray-600">
              <p><strong className="text-gray-800">평일:</strong> 09:00 - 18:00</p>
              <p><strong className="text-gray-800">토요일:</strong> 10:00 - 14:00 (격주 운영)</p>
              <p><strong className="text-gray-800">일요일/공휴일:</strong> 휴무</p>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-sm text-green-700">
              <strong>전화 문의:</strong> 02-1234-5678
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

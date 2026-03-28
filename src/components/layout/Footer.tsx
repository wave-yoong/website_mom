import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-lg mb-2">서울아이심리발달연구소</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              아이의 건강한 성장과 발달을 위해<br />
              전문적인 심리 상담 서비스를 제공합니다.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">바로가기</h4>
            <ul className="space-y-1.5 text-sm">
              <li><Link href="/about" className="hover:text-green-400 transition-colors">센터 소개</Link></li>
              <li><Link href="/services/play-therapy" className="hover:text-green-400 transition-colors">치료/상담 서비스</Link></li>
              <li><Link href="/programs" className="hover:text-green-400 transition-colors">프로그램</Link></li>
              <li><Link href="/notice" className="hover:text-green-400 transition-colors">공지사항</Link></li>
              <li><Link href="/inquiry" className="hover:text-green-400 transition-colors">온라인 상담</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">연락처</h4>
            <ul className="space-y-1.5 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-400">📞</span>
                <span>02-1234-5678</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">📍</span>
                <span>서울시 강남구 테헤란로 123</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">🕐</span>
                <span>평일 09:00 - 18:00 (주말 휴무)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>© 2024 서울아이심리발달연구소. All rights reserved.</p>
          <p>사업자등록번호: 123-45-67890</p>
        </div>
      </div>
    </footer>
  )
}

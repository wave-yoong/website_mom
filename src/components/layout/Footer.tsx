import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Center Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">서울</span>
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-tight">서울아이발달지원센터</p>
                <p className="text-gray-400 text-xs">Seoul Child Development Center</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              아이의 성장을 함께하는 전문 발달 치료 센터입니다.<br />
              언어치료, 행동치료, 인지치료, 작업치료, 놀이치료 등<br />
              다양한 전문 치료 서비스를 제공합니다.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <span>서울특별시 강남구 테헤란로 123, 발달빌딩 5층</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-blue-400 flex-shrink-0" />
                <a href="tel:02-123-4567" className="hover:text-white transition-colors">02-123-4567</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-blue-400 flex-shrink-0" />
                <a href="mailto:info@seoulchild.com" className="hover:text-white transition-colors">info@seoulchild.com</a>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p>평일 09:00 ~ 19:00</p>
                  <p>토요일 09:00 ~ 14:00</p>
                  <p className="text-gray-500">일요일 · 공휴일 휴무</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">빠른 링크</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/about', label: '센터소개' },
                { href: '/services', label: '치료서비스' },
                { href: '/programs', label: '프로그램' },
                { href: '/staff', label: '전문가팀' },
                { href: '/notices', label: '공지사항' },
                { href: '/faq', label: '자주 묻는 질문' },
                { href: '/contact', label: '상담신청' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    › {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">치료 서비스</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/services/language-therapy', label: '언어치료' },
                { href: '/services/behavioral-therapy', label: '행동치료' },
                { href: '/services/cognitive-therapy', label: '인지치료' },
                { href: '/services/occupational-therapy', label: '작업치료' },
                { href: '/services/play-therapy', label: '놀이치료' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    › {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} 서울아이발달지원센터. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/admin/login" className="hover:text-gray-400 transition-colors">관리자</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

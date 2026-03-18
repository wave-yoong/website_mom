'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { href: '/about', label: '센터소개' },
  { href: '/services', label: '치료서비스' },
  { href: '/programs', label: '프로그램' },
  { href: '/staff', label: '전문가팀' },
  { href: '/notices', label: '공지사항' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: '상담신청' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-blue-800 text-white text-sm py-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <span className="hidden sm:block">아이의 성장을 함께하는 전문 발달 치료 센터</span>
          <div className="flex items-center gap-4">
            <a href="tel:02-123-4567" className="flex items-center gap-1 hover:text-blue-200 transition-colors">
              <Phone size={13} />
              <span>02-123-4567</span>
            </a>
            <span className="text-blue-300">|</span>
            <span>평일 09:00~19:00 · 토 09:00~14:00</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-800 transition-colors">
              <span className="text-white font-bold text-sm">서울</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-blue-800 font-bold text-lg leading-tight">서울아이발달지원센터</p>
              <p className="text-gray-500 text-xs">Seoul Child Development Center</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href || pathname.startsWith(link.href + '/')
                    ? 'bg-blue-700 text-white'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                } ${link.href === '/contact' ? '!bg-blue-700 !text-white hover:!bg-blue-800 ml-2' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="메뉴 열기"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-2 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href || pathname.startsWith(link.href + '/')
                    ? 'bg-blue-700 text-white'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

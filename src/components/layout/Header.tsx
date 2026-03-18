'use client'

import Link from 'next/link'
import { useState } from 'react'

const navItems = [
  {
    label: '센터 소개',
    href: '/about',
    dropdown: [
      { label: '센터 소개', href: '/about' },
      { label: '원장 인사말', href: '/about/greeting' },
      { label: '연구원 소개', href: '/about/researchers' },
      { label: '상담 절차', href: '/about/procedure' },
      { label: '오시는 길', href: '/about/location' },
    ],
  },
  {
    label: '치료/상담 서비스',
    href: '/services/play-therapy',
    dropdown: [
      { label: '놀이치료', href: '/services/play-therapy' },
      { label: '사회성그룹치료', href: '/services/social-group' },
      { label: '인지학습치료', href: '/services/cognitive' },
      { label: '언어치료', href: '/services/language' },
      { label: '부모상담', href: '/services/parent-counseling' },
    ],
  },
  { label: '프로그램', href: '/programs' },
  { label: '공지사항', href: '/notice' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight">
            <span className="text-lg font-bold text-green-700">서울아이심리발달연구소</span>
            <span className="text-xs text-gray-500">Seoul Child Psychology Center</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, idx) => (
              <div
                key={idx}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(idx)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-700 transition-colors rounded-md hover:bg-green-50"
                >
                  {item.label}
                </Link>
                {item.dropdown && activeDropdown === idx && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg py-2 min-w-[160px] z-50">
                    {item.dropdown.map((sub, sidx) => (
                      <Link
                        key={sidx}
                        href={sub.href}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/inquiry"
              className="ml-2 px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-full hover:bg-green-800 transition-colors"
            >
              온라인 상담
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-green-700"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="메뉴 열기"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-2">
          {navItems.map((item, idx) => (
            <div key={idx}>
              <Link
                href={item.href}
                className="block px-6 py-2 text-sm font-medium text-gray-700 hover:text-green-700 hover:bg-green-50"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.dropdown?.map((sub, sidx) => (
                <Link
                  key={sidx}
                  href={sub.href}
                  className="block px-10 py-1.5 text-xs text-gray-500 hover:text-green-700 hover:bg-green-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="px-6 py-2">
            <Link
              href="/inquiry"
              className="block text-center px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-full hover:bg-green-800 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              온라인 상담
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

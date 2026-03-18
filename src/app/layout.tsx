import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans-kr',
})

export const metadata: Metadata = {
  title: '서울아이심리발달연구소 | Seoul Child Psychology Center',
  description:
    '아이의 건강한 심리 발달을 위한 전문 상담 및 치료 센터입니다. 놀이치료, 사회성그룹치료, 인지학습치료, 언어치료, 부모상담 서비스를 제공합니다.',
  keywords: '아동심리, 놀이치료, 발달상담, 서울, 심리발달연구소',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

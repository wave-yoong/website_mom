import type { Metadata, Viewport } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: {
    default: '서울아이발달지원센터',
    template: '%s | 서울아이발달지원센터',
  },
  description: '아이의 성장을 함께하는 전문 발달 치료 센터. 언어치료, 행동치료, 인지치료, 작업치료, 놀이치료 서비스 제공.',
  keywords: ['발달치료', '언어치료', '작업치료', '행동치료', '아동발달', '서울', '강남'],
  openGraph: {
    title: '서울아이발달지원센터',
    description: '아이의 성장을 함께하는 전문 발달 치료 센터',
    locale: 'ko_KR',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}

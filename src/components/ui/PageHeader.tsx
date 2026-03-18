import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface Breadcrumb {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumbs?: Breadcrumb[]
}

export default function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1 text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home size={14} />
              <span>홈</span>
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center gap-1">
                <ChevronRight size={14} />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">{title}</h1>
        {subtitle && <p className="text-blue-200 text-lg mt-2">{subtitle}</p>}
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { FaqItem } from '@/types'

interface Props {
  items: FaqItem[]
}

const categoryLabels: Record<string, string> = {
  general: '일반',
  therapy: '치료 서비스',
  program: '프로그램',
  payment: '비용 및 보험',
  registration: '등록 및 예약',
}

export default function FaqAccordion({ items }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const categories = Array.from(new Set(items.map((item) => item.category)))

  return (
    <div className="space-y-10">
      {categories.map((category) => {
        const categoryItems = items.filter((item) => item.category === category)
        return (
          <div key={category}>
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="inline-block w-1.5 h-5 bg-blue-700 rounded-full" />
              {categoryLabels[category] ?? category}
            </h2>

            <div className="space-y-2">
              {categoryItems.map((item) => {
                const isExpanded = expandedId === item.id
                return (
                  <div
                    key={item.id}
                    className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                      isExpanded
                        ? 'border-blue-200 shadow-sm'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-blue-50 transition-colors"
                      aria-expanded={isExpanded}
                    >
                      <span
                        className={`text-base font-medium ${
                          isExpanded ? 'text-blue-700' : 'text-gray-800'
                        }`}
                      >
                        {item.question}
                      </span>
                      <ChevronDown
                        size={20}
                        className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-blue-700' : ''
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 bg-blue-50 border-t border-blue-100">
                        <div className="pt-4 space-y-2">
                          {item.answer.split('\n').map((line, i) => {
                            if (!line.trim()) return null
                            return (
                              <p key={i} className="text-gray-700 text-sm leading-relaxed">
                                {line}
                              </p>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

import { DefaultSession } from 'next-auth'

// Extend NextAuth session
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: string
  }
}

export interface AdminUser {
  id: string
  email: string
  name: string
  role: string
  createdAt: Date
  updatedAt: Date
}

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string | null
  imageUrl?: string | null
  isPinned: boolean
  isPublished: boolean
  category: string
  locale: string
  viewCount: number
  createdAt: Date
  updatedAt: Date
}

export interface Service {
  id: string
  title: string
  slug: string
  description: string
  content: string
  imageUrl?: string | null
  icon?: string | null
  order: number
  isPublished: boolean
  locale: string
  createdAt: Date
  updatedAt: Date
}

export interface Program {
  id: string
  title: string
  slug: string
  category: string
  description: string
  content: string
  imageUrl?: string | null
  ageGroup?: string | null
  duration?: string | null
  order: number
  isPublished: boolean
  locale: string
  createdAt: Date
  updatedAt: Date
}

export interface StaffProfile {
  id: string
  name: string
  slug: string
  title: string
  department?: string | null
  bio: string
  specialties: string[]
  education: string[]
  imageUrl?: string | null
  order: number
  isPublished: boolean
  locale: string
  createdAt: Date
  updatedAt: Date
}

export interface FaqItem {
  id: string
  question: string
  answer: string
  category: string
  order: number
  isPublished: boolean
  locale: string
  createdAt: Date
  updatedAt: Date
}

export interface Inquiry {
  id: string
  name: string
  email: string
  phone?: string | null
  childAge?: string | null
  subject: string
  message: string
  status: string
  adminNote?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface SiteSetting {
  id: string
  key: string
  value: string
  locale: string
  createdAt: Date
  updatedAt: Date
}

export interface Upload {
  id: string
  filename: string
  url: string
  mimeType: string
  size: number
  createdAt: Date
}

export type PaginationMeta = {
  total: number
  page: number
  limit: number
  totalPages: number
}

export type ApiResponse<T> = {
  data: T
  meta?: PaginationMeta
  error?: string
}

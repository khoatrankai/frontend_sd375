// Authentication Types
export interface LoginCredentials {
  username: string
  password: string
}

export interface User {
  id: number
  name: string
  email: string
  phone: string
  role: "admin" | "editor" | "author" | "viewer"
  roleName: string
  status: "active" | "inactive" | "pending"
  statusName: string
  unit: string
  lastLogin: string
  avatar?: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: User
  token?: string
}

// Posts Types
export interface Post {
  id: number
  title: string
  content: string
  excerpt: string
  category: string
  status: "published" | "draft" | "pending"
  author: string
  authorId: number
  publishedAt: string
  updatedAt: string
  views: number
  featured: boolean
  image?: string
  tags: string[]
}

export interface PostsResponse {
  posts: Post[]
  total: number
  page: number
  limit: number
}

// Media Types
export interface MediaFile {
  id: number
  name: string
  originalName: string
  type: "image" | "video" | "audio" | "document"
  mimeType: string
  size: number
  url: string
  uploadedAt: string
  uploadedBy: string
  description?: string
}

export interface MediaResponse {
  files: MediaFile[]
  total: number
  page: number
  limit: number
}

// Documents Types
export interface Document {
  id: number
  title: string
  type: "directive" | "notification" | "plan" | "regulation" | "report"
  typeName: string
  unit: string
  author: string
  publishedAt: string
  fileUrl: string
  fileSize: number
  downloads: number
  status: "active" | "archived"
}

export interface DocumentsResponse {
  documents: Document[]
  total: number
  page: number
  limit: number
}

// News Types
export interface NewsItem {
  id: number
  title: string
  content: string
  excerpt: string
  category: "military" | "division" | "domestic" | "international"
  categoryName: string
  author: string
  publishedAt: string
  views: number
  featured: boolean
  image?: string
}

export interface NewsResponse {
  news: NewsItem[]
  total: number
  page: number
  limit: number
}

// Settings Types
export interface SiteSettings {
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  address: string
  enableComments: boolean
  enableRegistration: boolean
  enableNotifications: boolean
  maintenanceMode: boolean
  maxFileSize: string
  allowedFileTypes: string
  backupFrequency: string
  emailNotifications: boolean
  smsNotifications: boolean
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  error?: string
}

export interface PaginationParams {
  page?: number
  limit?: number
  search?: string
  category?: string
  status?: string
  type?: string
}

export enum NewsType {
  TRONG_NUOC = "TRONG_NUOC",
  QUOC_TE = "QUOC_TE",
  KINH_TE = "KINH_TE",
  THE_THAO = "THE_THAO",
  GIAI_TRI = "GIAI_TRI",
}

export interface CategoryNews {
  id: string
  name: string
  nametag: string
  created_at: Date
  updated_at: Date
}

export interface CategoryActivity {
  id: string
  name: string
  nametag: string
  created_at: Date
  updated_at: Date
}

export interface Region {
  id: string
  name: string
  nametag: string
  created_at: Date
  updated_at: Date
}

export interface Slide {
  id: string
  image: string
  title?: string
  description?: string
}

export interface News {
  id: string
  title: string
  excerpt: string
  image: string
  author: string
  date: string
  time: string
  views: number
  type: NewsType
  category: CategoryNews
  categoryActivity: CategoryActivity
  region: Region
  slides: Slide[]
  featured: boolean
  created_at: Date
  updated_at: Date
}

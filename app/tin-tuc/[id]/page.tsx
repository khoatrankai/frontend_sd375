import type { Metadata } from "next"
import NewsDetail from "@/components/news-detail"
import { News, NewsType } from "@/types/news"

// Mock data - replace with actual API call
const mockNews: News = {
  id: "1",
  title: "Tin tức quan trọng về phát triển kinh tế Việt Nam trong năm 2024",
  excerpt:
    "Nền kinh tế Việt Nam đang có những bước phát triển mạnh mẽ với nhiều chính sách mới được triển khai nhằm thúc đẩy tăng trưởng bền vững và nâng cao chất lượng cuộc sống người dân.",
  image: "/placeholder.svg?height=500&width=800",
  author: "Nguyễn Văn A",
  date: "15/12/2024",
  time: "14:30",
  views: 15420,
  type: NewsType.KINH_TE,
  category: {
    id: "1",
    name: "Kinh tế",
    nametag: "kinh-te",
    created_at: new Date(),
    updated_at: new Date(),
  },
  categoryActivity: {
    id: "1",
    name: "Phát triển",
    nametag: "phat-trien",
    created_at: new Date(),
    updated_at: new Date(),
  },
  region: {
    id: "1",
    name: "Hà Nội",
    nametag: "ha-noi",
    created_at: new Date(),
    updated_at: new Date(),
  },
  slides: [
    {
      id: "1",
      image: "/placeholder.svg?height=400&width=800",
      title: "Hình ảnh minh họa 1",
      description: "Mô tả hình ảnh minh họa",
    },
    {
      id: "2",
      image: "/placeholder.svg?height=400&width=800",
      title: "Hình ảnh minh họa 2",
      description: "Mô tả hình ảnh minh họa khác",
    },
  ],
  featured: true,
  created_at: new Date(),
  updated_at: new Date(),
}

const mockRelatedNews: News[] = [
  {
    id: "2",
    title: "Chính sách mới về thuế doanh nghiệp",
    excerpt: "Chính phủ công bố chính sách thuế mới...",
    image: "/placeholder.svg?height=200&width=300",
    author: "Trần Thị B",
    date: "14/12/2024",
    time: "10:15",
    views: 8500,
    type: NewsType.KINH_TE,
    category: mockNews.category,
    categoryActivity: mockNews.categoryActivity,
    region: mockNews.region,
    slides: [],
    featured: false,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "3",
    title: "Thị trường chứng khoán tuần qua",
    excerpt: "Phân tích diễn biến thị trường...",
    image: "/placeholder.svg?height=200&width=300",
    author: "Lê Văn C",
    date: "13/12/2024",
    time: "16:45",
    views: 12300,
    type: NewsType.KINH_TE,
    category: mockNews.category,
    categoryActivity: mockNews.categoryActivity,
    region: mockNews.region,
    slides: [],
    featured: false,
    created_at: new Date(),
    updated_at: new Date(),
  },
]

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // In real app, fetch news data based on params.id
  return {
    title: mockNews.title,
    description: mockNews.excerpt,
    openGraph: {
      title: mockNews.title,
      description: mockNews.excerpt,
      images: [mockNews.image],
    },
  }
}

export default function NewsPage({ params }: { params: { id: string } }) {
  // In real app, fetch news data based on params.id
  // const news = await fetchNewsById(params.id);
  // const relatedNews = await fetchRelatedNews(news.category.id);

  return (
    <div className="w-full">
      <NewsDetail news={mockNews} relatedNews={mockRelatedNews} />
    </div>
  )
}

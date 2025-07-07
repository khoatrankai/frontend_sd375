"use client"
import type { Metadata } from "next"
import NewsDetail from "@/components/news-detail"
import { News, NewsType } from "@/types/news"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { newsService } from "@/services/news.service"
import { articlesService } from "@/services/articles.service"
import ArticleDetail from "@/components/articles-detail"

// Mock data - replace with actual API call


// const mockRelatedNews: News[] = [
//   {
//     id: "2",
//     title: "Chính sách mới về thuế doanh nghiệp",
//     excerpt: "Chính phủ công bố chính sách thuế mới...",
//     image: "/placeholder.svg?height=200&width=300",
//     author: "Trần Thị B",
//     date: "14/12/2024",
//     time: "10:15",
//     views: 8500,
//     type: NewsType.KINH_TE,
//     category: mockNews.category,
//     categoryActivity: mockNews.categoryActivity,
//     region: mockNews.region,
//     slides: [],
//     featured: false,
//     created_at: new Date(),
//     updated_at: new Date(),
//   },
//   {
//     id: "3",
//     title: "Thị trường chứng khoán tuần qua",
//     excerpt: "Phân tích diễn biến thị trường...",
//     image: "/placeholder.svg?height=200&width=300",
//     author: "Lê Văn C",
//     date: "13/12/2024",
//     time: "16:45",
//     views: 12300,
//     type: NewsType.KINH_TE,
//     category: mockNews.category,
//     categoryActivity: mockNews.categoryActivity,
//     region: mockNews.region,
//     slides: [],
//     featured: false,
//     created_at: new Date(),
//     updated_at: new Date(),
//   },
// ]

// export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
//   // In real app, fetch news data based on params.id
//   return {
//     title: mockNews.title,
//     description: mockNews.excerpt,
//     openGraph: {
//       title: mockNews.title,
//       description: mockNews.excerpt,
//       images: [mockNews.image],
//     },
//   }
// }

export default function ArticalesPage({ params }: { params: { id: string } }) {
  const {id} = useParams()
  const [mockNews,setMockNews] = useState<any>({
  
})

const fetchData = async()=>{
  const res = await articlesService.getArticle(id as string)
  if(res.statusCode === 200){
    setMockNews(res.data)
  }
}

useEffect(()=>{
  fetchData()
},[id])
  // In real app, fetch news data based on params.id
  // const news = await fetchNewsById(params.id);
  // const relatedNews = await fetchRelatedNews(news.category.id);

  return (
    <div className="w-full">
      <ArticleDetail article={mockNews} />
    </div>
  )
}

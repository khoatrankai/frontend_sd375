"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Eye, User, ChevronRight } from "lucide-react"
import { newsService } from "@/services/news.service"

export default function NewsPage() {
  const [activeType, setActiveType] = useState("all")
  const [types,setTypes] = useState([
    { id: "all", name: "Tất cả" },
    { id: "trong_nuoc", name: "Trong nước" },
    { id: "quoc_te", name: "Quốc tế" },
    { id: "quan_su", name: "Quân sự" },
    { id: "hoat_dong_su_doan", name: "Hoạt động Sư đoàn" },
  ])

  const [news,setNews] = useState([
   {
    "id":"abc",
  "title": "Giải bóng đá học sinh 2025",
  "excerpt": "Giải đấu năm nay quy tụ hơn 30 trường tham dự...",
  "image": "https://example.com/images/school-sports.jpg",
  "author": "Trần Tấn Khoa",
  "date": "2025-06-20",
  "time": "10:30",
  "views": 123,
  "type": "trong_nuoc",             // <-- Phải đúng giá trị trong enum NewsType
  "category": "83230BE7-7B4D-F011-9263-8C47BE21632B",
  "categoryActivity": "68F67D1B-744D-F011-9263-8C47BE21632B",
  "region": "B3FD84A6-BE4C-F011-9262-8C47BE21632B",
  "featured": true
}
  ])

  const [filteredNews,setFilteredNews] = useState([])
  // activeCategory === "all" ? news : news.filter((item) => item.category === activeCategory)

  const [featuredNews,setFeaturedNews] = useState([])
  // news.filter((item) => item.featured)
  const [regularNews,setRegularNews] = useState([]) 
  // filteredNews.filter((item) => !item.featured)
  const fetchData = async()=>{
    const res = await newsService.getPosts() as any
    console.log(res)
    if(res.statusCode === 200){
      setNews(res.data)
    }
  }

  useEffect(()=>{
    setRegularNews(filteredNews.filter((item:any) => !item.featured))
  },[filteredNews])

  useEffect(()=>{
    setFilteredNews((activeType === "all" ? news : news.filter((item) => item.type === activeType)) as any)
  },[news,activeType])

  useEffect(()=>{
    setFeaturedNews(news.filter((i)=> i.featured) as any)
  },[news])
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Tin tức</h1>
        <p className="text-lg text-gray-600">
          Cập nhật thông tin mới nhất về hoạt động của Sư đoàn và tình hình trong nước, quốc tế
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {types.map((category) => (
          <Button
            key={category.id}
            variant={activeType === category.id ? "default" : "outline"}
            onClick={() => setActiveType(category.id)}
            className="flex items-center space-x-2"
          >
            <span>{category.name}</span>
            <Badge variant="secondary" className="ml-2">
              {news.filter((i)=>i.type === category.id).length}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Featured News */}
      {activeType === "all" && featuredNews.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">Tin nổi bật</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredNews.map((item:any) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <img src={process.env.NEXT_PUBLIC_API_CLIENT+item.image || "/public/placeholder.svg"} alt={item.title} className="w-full h-64 object-cover" />
                  <Badge className="absolute top-4 left-4 bg-red-600">{types.find((i)=> i.id === item.type)?.name}</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {item.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {item.time}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {item.views}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Regular News */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">
          {activeType === "all" ? "Tin tức khác" : types.find((c) => c.id === activeType)?.name}
        </h2>
        <div className="space-y-6">
          {regularNews.map((item:any) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={process.env.NEXT_PUBLIC_API_CLIENT+item.image || "/public/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline">{types.find((i)=> i.id === item.type)?.name}</Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {item.time}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-red-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{item.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {item.author}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {item.views}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Đọc thêm
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Xem thêm tin tức
        </Button>
      </div>
    </div>
  )
}

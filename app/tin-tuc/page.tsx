"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Eye, User, ChevronRight } from "lucide-react"

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", name: "Tất cả", count: 45 },
    { id: "domestic", name: "Trong nước", count: 15 },
    { id: "international", name: "Quốc tế", count: 8 },
    { id: "military", name: "Quân sự", count: 12 },
    { id: "division", name: "Hoạt động Sư đoàn", count: 10 },
  ]

  const news = [
    {
      id: 1,
      title: "Hội nghị tổng kết công tác năm 2024 và triển khai nhiệm vụ năm 2025",
      excerpt:
        "Sáng ngày 15/12/2024, Sư đoàn phòng không 375 đã tổ chức hội nghị tổng kết toàn diện các mặt công tác trong năm 2024 và triển khai phương hướng nhiệm vụ năm 2025...",
      image: "/placeholder.svg?height=200&width=300",
      category: "division",
      categoryName: "Hoạt động Sư đoàn",
      author: "Ban biên tập",
      date: "15/12/2024",
      time: "2 giờ trước",
      views: 1250,
      featured: true,
    },
    {
      id: 2,
      title: "Diễn tập phòng thủ khu vực quy mô lớn năm 2024",
      excerpt:
        "Cuộc diễn tập nhằm nâng cao khả năng phối hợp tác chiến giữa các lực lượng trong khu vực phòng thủ, kiểm tra khả năng sẵn sàng chiến đấu của các đơn vị...",
      image: "/placeholder.svg?height=200&width=300",
      category: "military",
      categoryName: "Quân sự",
      author: "Phòng Tham mưu",
      date: "12/12/2024",
      time: "4 giờ trước",
      views: 980,
      featured: true,
    },
    {
      id: 3,
      title: "Kỷ niệm 79 năm Ngày thành lập Quân đội nhân dân Việt Nam",
      excerpt:
        "Với tinh thần trang trọng và ý nghĩa sâu sắc, Sư đoàn phòng không 375 đã tổ chức lễ kỷ niệm 79 năm Ngày thành lập Quân đội nhân dân Việt Nam...",
      image: "/placeholder.svg?height=200&width=300",
      category: "domestic",
      categoryName: "Trong nước",
      author: "Phòng Chính trị",
      date: "22/12/2024",
      time: "1 ngày trước",
      views: 756,
      featured: false,
    },
    {
      id: 4,
      title: "Tình hình an ninh khu vực Đông Nam Á năm 2024",
      excerpt:
        "Báo cáo tổng quan về tình hình an ninh, quốc phòng khu vực Đông Nam Á trong năm 2024, những thách thức và cơ hội trong thời gian tới...",
      image: "/placeholder.svg?height=200&width=300",
      category: "international",
      categoryName: "Quốc tế",
      author: "Phòng Tình báo",
      date: "10/12/2024",
      time: "5 ngày trước",
      views: 642,
      featured: false,
    },
    {
      id: 5,
      title: "Hội thi 'Bàn tay vàng' năm 2024",
      excerpt:
        "Hội thi nhằm tôn vinh những cá nhân có thành tích xuất sắc trong công tác kỹ thuật, bảo dưỡng vũ khí trang bị...",
      image: "/placeholder.svg?height=200&width=300",
      category: "division",
      categoryName: "Hoạt động Sư đoàn",
      author: "Phòng HC-KT",
      date: "08/12/2024",
      time: "1 tuần trước",
      views: 445,
      featured: false,
    },
  ]

  const filteredNews = activeCategory === "all" ? news : news.filter((item) => item.category === activeCategory)

  const featuredNews = news.filter((item) => item.featured)
  const regularNews = filteredNews.filter((item) => !item.featured)

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
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            onClick={() => setActiveCategory(category.id)}
            className="flex items-center space-x-2"
          >
            <span>{category.name}</span>
            <Badge variant="secondary" className="ml-2">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Featured News */}
      {activeCategory === "all" && featuredNews.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">Tin nổi bật</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredNews.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-64 object-cover" />
                  <Badge className="absolute top-4 left-4 bg-red-600">{item.categoryName}</Badge>
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
          {activeCategory === "all" ? "Tin tức khác" : categories.find((c) => c.id === activeCategory)?.name}
        </h2>
        <div className="space-y-6">
          {regularNews.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline">{item.categoryName}</Badge>
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

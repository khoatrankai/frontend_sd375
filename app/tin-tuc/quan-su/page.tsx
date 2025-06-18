"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Eye, User, ChevronRight, Shield, Target, Zap } from "lucide-react"

export default function MilitaryNewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "Tất cả", count: 32, icon: Shield },
    { id: "weapons", name: "Vũ khí trang bị", count: 12, icon: Target },
    { id: "tactics", name: "Chiến thuật", count: 8, icon: Zap },
    { id: "technology", name: "Công nghệ quân sự", count: 7, icon: Shield },
    { id: "defense", name: "Quốc phòng", count: 5, icon: Target },
  ]

  const news = [
    {
      id: 1,
      title: "Hệ thống tên lửa phòng không S-400: Khả năng và ứng dụng",
      excerpt:
        "Phân tích chi tiết về khả năng tác chiến và ưu điểm của hệ thống tên lửa phòng không S-400 trong bảo vệ không phần...",
      image: "/public/placeholder.svg?height=200&width=300",
      author: "Thiếu tá Nguyễn Văn A",
      date: "20/12/2024",
      time: "2 giờ trước",
      views: 2890,
      category: "weapons",
      categoryName: "Vũ khí trang bị",
      featured: true,
    },
    {
      id: 2,
      title: "Chiến thuật phòng không tầng thấp trong điều kiện hiện đại",
      excerpt:
        "Nghiên cứu về các chiến thuật phòng không tầng thấp phù hợp với điều kiện tác chiến hiện đại và địa hình Việt Nam...",
      image: "/public/placeholder.svg?height=200&width=300",
      author: "Trung tá Trần Văn B",
      date: "18/12/2024",
      time: "3 ngày trước",
      views: 2340,
      category: "tactics",
      categoryName: "Chiến thuật",
      featured: true,
    },
    {
      id: 3,
      title: "Ứng dụng AI trong hệ thống chỉ huy tự động",
      excerpt:
        "Xu hướng ứng dụng trí tuệ nhân tạo trong các hệ thống chỉ huy tự động của lực lượng phòng không hiện đại...",
      image: "/public/placeholder.svg?height=200&width=300",
      author: "Thượng tá Lê Văn C",
      date: "15/12/2024",
      time: "5 ngày trước",
      views: 1890,
      category: "technology",
      categoryName: "Công nghệ quân sự",
      featured: false,
    },
    {
      id: 4,
      title: "Phát triển công nghiệp quốc phòng trong thời đại 4.0",
      excerpt: "Định hướng phát triển công nghiệp quốc phòng Việt Nam trong bối cảnh cách mạng công nghiệp 4.0...",
      image: "/public/placeholder.svg?height=200&width=300",
      author: "Đại tá Phạm Văn D",
      date: "12/12/2024",
      time: "1 tuần trước",
      views: 1567,
      category: "defense",
      categoryName: "Quốc phòng",
      featured: false,
    },
    {
      id: 5,
      title: "Radar cảnh báo sớm: Mắt thần của phòng không",
      excerpt: "Vai trò quan trọng của hệ thống radar cảnh báo sớm trong mạng lưới phòng không quốc gia...",
      image: "/public/placeholder.svg?height=200&width=300",
      author: "Thiếu tá Hoàng Văn E",
      date: "10/12/2024",
      time: "10 ngày trước",
      views: 1234,
      category: "weapons",
      categoryName: "Vũ khí trang bị",
      featured: false,
    },
    {
      id: 6,
      title: "Chiến thuật phối hợp binh chủng trong tác chiến phòng không",
      excerpt: "Phương pháp phối hợp hiệu quả giữa các binh chủng trong tác chiến phòng không hiện đại...",
      image: "/public/placeholder.svg?height=200&width=300",
      author: "Trung tá Vũ Văn F",
      date: "08/12/2024",
      time: "2 tuần trước",
      views: 987,
      category: "tactics",
      categoryName: "Chiến thuật",
      featured: false,
    },
  ]

  const filteredNews = selectedCategory === "all" ? news : news.filter((item) => item.category === selectedCategory)
  const featuredNews = filteredNews.filter((item) => item.featured)
  const regularNews = filteredNews.filter((item) => !item.featured)

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Tin tức quân sự</h1>
        <p className="text-lg text-gray-600">
          Thông tin chuyên sâu về vũ khí, trang bị, chiến thuật và công nghệ quân sự
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center space-x-2"
          >
            <category.icon className="h-4 w-4" />
            <span>{category.name}</span>
            <Badge variant="secondary" className="ml-2">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">Tin nổi bật</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredNews.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <img src={item.image || "/public/placeholder.svg"} alt={item.title} className="w-full h-64 object-cover" />
                  <Badge className="absolute top-4 left-4 bg-red-600">{item.categoryName}</Badge>
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    {item.views}
                  </div>
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
          {selectedCategory === "all" ? "Tin tức khác" : categories.find((c) => c.id === selectedCategory)?.name}
        </h2>
        <div className="space-y-6">
          {regularNews.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={item.image || "/public/placeholder.svg"}
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

      {/* Military Technology Showcase */}
      <Card className="bg-gradient-to-r from-green-50 to-green-100 mt-12">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center mb-6">Công nghệ quân sự hiện đại</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Hệ thống tên lửa</h4>
              <p className="text-sm text-gray-600">Công nghệ tên lửa phòng không tiên tiến</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Radar cảnh báo</h4>
              <p className="text-sm text-gray-600">Hệ thống radar thế hệ mới</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Chỉ huy tự động</h4>
              <p className="text-sm text-gray-600">Hệ thống C4ISR hiện đại</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Xem thêm tin tức quân sự
        </Button>
      </div>
    </div>
  )
}

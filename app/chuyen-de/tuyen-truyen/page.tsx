"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Megaphone, Clock, Eye, User, ChevronRight, Users, BookOpen, Radio } from "lucide-react"

export default function PropagandaPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")

  const filters = [
    { id: "all", name: "Tất cả", count: 10 },
    { id: "education", name: "Giáo dục chính trị", count: 4 },
    { id: "media", name: "Truyền thông", count: 3 },
    { id: "culture", name: "Văn hóa", count: 3 },
  ]

  const articles = [
    {
      id: 1,
      title: "Nâng cao hiệu quả công tác tuyên truyền trong đơn vị quân đội",
      excerpt:
        "Những phương pháp và kinh nghiệm trong việc triển khai công tác tuyên truyền, giáo dục chính trị tư tưởng cho cán bộ, chiến sĩ. Xây dựng hệ thống tuyên truyền đa dạng và hiệu quả...",
      author: "Đại úy Trần Thị B",
      date: "12/12/2024",
      views: 980,
      readTime: "6 phút",
      category: "education",
      categoryName: "Giáo dục chính trị",
      featured: true,
      tags: ["Tuyên truyền", "Giáo dục", "Chính trị", "Đơn vị"],
    },
    {
      id: 2,
      title: "Vai trò của truyền thông trong xây dựng hình ảnh quân đội",
      excerpt:
        "Phân tích vai trò quan trọng của hoạt động truyền thông trong việc xây dựng và quảng bá hình ảnh Quân đội nhân dân Việt Nam trong thời kỳ mới...",
      author: "Thiếu tá Vũ Văn F",
      date: "03/12/2024",
      views: 523,
      readTime: "9 phút",
      category: "media",
      categoryName: "Truyền thông",
      featured: true,
      tags: ["Truyền thông", "Hình ảnh", "Quân đội", "Xã hội"],
    },
    {
      id: 3,
      title: "Xây dựng văn hóa đơn vị trong thời kỳ mới",
      excerpt:
        "Kinh nghiệm xây dựng và phát triển văn hóa đơn vị, tạo môi trường văn hóa tích cực, góp phần nâng cao tinh thần và ý chí chiến đấu...",
      author: "Trung tá Nguyễn Văn G",
      date: "28/11/2024",
      views: 756,
      readTime: "8 phút",
      category: "culture",
      categoryName: "Văn hóa",
      featured: false,
      tags: ["Văn hóa", "Đơn vị", "Tinh thần", "Xây dựng"],
    },
    {
      id: 4,
      title: "Ứng dụng công nghệ trong công tác tuyên truyền",
      excerpt:
        "Nghiên cứu về việc ứng dụng các công nghệ hiện đại như mạng xã hội, multimedia trong công tác tuyên truyền để nâng cao hiệu quả...",
      author: "Đại úy Lê Thị H",
      date: "25/11/2024",
      views: 642,
      readTime: "7 phút",
      category: "media",
      categoryName: "Truyền thông",
      featured: false,
      tags: ["Công nghệ", "Multimedia", "Hiệu quả", "Hiện đại"],
    },
    {
      id: 5,
      title: "Giáo dục truyền thống cách mạng cho thế hệ trẻ",
      excerpt:
        "Phương pháp giáo dục truyền thống cách mạng cho cán bộ, chiến sĩ trẻ, giúp họ hiểu rõ lịch sử và truyền thống vẻ vang của quân đội...",
      author: "Thiếu tá Phạm Văn I",
      date: "20/11/2024",
      views: 445,
      readTime: "10 phút",
      category: "education",
      categoryName: "Giáo dục chính trị",
      featured: false,
      tags: ["Truyền thống", "Giáo dục", "Thế hệ trẻ", "Lịch sử"],
    },
  ]

  const filteredArticles =
    selectedFilter === "all" ? articles : articles.filter((article) => article.category === selectedFilter)

  const featuredArticles = filteredArticles.filter((article) => article.featured)
  const regularArticles = filteredArticles.filter((article) => !article.featured)

  const stats = [
    { label: "Bài viết", value: "10", icon: BookOpen, color: "text-blue-600" },
    { label: "Lượt xem", value: "4,346", icon: Eye, color: "text-green-600" },
    { label: "Chuyên gia", value: "6", icon: Users, color: "text-purple-600" },
    { label: "Chủ đề", value: "3", icon: Megaphone, color: "text-orange-600" },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Thông tin tuyên truyền</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Chuyên đề về công tác thông tin tuyên truyền, giáo dục chính trị và xây dựng văn hóa trong quân đội
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${stat.color.replace("text-", "bg-").replace("-600", "-100")}`}
              >
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={selectedFilter === filter.id ? "default" : "outline"}
            onClick={() => setSelectedFilter(filter.id)}
            className="flex items-center space-x-2"
          >
            <Megaphone className="h-4 w-4" />
            <span>{filter.name}</span>
            <Badge variant="secondary" className="ml-2">
              {filter.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">Bài viết nổi bật</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge className="bg-red-600">{article.categoryName}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-red-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {article.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.date}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {article.views}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Regular Articles */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">
          {selectedFilter === "all" ? "Tất cả bài viết" : filters.find((f) => f.id === selectedFilter)?.name}
        </h2>
        <div className="space-y-6">
          {regularArticles.map((article) => (
            <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline">{article.categoryName}</Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-red-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {article.author}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {article.views}
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

      {/* Propaganda Methods Showcase */}
      <Card className="bg-gradient-to-r from-green-50 to-green-100 mt-12">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center mb-6">Phương pháp tuyên truyền hiện đại</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Radio className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Truyền thông số</h4>
              <p className="text-sm text-gray-600">Ứng dụng mạng xã hội và nền tảng số</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Giáo dục trực tiếp</h4>
              <p className="text-sm text-gray-600">Tổ chức các buổi học tập, tọa đàm</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Tài liệu học tập</h4>
              <p className="text-sm text-gray-600">Biên soạn và phát hành tài liệu</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

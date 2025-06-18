"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Settings, Clock, Eye, User, ChevronRight, TrendingUp, FileText, Zap } from "lucide-react"

export default function CCHCPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")

  const filters = [
    { id: "all", name: "Tất cả", count: 12 },
    { id: "digital-transformation", name: "Chuyển đổi số", count: 5 },
    { id: "administrative-reform", name: "Cải cách hành chính", count: 4 },
    { id: "e-government", name: "Chính phủ điện tử", count: 3 },
  ]

  const articles = [
    {
      id: 1,
      title: "Chuyển đổi số trong quản lý quân sự - Xu hướng và thực tiễn",
      excerpt:
        "Phân tích xu hướng chuyển đổi số trong lĩnh vực quân sự, những thành tựu đạt được và định hướng phát triển trong thời gian tới. Nghiên cứu các mô hình ứng dụng công nghệ số...",
      author: "Thiếu tá Nguyễn Văn A",
      date: "15/12/2024",
      views: 1250,
      readTime: "8 phút",
      category: "digital-transformation",
      categoryName: "Chuyển đổi số",
      featured: true,
      tags: ["Chuyển đổi số", "Quản lý", "Công nghệ", "Quân sự"],
    },
    {
      id: 2,
      title: "Cải cách thủ tục hành chính trong lĩnh vực quốc phòng",
      excerpt:
        "Đánh giá kết quả cải cách thủ tục hành chính, những khó khăn và giải pháp nâng cao chất lượng phục vụ người dân và doanh nghiệp trong lĩnh vực quốc phòng...",
      author: "Đại úy Hoàng Thị B",
      date: "12/12/2024",
      views: 980,
      readTime: "7 phút",
      category: "administrative-reform",
      categoryName: "Cải cách hành chính",
      featured: true,
      tags: ["CCHC", "Thủ tục", "Cải cách", "Phục vụ"],
    },
    {
      id: 3,
      title: "Xây dựng chính phủ điện tử trong quân đội",
      excerpt:
        "Kinh nghiệm triển khai chính phủ điện tử trong các đơn vị quân đội, từ việc số hóa quy trình đến ứng dụng công nghệ thông tin trong quản lý...",
      author: "Trung tá Lê Văn C",
      date: "10/12/2024",
      views: 756,
      readTime: "10 phút",
      category: "e-government",
      categoryName: "Chính phủ điện tử",
      featured: false,
      tags: ["Chính phủ điện tử", "Số hóa", "Quản lý"],
    },
    {
      id: 4,
      title: "Ứng dụng AI trong cải cách hành chính",
      excerpt:
        "Nghiên cứu về việc ứng dụng trí tuệ nhân tạo để tối ưu hóa quy trình hành chính, giảm thời gian xử lý và nâng cao hiệu quả công việc...",
      author: "Thiếu tá Phạm Văn D",
      date: "08/12/2024",
      views: 642,
      readTime: "12 phút",
      category: "digital-transformation",
      categoryName: "Chuyển đổi số",
      featured: false,
      tags: ["AI", "Tự động hóa", "Hiệu quả"],
    },
    {
      id: 5,
      title: "Đánh giá hiệu quả cải cách hành chính giai đoạn 2021-2024",
      excerpt:
        "Tổng kết và đánh giá kết quả thực hiện cải cách hành chính trong giai đoạn 2021-2024, những thành tựu đạt được và bài học kinh nghiệm...",
      author: "Đại tá Vũ Văn E",
      date: "05/12/2024",
      views: 523,
      readTime: "15 phút",
      category: "administrative-reform",
      categoryName: "Cải cách hành chính",
      featured: false,
      tags: ["Đánh giá", "Kết quả", "Kinh nghiệm"],
    },
  ]

  const filteredArticles =
    selectedFilter === "all" ? articles : articles.filter((article) => article.category === selectedFilter)

  const featuredArticles = filteredArticles.filter((article) => article.featured)
  const regularArticles = filteredArticles.filter((article) => !article.featured)

  const stats = [
    { label: "Bài viết", value: "12", icon: FileText, color: "text-blue-600" },
    { label: "Lượt xem", value: "8,547", icon: Eye, color: "text-green-600" },
    { label: "Tác giả", value: "8", icon: User, color: "text-purple-600" },
    { label: "Cập nhật", value: "Hàng tuần", icon: TrendingUp, color: "text-orange-600" },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">CCHC & Chuyển đổi số</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Chuyên đề về cải cách hành chính và chuyển đổi số trong lĩnh vực quốc phòng
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
            <Settings className="h-4 w-4" />
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

      {/* Digital Transformation Showcase */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 mt-12">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center mb-6">Chuyển đổi số trong quân đội</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Tự động hóa quy trình</h4>
              <p className="text-sm text-gray-600">Số hóa và tự động hóa các quy trình hành chính</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Nâng cao hiệu quả</h4>
              <p className="text-sm text-gray-600">Giảm thời gian xử lý và chi phí vận hành</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Cải thiện dịch vụ</h4>
              <p className="text-sm text-gray-600">Nâng cao chất lượng phục vụ người dân</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

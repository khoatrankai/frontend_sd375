"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Settings, Megaphone, Scale, Microscope, Clock, User, Eye, ChevronRight, FileText } from "lucide-react"

export default function SpecialTopicsPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    {
      id: "all",
      name: "Tất cả",
      icon: FileText,
      count: 28,
      description: "Tất cả chuyên đề",
    },
    {
      id: "cchc",
      name: "CCHC & Chuyển đổi số",
      icon: Settings,
      count: 8,
      description: "Cải cách hành chính và chuyển đổi số",
    },
    {
      id: "propaganda",
      name: "Thông tin tuyên truyền",
      icon: Megaphone,
      count: 7,
      description: "Công tác thông tin tuyên truyền",
    },
    {
      id: "law",
      name: "Thông tin Pháp luật",
      icon: Scale,
      count: 6,
      description: "Thông tin pháp luật và quy định",
    },
    {
      id: "science",
      name: "Thông tin KHQS",
      icon: Microscope,
      count: 7,
      description: "Khoa học quân sự",
    },
  ]

  const topics = [
    {
      id: 1,
      title: "Chuyển đổi số trong quản lý quân sự - Xu hướng và thực tiễn",
      excerpt:
        "Phân tích xu hướng chuyển đổi số trong lĩnh vực quân sự, những thành tựu đạt được và định hướng phát triển trong thời gian tới...",
      category: "cchc",
      categoryName: "CCHC & Chuyển đổi số",
      author: "Thiếu tá Nguyễn Văn A",
      date: "15/12/2024",
      views: 1250,
      readTime: "8 phút",
      featured: true,
      tags: ["Chuyển đổi số", "Quản lý", "Công nghệ"],
    },
    {
      id: 2,
      title: "Nâng cao hiệu quả công tác tuyên truyền trong đơn vị quân đội",
      excerpt:
        "Những phương pháp và kinh nghiệm trong việc triển khai công tác tuyên truyền, giáo dục chính trị tư tưởng cho cán bộ, chiến sĩ...",
      category: "propaganda",
      categoryName: "Thông tin tuyên truyền",
      author: "Đại úy Trần Thị B",
      date: "12/12/2024",
      views: 980,
      readTime: "6 phút",
      featured: true,
      tags: ["Tuyên truyền", "Giáo dục", "Chính trị"],
    },
    {
      id: 3,
      title: "Luật Quốc phòng 2018 - Những điểm mới và ý nghĩa",
      excerpt:
        "Phân tích những điểm mới trong Luật Quốc phòng 2018, tác động và ý nghĩa đối với hoạt động của lực lượng vũ trang...",
      category: "law",
      categoryName: "Thông tin Pháp luật",
      author: "Thiếu tá Lê Văn C",
      date: "10/12/2024",
      views: 756,
      readTime: "10 phút",
      featured: false,
      tags: ["Luật Quốc phòng", "Pháp luật", "Quy định"],
    },
    {
      id: 4,
      title: "Ứng dụng trí tuệ nhân tạo trong tác chiến phòng không",
      excerpt:
        "Nghiên cứu về việc ứng dụng công nghệ AI trong hệ thống phòng không hiện đại, những ưu điểm và thách thức...",
      category: "science",
      categoryName: "Thông tin KHQS",
      author: "Trung tá Phạm Văn D",
      date: "08/12/2024",
      views: 642,
      readTime: "12 phút",
      featured: false,
      tags: ["AI", "Phòng không", "Công nghệ"],
    },
    {
      id: 5,
      title: "Cải cách thủ tục hành chính trong lĩnh vực quốc phòng",
      excerpt:
        "Đánh giá kết quả cải cách thủ tục hành chính, những khó khăn và giải pháp nâng cao chất lượng phục vụ...",
      category: "cchc",
      categoryName: "CCHC & Chuyển đổi số",
      author: "Đại úy Hoàng Thị E",
      date: "05/12/2024",
      views: 445,
      readTime: "7 phút",
      featured: false,
      tags: ["CCHC", "Thủ tục", "Cải cách"],
    },
    {
      id: 6,
      title: "Vai trò của truyền thông trong xây dựng hình ảnh quân đội",
      excerpt:
        "Phân tích vai trò quan trọng của hoạt động truyền thông trong việc xây dựng và quảng bá hình ảnh Quân đội nhân dân...",
      category: "propaganda",
      categoryName: "Thông tin tuyên truyền",
      author: "Thiếu tá Vũ Văn F",
      date: "03/12/2024",
      views: 523,
      readTime: "9 phút",
      featured: false,
      tags: ["Truyền thông", "Hình ảnh", "Quân đội"],
    },
  ]

  const filteredTopics = activeCategory === "all" ? topics : topics.filter((topic) => topic.category === activeCategory)

  const featuredTopics = filteredTopics.filter((topic) => topic.featured)
  const regularTopics = filteredTopics.filter((topic) => !topic.featured)

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Chuyên đề</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Các chuyên đề chuyên sâu về cải cách hành chính, chuyển đổi số, tuyên truyền, pháp luật và khoa học quân sự
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {categories.slice(1).map((category) => (
          <Card
            key={category.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              activeCategory === category.id ? "ring-2 ring-red-500 bg-red-50" : ""
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            <CardContent className="p-6 text-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  activeCategory === category.id ? "bg-red-600 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                <category.icon className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{category.description}</p>
              <Badge variant={activeCategory === category.id ? "default" : "secondary"}>
                {category.count} bài viết
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            onClick={() => setActiveCategory(category.id)}
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

      {/* Featured Topics */}
      {featuredTopics.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">Chuyên đề nổi bật</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredTopics.map((topic) => (
              <Card key={topic.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge className="bg-red-600">{topic.categoryName}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {topic.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-red-600 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{topic.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {topic.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {topic.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {topic.date}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {topic.views}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Regular Topics */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">
          {activeCategory === "all" ? "Tất cả chuyên đề" : categories.find((c) => c.id === activeCategory)?.name}
        </h2>
        <div className="space-y-6">
          {regularTopics.map((topic) => (
            <Card key={topic.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline">{topic.categoryName}</Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {topic.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-red-600 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{topic.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {topic.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {topic.author}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {topic.views}
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
          Xem thêm chuyên đề
        </Button>
      </div>
    </div>
  )
}

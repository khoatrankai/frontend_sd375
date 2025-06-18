"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Eye, User, ChevronRight, Users, Award, Calendar, Activity } from "lucide-react"

export default function DivisionNewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "Tất cả", count: 28, icon: Activity },
    { id: "training", name: "Huấn luyện", count: 10, icon: Users },
    { id: "competition", name: "Thi đua", count: 8, icon: Award },
    { id: "meeting", name: "Hội nghị", count: 6, icon: Calendar },
    { id: "daily", name: "Sinh hoạt", count: 4, icon: Users },
  ]

  const news = [
    {
      id: 1,
      title: "Hội nghị tổng kết công tác năm 2024 và triển khai nhiệm vụ năm 2025",
      excerpt:
        "Sáng ngày 15/12/2024, Sư đoàn phòng không 375 đã tổ chức hội nghị tổng kết toàn diện các mặt công tác trong năm 2024...",
      image: "/placeholder.svg?height=200&width=300",
      author: "Ban biên tập",
      date: "15/12/2024",
      time: "2 giờ trước",
      views: 1890,
      category: "meeting",
      categoryName: "Hội nghị",
      featured: true,
    },
    {
      id: 2,
      title: "Diễn tập phòng thủ khu vực quy mô lớn năm 2024",
      excerpt: "Cuộc diễn tập nhằm nâng cao khả năng phối hợp tác chiến giữa các lực lượng trong khu vực phòng thủ...",
      image: "/placeholder.svg?height=200&width=300",
      author: "Phòng Tham mưu",
      date: "12/12/2024",
      time: "4 giờ trước",
      views: 2340,
      category: "training",
      categoryName: "Huấn luyện",
      featured: true,
    },
    {
      id: 3,
      title: "Hội thi 'Bàn tay vàng' năm 2024 - Tôn vinh tài năng kỹ thuật",
      excerpt:
        "Hội thi nhằm tôn vinh những cá nhân có thành tích xuất sắc trong công tác kỹ thuật, bảo dưỡng vũ khí trang bị...",
      image: "/placeholder.svg?height=200&width=300",
      author: "Phòng HC-KT",
      date: "08/12/2024",
      time: "1 tuần trước",
      views: 1567,
      category: "competition",
      categoryName: "Thi đua",
      featured: false,
    },
    {
      id: 4,
      title: "Thi đua quyết thắng quý IV/2024 - Kết quả ấn tượng",
      excerpt:
        "Phong trào thi đua quyết thắng quý IV/2024 đã thu được nhiều kết quả tích cực, góp phần nâng cao chất lượng...",
      image: "/placeholder.svg?height=200&width=300",
      author: "Phòng Chính trị",
      date: "05/12/2024",
      time: "10 ngày trước",
      views: 1234,
      category: "competition",
      categoryName: "Thi đua",
      featured: false,
    },
    {
      id: 5,
      title: "Kiểm tra công tác sẵn sàng chiến đấu các đơn vị trực thuộc",
      excerpt:
        "Ban chỉ huy Sư đoàn tiến hành kiểm tra đột xuất công tác sẵn sàng chiến đấu tại các đơn vị trực thuộc...",
      image: "/placeholder.svg?height=200&width=300",
      author: "Phòng Tham mưu",
      date: "03/12/2024",
      time: "2 tuần trước",
      views: 987,
      category: "training",
      categoryName: "Huấn luyện",
      featured: false,
    },
    {
      id: 6,
      title: "Sinh hoạt văn hóa chào mừng kỷ niệm 79 năm QĐND Việt Nam",
      excerpt:
        "Chương trình văn nghệ chào mừng kỷ niệm 79 năm Ngày thành lập Quân đội nhân dân Việt Nam với nhiều tiết mục ý nghĩa...",
      image: "/placeholder.svg?height=200&width=300",
      author: "Đoàn thanh niên",
      date: "20/12/2024",
      time: "2 ngày trước",
      views: 756,
      category: "daily",
      categoryName: "Sinh hoạt",
      featured: false,
    },
  ]

  const filteredNews = selectedCategory === "all" ? news : news.filter((item) => item.category === selectedCategory)
  const featuredNews = filteredNews.filter((item) => item.featured)
  const regularNews = filteredNews.filter((item) => !item.featured)

  const achievements = [
    { label: "Đơn vị hoàn thành xuất sắc nhiệm vụ", value: "15/15", color: "text-green-600" },
    { label: "Cá nhân đạt danh hiệu chiến sĩ thi đua", value: "89", color: "text-blue-600" },
    { label: "Giải thưởng thi đua các cấp", value: "23", color: "text-purple-600" },
    { label: "Sáng kiến kỹ thuật được áp dụng", value: "12", color: "text-orange-600" },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Hoạt động Sư đoàn</h1>
        <p className="text-lg text-gray-600">
          Tin tức về các hoạt động, sự kiện và thành tích của Sư đoàn phòng không 375
        </p>
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {achievements.map((achievement, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className={`text-3xl font-bold mb-2 ${achievement.color}`}>{achievement.value}</div>
              <div className="text-sm text-gray-600">{achievement.label}</div>
            </CardContent>
          </Card>
        ))}
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">Hoạt động nổi bật</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredNews.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-64 object-cover" />
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
          {selectedCategory === "all" ? "Hoạt động khác" : categories.find((c) => c.id === selectedCategory)?.name}
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

      {/* Upcoming Events */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 mt-12">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center mb-6">Sự kiện sắp tới</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-3">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-semibold">25/12/2024</span>
              </div>
              <h4 className="font-semibold mb-2">Hội nghị Đảng ủy tháng 12</h4>
              <p className="text-sm text-gray-600">Đánh giá kết quả thực hiện nhiệm vụ năm 2024</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-3">
                <Calendar className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-semibold">30/12/2024</span>
              </div>
              <h4 className="font-semibold mb-2">Giao lưu văn hóa cuối năm</h4>
              <p className="text-sm text-gray-600">Chương trình văn nghệ chào mừng năm mới</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-3">
                <Calendar className="h-5 w-5 text-red-600 mr-2" />
                <span className="font-semibold">05/01/2025</span>
              </div>
              <h4 className="font-semibold mb-2">Khai mạc năm huấn luyện 2025</h4>
              <p className="text-sm text-gray-600">Lễ khai mạc năm huấn luyện mới</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Xem thêm hoạt động
        </Button>
      </div>
    </div>
  )
}

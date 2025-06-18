"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Eye, Calendar, Clock, Filter } from "lucide-react"

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "Tất cả", count: 28 },
    { id: "documentary", name: "Phóng sự", count: 8 },
    { id: "training", name: "Huấn luyện", count: 6 },
    { id: "ceremony", name: "Lễ kỷ niệm", count: 5 },
    { id: "exercise", name: "Diễn tập", count: 4 },
    { id: "news", name: "Tin tức", count: 5 },
  ]

  const videos = [
    {
      id: 1,
      title: "Phóng sự: Sư đoàn phòng không 375 - 58 năm xây dựng và phát triển",
      thumbnail: "/public/placeholder.svg?height=200&width=350",
      duration: "15:30",
      date: "20/12/2024",
      views: 2340,
      category: "documentary",
      categoryName: "Phóng sự",
      description: "Phóng sự đặc biệt về lịch sử 58 năm xây dựng và phát triển của Sư đoàn phòng không 375",
    },
    {
      id: 2,
      title: "Diễn tập phòng thủ khu vực - Highlights",
      thumbnail: "/public/placeholder.svg?height=200&width=350",
      duration: "08:45",
      date: "15/12/2024",
      views: 1890,
      category: "exercise",
      categoryName: "Diễn tập",
      description: "Những khoảnh khắc ấn tượng nhất trong cuộc diễn tập phòng thủ khu vực",
    },
    {
      id: 3,
      title: "Lễ kỷ niệm 79 năm QĐND - Toàn cảnh",
      thumbnail: "/public/placeholder.svg?height=200&width=350",
      duration: "12:20",
      date: "22/12/2024",
      views: 1456,
      category: "ceremony",
      categoryName: "Lễ kỷ niệm",
      description: "Ghi lại toàn cảnh lễ kỷ niệm 79 năm thành lập Quân đội nhân dân Việt Nam",
    },
    {
      id: 4,
      title: "Huấn luyện chiến đấu - Kỹ năng bắn tên lửa",
      thumbnail: "/public/placeholder.svg?height=200&width=350",
      duration: "06:15",
      date: "10/12/2024",
      views: 1234,
      category: "training",
      categoryName: "Huấn luyện",
      description: "Quá trình huấn luyện kỹ năng bắn tên lửa của các chiến sĩ",
    },
    {
      id: 5,
      title: "Tin tức: Hội nghị tổng kết năm 2024",
      thumbnail: "/public/placeholder.svg?height=200&width=350",
      duration: "04:30",
      date: "18/12/2024",
      views: 987,
      category: "news",
      categoryName: "Tin tức",
      description: "Tin tức về hội nghị tổng kết công tác năm 2024 của Sư đoàn",
    },
    {
      id: 6,
      title: "Thi đua Bàn tay vàng 2024",
      thumbnail: "/public/placeholder.svg?height=200&width=350",
      duration: "07:45",
      date: "08/12/2024",
      views: 756,
      category: "documentary",
      categoryName: "Phóng sự",
      description: "Phóng sự về hội thi Bàn tay vàng năm 2024",
    },
  ]

  const filteredVideos =
    selectedCategory === "all" ? videos : videos.filter((video) => video.category === selectedCategory)

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Thư viện Video</h1>
        <p className="text-lg text-gray-600">
          Kho lưu trữ video về các hoạt động và sự kiện của Sư đoàn phòng không 375
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center space-x-2"
          >
            <span>{category.name}</span>
            <Badge variant="secondary" className="ml-2">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Bộ lọc
          </Button>
        </div>
        <div className="text-sm text-gray-500">Hiển thị {filteredVideos.length} video</div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="relative">
              <img
                src={video.thumbnail || "/public/placeholder.svg"}
                alt={video.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <Play className="h-8 w-8 text-white ml-1" />
                </div>
              </div>

              {/* Duration */}
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {video.duration}
              </div>

              {/* Views */}
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                {video.views}
              </div>

              {/* Category Badge */}
              <Badge className="absolute top-2 left-2 bg-red-600">{video.categoryName}</Badge>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-red-600 transition-colors">
                {video.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{video.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {video.date}
                </div>
                <div className="flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  {video.views} lượt xem
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Video Section */}
      <Card className="bg-gradient-to-r from-red-50 to-red-100 mt-12">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center mb-6">Video nổi bật</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <img
                src="/public/placeholder.svg?height=300&width=500"
                alt="Video nổi bật"
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center">
                  <Play className="h-10 w-10 text-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded">25:30</div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Phim tài liệu: "Những người lính phòng không"</h4>
              <p className="text-gray-700 mb-4">
                Bộ phim tài liệu đặc biệt về cuộc sống và công việc của những chiến sĩ phòng không, ghi lại những khoảnh
                khắc đáng nhớ trong quá trình bảo vệ vùng trời Tổ quốc.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Phát hành: 22/12/2024
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  5,240 lượt xem
                </div>
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
                <Play className="h-4 w-4 mr-2" />
                Xem ngay
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Xem thêm video
        </Button>
      </div>
    </div>
  )
}

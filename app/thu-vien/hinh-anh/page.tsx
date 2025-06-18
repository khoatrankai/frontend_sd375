"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Calendar, Grid3X3, List, Filter } from "lucide-react"

export default function ImagesPage() {
  const [viewMode, setViewMode] = useState("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "Tất cả", count: 342 },
    { id: "training", name: "Huấn luyện", count: 89 },
    { id: "ceremony", name: "Lễ kỷ niệm", count: 67 },
    { id: "exercise", name: "Diễn tập", count: 45 },
    { id: "daily", name: "Sinh hoạt", count: 78 },
    { id: "construction", name: "Xây dựng", count: 63 },
  ]

  const images = [
    {
      id: 1,
      title: "Diễn tập phòng thủ khu vực 2024",
      thumbnail: "/public/placeholder.svg?height=300&width=400",
      date: "15/12/2024",
      views: 1250,
      category: "exercise",
      categoryName: "Diễn tập",
    },
    {
      id: 2,
      title: "Lễ kỷ niệm 79 năm QĐND Việt Nam",
      thumbnail: "/public/placeholder.svg?height=300&width=400",
      date: "22/12/2024",
      views: 980,
      category: "ceremony",
      categoryName: "Lễ kỷ niệm",
    },
    {
      id: 3,
      title: "Huấn luyện chiến đấu",
      thumbnail: "/public/placeholder.svg?height=300&width=400",
      date: "10/12/2024",
      views: 756,
      category: "training",
      categoryName: "Huấn luyện",
    },
    {
      id: 4,
      title: "Sinh hoạt văn hóa",
      thumbnail: "/public/placeholder.svg?height=300&width=400",
      date: "08/12/2024",
      views: 642,
      category: "daily",
      categoryName: "Sinh hoạt",
    },
    {
      id: 5,
      title: "Xây dựng công trình",
      thumbnail: "/public/placeholder.svg?height=300&width=400",
      date: "05/12/2024",
      views: 523,
      category: "construction",
      categoryName: "Xây dựng",
    },
    {
      id: 6,
      title: "Thi đua quyết thắng",
      thumbnail: "/public/placeholder.svg?height=300&width=400",
      date: "03/12/2024",
      views: 445,
      category: "training",
      categoryName: "Huấn luyện",
    },
  ]

  const filteredImages = selectedCategory === "all" ? images : images.filter((img) => img.category === selectedCategory)

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Thư viện hình ảnh</h1>
        <p className="text-lg text-gray-600">Kho lưu trữ hình ảnh về các hoạt động của Sư đoàn phòng không 375</p>
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
        <div className="flex items-center space-x-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Images Grid */}
      <div
        className={
          viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
        }
      >
        {filteredImages.map((image) => (
          <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="relative">
              <img
                src={image.thumbnail || "/public/placeholder.svg"}
                alt={image.title}
                className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                  viewMode === "grid" ? "h-48" : "h-32"
                }`}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                {image.views}
              </div>
              <Badge className="absolute top-2 left-2">{image.categoryName}</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-sm line-clamp-2 mb-2">{image.title}</h3>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                {image.date}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Xem thêm hình ảnh
        </Button>
      </div>
    </div>
  )
}

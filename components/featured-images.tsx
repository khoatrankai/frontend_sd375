"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"

export default function FeaturedImages() {
  const [currentImageSet, setCurrentImageSet] = useState(0)

  const imageSets = [
    [
      {
        src: "/placeholder.svg?height=200&width=300",
        title: "Diễn tập phòng thủ khu vực",
        views: 1250,
      },
      {
        src: "/placeholder.svg?height=200&width=300",
        title: "Lễ kỷ niệm 79 năm QĐND",
        views: 980,
      },
      {
        src: "/placeholder.svg?height=200&width=300",
        title: "Hội thi Bàn tay vàng",
        views: 756,
      },
      {
        src: "/placeholder.svg?height=200&width=300",
        title: "Thi đua quyết thắng",
        views: 642,
      },
    ],
    [
      {
        src: "/placeholder.svg?height=200&width=300",
        title: "Huấn luyện chiến đấu",
        views: 890,
      },
      {
        src: "/placeholder.svg?height=200&width=300",
        title: "Kiểm tra sẵn sàng chiến đấu",
        views: 723,
      },
      {
        src: "/placeholder.svg?height=200&width=300",
        title: "Hội nghị Đảng ủy",
        views: 567,
      },
      {
        src: "/placeholder.svg?height=200&width=300",
        title: "Thăm gia đình chính sách",
        views: 445,
      },
    ],
  ]

  const nextImageSet = () => {
    setCurrentImageSet((prev) => (prev + 1) % imageSets.length)
  }

  const prevImageSet = () => {
    setCurrentImageSet((prev) => (prev - 1 + imageSets.length) % imageSets.length)
  }

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-red-600 pb-2">Hình ảnh nổi bật</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={prevImageSet}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextImageSet}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {imageSets[currentImageSet].map((image, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="relative">
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                {image.views}
              </div>
            </div>
            <CardContent className="p-3">
              <h4 className="font-medium text-sm line-clamp-2 text-gray-800">{image.title}</h4>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

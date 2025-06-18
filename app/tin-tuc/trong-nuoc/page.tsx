"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Eye, User, ChevronRight } from "lucide-react"

export default function DomesticNewsPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const news = [
    {
      id: 1,
      title: "Thủ tướng Chính phủ gặp mặt các đại biểu Quân đội tiêu biểu",
      excerpt: "Thủ tướng Phạm Minh Chính đã có buổi gặp mặt, động viên các đại biểu Quân đội tiêu biểu toàn quốc...",
      image: "/placeholder.svg?height=200&width=300",
      author: "TTXVN",
      date: "20/12/2024",
      time: "2 giờ trước",
      views: 2340,
      category: "Chính trị",
    },
    {
      id: 2,
      title: "Kỷ niệm 79 năm Ngày thành lập Quân đội nhân dân Việt Nam",
      excerpt: "Các địa phương trên cả nước tổ chức long trọng lễ kỷ niệm 79 năm Ngày thành lập QĐND Việt Nam...",
      image: "/placeholder.svg?height=200&width=300",
      author: "Báo Quân đội nhân dân",
      date: "22/12/2024",
      time: "1 ngày trước",
      views: 1890,
      category: "Quân sự",
    },
    {
      id: 3,
      title: "Hội nghị Trung ương 8 khóa XIII thảo luận về phát triển kinh tế",
      excerpt: "Hội nghị Trung ương 8 tiếp tục thảo luận về phương hướng phát triển kinh tế-xã hội năm 2025...",
      image: "/placeholder.svg?height=200&width=300",
      author: "VGP",
      date: "18/12/2024",
      time: "3 ngày trước",
      views: 1456,
      category: "Kinh tế",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Tin tức trong nước</h1>
        <p className="text-lg text-gray-600">
          Cập nhật những thông tin mới nhất về tình hình chính trị, kinh tế, xã hội trong nước
        </p>
      </div>

      {/* News List */}
      <div className="space-y-6">
        {news.map((item) => (
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
                    <Badge variant="outline">{item.category}</Badge>
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

      {/* Pagination */}
      <div className="flex justify-center space-x-2">
        <Button variant="outline" disabled={currentPage === 1}>
          Trang trước
        </Button>
        <Button variant="outline">1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
        <Button variant="outline">Trang sau</Button>
      </div>
    </div>
  )
}

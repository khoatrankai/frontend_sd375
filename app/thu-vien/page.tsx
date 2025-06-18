"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageIcon, Video, Music, Download, Play, Eye, Calendar, Filter, Grid3X3, List } from "lucide-react"

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState("images")
  const [viewMode, setViewMode] = useState("grid")

  const tabs = [
    { id: "images", name: "Hình ảnh", icon: ImageIcon, count: 342 },
    { id: "videos", name: "Video", icon: Video, count: 28 },
    { id: "audio", name: "Audio", icon: Music, count: 15 },
    { id: "software", name: "Phần mềm", icon: Download, count: 12 },
  ]

  const mediaItems = {
    images: [
      {
        id: 1,
        title: "Diễn tập phòng thủ khu vực 2024",
        thumbnail: "/placeholder.svg?height=200&width=300",
        date: "15/12/2024",
        views: 1250,
        category: "Diễn tập",
        description: "Hình ảnh diễn tập phòng thủ khu vực quy mô lớn năm 2024",
      },
      {
        id: 2,
        title: "Lễ kỷ niệm 79 năm QĐND Việt Nam",
        thumbnail: "/placeholder.svg?height=200&width=300",
        date: "22/12/2024",
        views: 980,
        category: "Sự kiện",
        description: "Album ảnh lễ kỷ niệm 79 năm thành lập Quân đội nhân dân Việt Nam",
      },
      {
        id: 3,
        title: "Hội thi Bàn tay vàng 2024",
        thumbnail: "/placeholder.svg?height=200&width=300",
        date: "08/12/2024",
        views: 756,
        category: "Thi đua",
        description: "Hình ảnh Hội thi Bàn tay vàng năm 2024",
      },
      {
        id: 4,
        title: "Huấn luyện chiến đấu",
        thumbnail: "/placeholder.svg?height=200&width=300",
        date: "05/12/2024",
        views: 642,
        category: "Huấn luyện",
        description: "Hoạt động huấn luyện chiến đấu của các đơn vị",
      },
    ],
    videos: [
      {
        id: 1,
        title: "Phóng sự: Sư đoàn phòng không 375 - 58 năm xây dựng và phát triển",
        thumbnail: "/placeholder.svg?height=200&width=300",
        duration: "15:30",
        date: "20/12/2024",
        views: 2340,
        category: "Phóng sự",
        description: "Phóng sự đặc biệt về lịch sử 58 năm xây dựng và phát triển của Sư đoàn",
      },
      {
        id: 2,
        title: "Diễn tập phòng thủ khu vực - Highlights",
        thumbnail: "/placeholder.svg?height=200&width=300",
        duration: "08:45",
        date: "15/12/2024",
        views: 1890,
        category: "Diễn tập",
        description: "Những khoảnh khắc ấn tượng trong cuộc diễn tập",
      },
      {
        id: 3,
        title: "Lễ kỷ niệm 79 năm QĐND - Toàn cảnh",
        thumbnail: "/placeholder.svg?height=200&width=300",
        duration: "12:20",
        date: "22/12/2024",
        views: 1456,
        category: "Sự kiện",
        description: "Ghi lại toàn cảnh lễ kỷ niệm trang trọng",
      },
    ],
    audio: [
      {
        id: 1,
        title: "Quốc ca Việt Nam",
        duration: "03:45",
        date: "01/01/2024",
        plays: 5670,
        category: "Quốc ca",
        description: "Quốc ca nước Cộng hòa xã hội chủ nghĩa Việt Nam",
      },
      {
        id: 2,
        title: "Bộ đội Cụ Hồ",
        duration: "04:12",
        date: "15/05/2024",
        plays: 3420,
        category: "Ca khúc cách mạng",
        description: "Ca khúc bất hủ về Bộ đội Cụ Hồ",
      },
      {
        id: 3,
        title: "Tiến quân ca",
        duration: "02:58",
        date: "22/12/2024",
        plays: 2890,
        category: "Hành khúc",
        description: "Hành khúc của Quân đội nhân dân Việt Nam",
      },
    ],
    software: [
      {
        id: 1,
        title: "Phần mềm quản lý văn bản v2.1",
        version: "2.1.0",
        size: "45.2 MB",
        date: "15/12/2024",
        downloads: 234,
        category: "Quản lý",
        description: "Hệ thống quản lý văn bản điện tử cho các đơn vị",
      },
      {
        id: 2,
        title: "Ứng dụng tra cứu quy định",
        version: "1.5.3",
        size: "12.8 MB",
        date: "10/12/2024",
        downloads: 156,
        category: "Tra cứu",
        description: "Tra cứu nhanh các quy định, thông tư, nghị định",
      },
      {
        id: 3,
        title: "Phần mềm báo cáo tự động",
        version: "3.0.1",
        size: "28.5 MB",
        date: "08/12/2024",
        downloads: 89,
        category: "Báo cáo",
        description: "Tự động hóa việc tạo và gửi báo cáo định kỳ",
      },
    ],
  }

  const currentItems = mediaItems[activeTab as keyof typeof mediaItems] || []

  const renderGridView = () => {
    if (activeTab === "audio") {
      return (
        <div className="space-y-4">
          {currentItems.map((item: any) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                    <Music className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>Thời lượng: {item.duration}</span>
                      <span>Lượt phát: {item.plays}</span>
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                  </div>
                  <Button size="icon" className="bg-red-600 hover:bg-red-700">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    }

    if (activeTab === "software") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((item: any) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Download className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg line-clamp-2">{item.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex justify-between">
                    <span>Phiên bản:</span>
                    <span className="font-medium">{item.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dung lượng:</span>
                    <span className="font-medium">{item.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lượt tải:</span>
                    <span className="font-medium">{item.downloads}</span>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Tải xuống
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentItems.map((item: any) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="relative">
              <img
                src={item.thumbnail || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {activeTab === "videos" && (
                <>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                    {item.duration}
                  </div>
                </>
              )}
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                {item.views || item.plays}
              </div>
              <Badge className="absolute top-2 left-2">{item.category}</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-sm line-clamp-2 mb-2">{item.title}</h3>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                {item.date}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Thư viện</h1>
        <p className="text-lg text-gray-600">Kho tài nguyên đa phương tiện của Sư đoàn phòng không 375</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center space-x-2"
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.name}</span>
            <Badge variant="secondary" className="ml-2">
              {tab.count}
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
        {activeTab !== "audio" && activeTab !== "software" && (
          <div className="flex items-center space-x-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      {renderGridView()}

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Xem thêm
        </Button>
      </div>
    </div>
  )
}

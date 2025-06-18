"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, ImageIcon, Video, Download, Eye, Settings, LogOut } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    { title: "Tổng bài viết", value: "156", icon: FileText, color: "text-blue-600" },
    { title: "Hình ảnh", value: "342", icon: ImageIcon, color: "text-green-600" },
    { title: "Video", value: "28", icon: Video, color: "text-purple-600" },
    { title: "Lượt truy cập", value: "12,543", icon: Eye, color: "text-orange-600" },
  ]

  const recentActivities = [
    { action: "Thêm bài viết mới", item: "Hội nghị tổng kết 2024", time: "2 giờ trước" },
    { action: "Cập nhật hình ảnh", item: "Album diễn tập", time: "4 giờ trước" },
    { action: "Phê duyệt văn bản", item: "Chỉ thị số 01/CT-F375", time: "6 giờ trước" },
    { action: "Thêm phần mềm", item: "Quản lý văn bản v2.1", time: "1 ngày trước" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Bảng điều khiển Admin</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Cài đặt
            </Button>
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Đăng xuất
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Thao tác nhanh</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button className="h-20 flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  Thêm bài viết
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <ImageIcon className="h-6 w-6 mb-2" />
                  Tải hình ảnh
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Video className="h-6 w-6 mb-2" />
                  Thêm video
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Download className="h-6 w-6 mb-2" />
                  Quản lý file
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Hoạt động gần đây</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.item}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.time}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

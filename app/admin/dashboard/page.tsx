"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, ImageIcon, Video, Download, Eye, Settings, LogOut } from "lucide-react"
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { authService } from "@/services/auth.service"

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
  const [open, setOpen] = useState(false);
  const [fileType, setFileType] = useState("image");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const logoutUser = async()=>{
     const res = await authService.logout() as any
     if(res?.success){
      window.location.href = "/admin/login"
     }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Bảng điều khiển Admin</h1>
          <div className="flex items-center space-x-4">
            <button>
              <div
                onClick={(e) => {

                  window.location.href = "/admin/settings";

                }}
                className="w-full flex items-center justify-center border rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-100"
              >
                <Settings className="h-4 w-4 mr-2" />
                Cài Đặt
              </div>
            </button>
            <button>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  if (confirm("Bạn có chắc muốn đăng xuất?")) {
                    logoutUser()
                  }
                }}
                className="w-full flex items-center justify-center border rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Đăng xuất
              </div>
            </button>

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
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Button variant="outline" className="h-20 flex-col" onClick={() => {
                  setFileType("audio");
                  setOpen(true);
                }}>
                  <FileText className="h-6 w-6 mb-2" />
                  Thêm Audio
                </Button>
                <Button variant="outline" className="h-20 flex-col" onClick={() => {
                  setFileType("image");
                  setOpen(true);
                }}>
                  <ImageIcon className="h-6 w-6 mb-2" />
                  Tải hình ảnh
                </Button>
                <Button variant="outline" className="h-20 flex-col" onClick={() => {
                  setFileType("video");
                  setOpen(true);
                }}>
                  <Video className="h-6 w-6 mb-2" />
                  Thêm video
                </Button>
                <Button variant="outline" className="h-20 flex-col" onClick={() => {
                  setFileType("document");
                  setOpen(true)
                }}>

                  <Download className="h-6 w-6 mb-2" />
                  Quản lý file
                </Button>
              </div>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Tải lên file</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4">
                    {/* Chọn loại thư viện */}
                    <div>
                      <label className="block text-sm font-medium mb-1">Loại thư viện</label>
                      <Select onValueChange={setFileType} defaultValue={fileType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại file" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="image">Ảnh</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="audio">Âm thanh</SelectItem>
                          <SelectItem value="document">Phần mềm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Input file */}
                    <div>
                      <label className="block text-sm font-medium mb-1">Chọn file</label>
                      <Input
                        type="file"
                        accept={
                          fileType === "image"
                            ? "image/*"
                            : fileType === "video"
                              ? "video/*"
                              : fileType === "audio"
                                ? "audio/*"
                                : ".exe,.msi,.dmg,.pkg,.deb,.rpm"
                        }
                        onChange={handleFileChange}
                      />
                    </div>

                    {/* Hiển thị preview */}
                    {selectedFile && (
                      <div className="mt-2 text-sm text-gray-700">
                        <span className="text-sm text-green-700">
                          ✓ File đã được tải lên: <strong>{selectedFile.name}</strong>
                        </span>
                        <button
                          onClick={handleRemoveFile}
                          className="text-red-500 text-sm hover:underline block mt-1"
                        >
                          Xóa
                        </button>

                        {previewUrl && (
                          <div className="mt-2">
                            {fileType === "image" && (
                              <img src={previewUrl} alt="Preview" className="max-h-40 rounded" />
                            )}
                            {fileType === "video" && (
                              <video src={previewUrl} controls className="max-h-40 rounded" />
                            )}
                            {fileType === "audio" && (
                              <audio src={previewUrl} controls className="w-full" />
                            )}
                            {fileType === "document" && (
                              <div className="text-sm text-gray-500">
                                Không thể xem trước phần mềm
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="text-end mt-4">
                    <Button className="mr-2" variant="outline" >
                      Hủy
                    </Button>
                    <Button

                      disabled={!selectedFile}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Lưu
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
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

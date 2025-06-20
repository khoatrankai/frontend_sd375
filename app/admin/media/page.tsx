"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Search, Trash2, Download, Eye, Calendar, Grid3X3, List } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";


export default function AdminMediaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [viewMode, setViewMode] = useState("grid")

  const mediaTypes = [
    { id: "all", name: "Tất cả" },
    { id: "image", name: "Hình ảnh" },
    { id: "video", name: "Video" },
    { id: "audio", name: "Audio" },
    { id: "document", name: "Tài liệu" },
  ]

  const mediaFiles = [
    {
      id: 1,
      name: "dien-tap-phong-thu-2024.jpg",
      type: "image",
      typeName: "Hình ảnh",
      size: "2.3 MB",
      date: "15/12/2024",
      downloads: 45,
      thumbnail: "/public/placeholder.svg?height=150&width=200",
    },
    {
      id: 2,
      name: "hoi-nghi-tong-ket.mp4",
      type: "video",
      typeName: "Video",
      size: "156.7 MB",
      date: "12/12/2024",
      downloads: 23,
      thumbnail: "/public/placeholder.svg?height=150&width=200",
    },
    {
      id: 3,
      name: "quoc-ca-viet-nam.mp3",
      type: "audio",
      typeName: "Audio",
      size: "4.2 MB",
      date: "10/12/2024",
      downloads: 67,
      thumbnail: "/public/placeholder.svg?height=150&width=200",
    },
    {
      id: 4,
      name: "bao-cao-nam-2024.pdf",
      type: "document",
      typeName: "Tài liệu",
      size: "12.8 MB",
      date: "08/12/2024",
      downloads: 89,
      thumbnail: "/public/placeholder.svg?height=150&width=200",
    },
    {
      id: 5,
      name: "le-ky-niem-79-nam.jpg",
      type: "image",
      typeName: "Hình ảnh",
      size: "1.8 MB",
      date: "05/12/2024",
      downloads: 34,
      thumbnail: "/public/placeholder.svg?height=150&width=200",
    },
    {
      id: 6,
      name: "huong-dan-su-dung.pdf",
      type: "document",
      typeName: "Tài liệu",
      size: "5.6 MB",
      date: "03/12/2024",
      downloads: 56,
      thumbnail: "/public/placeholder.svg?height=150&width=200",
    },
  ]

  const filteredMedia = mediaFiles.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || file.type === selectedType
    return matchesSearch && matchesType
  })

  const stats = [
    { label: "Tổng file", value: "342", color: "text-blue-600" },
    { label: "Hình ảnh", value: "198", color: "text-green-600" },
    { label: "Video", value: "28", color: "text-purple-600" },
    { label: "Dung lượng", value: "2.3 GB", color: "text-orange-600" },
  ]
  const [fileType, setFileType] = useState("image");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleSave = () => {
    if (selectedFile) {
      // TODO: Gửi file lên server hoặc xử lý file tại đây
      console.log("Saving file:", selectedFile);
    }
    setOpen(false); // Đóng dialog sau khi lưu
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setOpen(false); // Đóng dialog khi hủy
  };
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
  const handleDelete = () => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xoá?");

    if (confirmDelete) {
      // 👉 Logic xoá ở đây — ví dụ API, xóa item, v.v.
      console.log("Đã xoá bài viết");

      // 👉 Thông báo
      if (Notification.permission === "granted") {
        new Notification("Đã xoá bài viết", {
          body: "Bài viết đã được xoá thành công.",
        });
      } else if (Notification.permission !== "denied") {
        // Yêu cầu quyền nếu chưa được cấp
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("Đã xoá bài viết", {
              body: "Bài viết đã được xoá thành công.",
            });
          } else {
            alert("Đã xoá bài viết.");
          }
        });
      } else {
        alert("Đã xoá bài viết.");
      }
    }
  };
  const handleRemoveFile = () => {
    setSelectedFile(null);
  };


  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý thư viện</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Upload className="h-4 w-4 mr-2" />
              Tải lên file mới
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Tải lên file</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Select file type */}
              <div>
                <label className="block text-sm font-medium mb-1">Loại thư viện</label>
                <Select onValueChange={setFileType} defaultValue="image">
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

              {/* Upload input */}
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

              {/* Preview */}
              {selectedFile && (
                <div className="mt-2 text-sm text-gray-700">
                  <span className="text-sm text-green-700">
                    ✓ File đã được tải lên: <strong>{selectedFile.name}</strong>
                  </span>
                  <button
                    onClick={handleRemoveFile}
                    className="text-red-500 text-sm hover:underline"
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

            <div className="text-end">
              <Button className="mr-2" variant="outline" onClick={handleCancel}>
                Hủy
              </Button>
              <Button
                onClick={handleSave}
                disabled={!selectedFile}
                className="bg-green-600 hover:bg-green-700"
              >
                Lưu
              </Button>
            </div>
          </DialogContent>

        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Input
                placeholder="Tìm kiếm file..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Chọn loại file" />
                </SelectTrigger>
                <SelectContent>
                  {mediaTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Search className="h-4 w-4 mr-2" />
                Tìm kiếm
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Grid/List */}
      <Card>
        <CardHeader>
          <CardTitle>Thư viện media ({filteredMedia.length} file)</CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMedia.map((file) => (
                <div key={file.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src={file.thumbnail || "/public/placeholder.svg"}
                      alt={file.name}
                      className="w-full h-32 object-cover"
                    />
                    <Badge className="absolute top-2 right-2">{file.typeName}</Badge>
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-sm line-clamp-2 mb-2">{file.name}</h4>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex justify-between">
                        <span>Kích thước:</span>
                        <span>{file.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ngày tải:</span>
                        <span>{file.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lượt tải:</span>
                        <span>{file.downloads}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-3 w-3 mr-1" />
                          </Button>

                        </DialogTrigger>

                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Tải lên file</DialogTitle>
                          </DialogHeader>

                          <div className="space-y-4">
                            {/* Select file type */}
                            <div>
                              <label className="block text-sm font-medium mb-1">Loại thư viện</label>
                              <Select onValueChange={setFileType} defaultValue="image" disabled >
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

                            {/* Upload input */}
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
                                disabled
                                onChange={handleFileChange}
                              />
                            </div>

                            {/* Preview */}
                            {selectedFile && (
                              <div className="mt-2 text-sm text-gray-700">
                                <span className="text-sm text-green-700">
                                  ✓ File đã được tải lên: <strong>{selectedFile.name}</strong>
                                </span>
                                
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

                        </DialogContent>

                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={handleDelete}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredMedia.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <img
                      src={file.thumbnail || "/public/placeholder.svg"}
                      alt={file.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-medium">{file.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <Badge variant="outline">{file.typeName}</Badge>
                        <span>{file.size}</span>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {file.date}
                        </div>
                        <span>{file.downloads} lượt tải</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                        </Button>

                      </DialogTrigger>

                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Tải lên file</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4">
                          {/* Select file type */}
                          <div>
                            <label className="block text-sm font-medium mb-1">Loại thư viện</label>
                            <Select onValueChange={setFileType} defaultValue="image" disabled >
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

                          {/* Upload input */}
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
                              disabled
                              onChange={handleFileChange}
                            />
                          </div>

                          {/* Preview */}
                          {selectedFile && (
                            <div className="mt-2 text-sm text-gray-700">
                              <span className="text-sm text-green-700">
                                ✓ File đã được tải lên: <strong>{selectedFile.name}</strong>
                              </span>
                              
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

                      </DialogContent>

                    </Dialog>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={handleDelete}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

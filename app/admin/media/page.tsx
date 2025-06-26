"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Search, Trash2, Download, Eye, Calendar, Grid3X3, List } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, } from "@/components/ui/dialog";
import { newsService } from "@/services/news.service"
import { imagesService } from "@/services/images.service"
import { apiClient } from "@/lib/api"



export default function AdminMediaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedDocType, setSelectedDocType] = useState<string>("image");
  const [Image, setImage] = useState<any>([])

  // const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<any>([])


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

  const [title, setTitle] = useState("");
  const [selectedthumbnail, setThumbnail] = useState<File | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
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
  useEffect(() => {
    fetchDataNews()
    fetchData()

  }, [])
  const fetchData = async () => {
    const res = await imagesService.getCategories()
    if (res.statusCode === 200) {
      setCategory(res.data)
    }
  }
  const fetchDataNews = async () => {
    const res = await imagesService.getImages()
    if (res.statusCode === 200) {
      setImage(res.data)
    }
  };
  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", selectedCategory ?? "");
    if (selectedthumbnail) {
      formData.append("coverImage", selectedthumbnail);
    }

    try {
      // Gửi dữ liệu đến API backend
      const response = await apiClient.upload('/images', formData)

      if (!response) {
        throw new Error("Lỗi khi lưu dữ liệu.");
      }
      fetchDataNews()

      // Xử lý sau khi lưu thành công: reset form hoặc thông báo cho người dùng
      console.log("Đã lưu thành công!");
    } catch (error) {
      console.error(error);
    }
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

            <form className="space-y-4">
              {/* Select file type */}
              <div>
                <label className="block text-sm font-medium mb-1">Loại thư viện</label>
                <Select onValueChange={setSelectedDocType} defaultValue="image">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn hoạt động" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Ảnh</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="audio">Âm thanh</SelectItem>
                    <SelectItem value="document">Phần mềm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <label className="block text-sm font-medium mb-1">Tiêu đề</label>

              <Input placeholder="Nhập tiêu đề bảng tin"
                value={title}
                onChange={(e) => setTitle(e.target.value)} />
              <div>
                {selectedDocType === "image" && (


                  <div>
                    <label className="block text-sm font-medium mb-1">Loại hoạt động</label>
                    <Select onValueChange={setSelectedDocType} >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn hoạt động" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* <SelectItem value="undefined">Không</SelectItem> */}

                        {category?.map((category: any) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category?.name}
                          </SelectItem>

                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {selectedDocType === "video" && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Loại hoạt động</label>
                    <Select onValueChange={setSelectedDocType} >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn hoạt động" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="huan-luyen">Huấn luyện</SelectItem>
                        <SelectItem value="le-ki-niem">Lễ kỷ niệm</SelectItem>
                        <SelectItem value="dien-tap">Diễn tập</SelectItem>
                        <SelectItem value="phong-su">Phóng sự</SelectItem>
                        <SelectItem value="tin-tuc">Tin tức</SelectItem>

                      </SelectContent>
                    </Select>
                  </div>
                )}
                {selectedDocType === "audio" && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Loại hoạt động</label>
                    <Select onValueChange={setSelectedDocType} >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn hoạt động" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quoc-ca">Quốc ca</SelectItem>
                        <SelectItem value="cach-mang">Ca khúc cách mạng</SelectItem>
                        <SelectItem value="quan-doi">Hành khúc quân đội</SelectItem>
                        <SelectItem value="dan-ca">Dân ca</SelectItem>

                      </SelectContent>
                    </Select>
                  </div>
                )}
                {selectedDocType === "document" && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Loại hoạt động</label>
                    <Select onValueChange={setSelectedDocType} >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn hoạt động" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quan-li">Quản lý</SelectItem>
                        <SelectItem value="bao-mat">Bảo mật</SelectItem>
                        <SelectItem value="tien-ich">Tiện ích</SelectItem>
                        <SelectItem value="csdl">Cơ sở dữ liệu</SelectItem>

                      </SelectContent>
                    </Select>
                  </div>
                )}
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
            </form>

            <div className="text-end">
              <DialogClose asChild>

                <Button type="button"  >
                  Hủy
                </Button>
              </DialogClose>
              <DialogClose asChild>

                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 ml-2">
                  Lưu
                </Button>
              </DialogClose>
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
                  <SelectValue placeholder="Chọn hoạt động" />
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
          <CardTitle>Thư viện media ({Image.length} file)</CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Image.map((file: any) => (
                <div key={file.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src={file.thumbnail || "/public/placeholder.svg"}
                      alt={file.name}
                      className="w-full h-32 object-cover"
                    />
                    {file?.category?.name && (
                      <Badge className="absolute top-2 right-2" variant="default">{file.category.name}</Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-sm line-clamp-2 mb-2">{file.title}</h4>
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
                              <Select onValueChange={setSelectedDocType} defaultValue="image" disabled >
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn hoạt động" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="image">Ảnh</SelectItem>
                                  <SelectItem value="video">Video</SelectItem>
                                  <SelectItem value="audio">Âm thanh</SelectItem>
                                  <SelectItem value="document">Phần mềm</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              {selectedDocType === "image" && (
                                <div>
                                  <label className="block text-sm font-medium mb-1">Loại hoạt động</label>
                                  <Select onValueChange={setSelectedDocType} disabled>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Chọn hoạt động" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="huan-luyen">Huấn luyện</SelectItem>
                                      <SelectItem value="le-ki-niem">Lễ kỷ niệm</SelectItem>
                                      <SelectItem value="dien-tap">Diễn tập</SelectItem>
                                      <SelectItem value="sinh-hoat">Sinh hoạt</SelectItem>
                                      <SelectItem value="xay-dung">Xây dựng</SelectItem>

                                    </SelectContent>
                                  </Select>
                                </div>
                              )}
                              {selectedDocType === "video" && (
                                <div>
                                  <label className="block text-sm font-medium mb-1">Loại hoạt động</label>
                                  <Select onValueChange={setSelectedDocType} disabled>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Chọn hoạt động" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="huan-luyen">Huấn luyện</SelectItem>
                                      <SelectItem value="le-ki-niem">Lễ kỷ niệm</SelectItem>
                                      <SelectItem value="dien-tap">Diễn tập</SelectItem>
                                      <SelectItem value="phong-su">Phóng sự</SelectItem>
                                      <SelectItem value="tin-tuc">Tin tức</SelectItem>

                                    </SelectContent>
                                  </Select>
                                </div>
                              )}
                              {selectedDocType === "audio" && (
                                <div>
                                  <label className="block text-sm font-medium mb-1">Loại hoạt động</label>
                                  <Select onValueChange={setSelectedDocType} disabled>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Chọn hoạt động" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="quoc-ca">Quốc ca</SelectItem>
                                      <SelectItem value="cach-mang">Ca khúc cách mạng</SelectItem>
                                      <SelectItem value="quan-doi">Hành khúc quân đội</SelectItem>
                                      <SelectItem value="dan-ca">Dân ca</SelectItem>

                                    </SelectContent>
                                  </Select>
                                </div>
                              )}
                              {selectedDocType === "document" && (
                                <div>
                                  <label className="block text-sm font-medium mb-1">Loại hoạt động</label>
                                  <Select onValueChange={setSelectedDocType} disabled>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Chọn hoạt động" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="quan-li">Quản lý</SelectItem>
                                      <SelectItem value="bao-mat">Bảo mật</SelectItem>
                                      <SelectItem value="tien-ich">Tiện ích</SelectItem>
                                      <SelectItem value="csdl">Cơ sở dữ liệu</SelectItem>

                                    </SelectContent>
                                  </Select>
                                </div>
                              )}
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
                            <Select onValueChange={setSelectedDocType} defaultValue="image" disabled >
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn hoạt động" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="image">Ảnh</SelectItem>
                                <SelectItem value="video">Video</SelectItem>
                                <SelectItem value="audio">Âm thanh</SelectItem>
                                <SelectItem value="document">Phần mềm</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            {selectedDocType === "image" && (
                              <div>
                                <label className="block text-sm font-medium mb-1">Loại hoạt động</label>
                                <Select onValueChange={setSelectedDocType} disabled>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Chọn hoạt động" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="huan-luyen">Huấn luyện</SelectItem>
                                    <SelectItem value="le-ki-niem">Lễ kỷ niệm</SelectItem>
                                    <SelectItem value="dien-tap">Diễn tập</SelectItem>
                                    <SelectItem value="sinh-hoat">Sinh hoạt</SelectItem>
                                    <SelectItem value="xay-dung">Xây dựng</SelectItem>

                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                            {selectedDocType === "video" && (
                              <div>
                                <label className="block text-sm font-medium mb-1">Loại hoạt động</label>
                                <Select onValueChange={setSelectedDocType} disabled>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Chọn hoạt động" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="huan-luyen">Huấn luyện</SelectItem>
                                    <SelectItem value="le-ki-niem">Lễ kỷ niệm</SelectItem>
                                    <SelectItem value="dien-tap">Diễn tập</SelectItem>
                                    <SelectItem value="phong-su">Phóng sự</SelectItem>
                                    <SelectItem value="tin-tuc">Tin tức</SelectItem>

                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                            {selectedDocType === "audio" && (
                              <div>
                                <label className="block text-sm font-medium mb-1">Loại hoạt động</label>
                                <Select onValueChange={setSelectedDocType} disabled>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Chọn hoạt động" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="quoc-ca">Quốc ca</SelectItem>
                                    <SelectItem value="cach-mang">Ca khúc cách mạng</SelectItem>
                                    <SelectItem value="quan-doi">Hành khúc quân đội</SelectItem>
                                    <SelectItem value="dan-ca">Dân ca</SelectItem>

                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                            {selectedDocType === "document" && (
                              <div>
                                <label className="block text-sm font-medium mb-1">Loại hoạt động</label>
                                <Select onValueChange={setSelectedDocType} disabled>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Chọn hoạt động" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="quan-li">Quản lý</SelectItem>
                                    <SelectItem value="bao-mat">Bảo mật</SelectItem>
                                    <SelectItem value="tien-ich">Tiện ích</SelectItem>
                                    <SelectItem value="csdl">Cơ sở dữ liệu</SelectItem>

                                  </SelectContent>
                                </Select>
                              </div>
                            )}
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


"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Eye, Calendar, User, Filter } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Label } from "recharts"
import { DialogClose } from "@/components/ui/dialog";


export default function AdminPostsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const categories = [
    { id: "all", name: "Tất cả danh mục" },
    { id: "news", name: "Tin tức" },
    { id: "activities", name: "Hoạt động" },
    { id: "training", name: "Huấn luyện" },
    { id: "announcements", name: "Thông báo" },
  ]

  const statuses = [
    { id: "all", name: "Tất cả trạng thái" },
    { id: "published", name: "Đã xuất bản" },
    { id: "draft", name: "Bản nháp" },
    { id: "pending", name: "Chờ duyệt" },
  ]

  const posts = [
    {
      id: 1,
      title: "Hội nghị tổng kết công tác năm 2024",
      category: "activities",
      categoryName: "Hoạt động",
      status: "published",
      statusName: "Đã xuất bản",
      author: "Admin",
      date: "15/12/2024",
      views: 1250,
      featured: true,
    },
    {
      id: 2,
      title: "Diễn tập phòng thủ khu vực 2024",
      category: "training",
      categoryName: "Huấn luyện",
      status: "published",
      statusName: "Đã xuất bản",
      author: "Phòng Tham mưu",
      date: "12/12/2024",
      views: 980,
      featured: true,
    },
    {
      id: 3,
      title: "Thông báo về lịch nghỉ Tết Nguyên đán 2025",
      category: "announcements",
      categoryName: "Thông báo",
      status: "draft",
      statusName: "Bản nháp",
      author: "Admin",
      date: "10/12/2024",
      views: 0,
      featured: false,
    },
    {
      id: 4,
      title: "Tin tức quốc tế về tình hình an ninh",
      category: "news",
      categoryName: "Tin tức",
      status: "pending",
      statusName: "Chờ duyệt",
      author: "Phòng Chính trị",
      date: "08/12/2024",
      views: 0,
      featured: false,
    },
  ]

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || post.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const stats = [
    { label: "Tổng bảng tin", value: "156", color: "text-blue-600" },
    { label: "Đã xuất bản", value: "142", color: "text-green-600" },
    { label: "Bản nháp", value: "8", color: "text-yellow-600" },
    { label: "Chờ duyệt", value: "6", color: "text-red-600" },
  ]
  const handleDelete = () => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xoá?");

    if (confirmDelete) {
      // 👉 Logic xoá ở đây — ví dụ API, xóa item, v.v.
      console.log("Đã xoá bảng tin");

      // 👉 Thông báo
      if (Notification.permission === "granted") {
        new Notification("Đã xoá bảng tin", {
          body: "bảng tin đã được xoá thành công.",
        });
      } else if (Notification.permission !== "denied") {
        // Yêu cầu quyền nếu chưa được cấp
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("Đã xoá bảng tin", {
              body: "bảng tin đã được xoá thành công.",
            });
          } else {
            alert("Đã xoá bảng tin.");
          }
        });
      } else {
        alert("Đã xoá bảng tin.");
      }
    }
  };

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý bảng tin</h1>
        <Dialog >
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Thêm bảng tin mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">
            <DialogHeader >
              <DialogTitle>Thêm bảng tin mới</DialogTitle>
            </DialogHeader>
            <div className=" space-y-4 mt-4 ">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tiêu đề(*)</label>
                  <Input placeholder="Nhập tiêu đề bảng tin" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tóm Tắt (*)</label>
                  <Input placeholder="Nhập tóm tắt bảng tin" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nội dung</label>
                  <textarea
                    className="mt-1 w-full border rounded-md p-2"
                    rows={10}
                    placeholder="Nhập nội dung bảng tin"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="">Danh mục</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tin-trong-nuoc">Tin trong nước </SelectItem>
                        <SelectItem value="tin-quoc-te">Quốc tế</SelectItem>
                        <SelectItem value="tin-tuc-quan-su">Tin tức quân sự</SelectItem>
                        <SelectItem value="tin-hoat-dong-su-doan">Tin hoạt động của sư đoàn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="">Hình ảnh</label>

                    <div className="space-y-2">
                      <Input
                        id="imageFile"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="cursor-pointer"
                      />
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="mt-2 w-32 h-32 object-cover rounded border"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="">Hoạt động quân sự</label>

                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn hoạt động" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vu-khi-trang-bi">Vũ khí trang bị</SelectItem>
                        <SelectItem value="chien-thuat">Chiến Thuật</SelectItem>
                        <SelectItem value="cong-nghe-quan-su">Công nghệ quân sự</SelectItem>
                        <SelectItem value="quoc-phong">Quốc Phòng</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="">Hoạt động sư đoàn</label>

                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn hoạt động" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="huan-luyen">Huấn luyện</SelectItem>
                        <SelectItem value="thi-dua">Thi đua</SelectItem>
                        <SelectItem value="hoi-nghi">Hội Nghị</SelectItem>
                        <SelectItem value="sinh-hoat">Sinh Hoạt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>


                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    className="rounded"
                  />
                  <label htmlFor="featured" className="text-sm text-gray-700">
                    Gắn bảng tin nổi bật
                  </label>
                </div>
              </form>
            </div>
            <DialogFooter className="flex-shrink-0 mt-4">
              <DialogClose asChild>
                <Button type="button" className="mr-2">
                  Hủy
                </Button>
              </DialogClose>
              <DialogClose asChild>

                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Lưu bảng tin
                </Button>
              </DialogClose>
            </DialogFooter>
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

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Bộ lọc và tìm kiếm
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Tìm kiếm bảng tin..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.id} value={status.id}>
                      {status.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button variant="outline" className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Tìm kiếm
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách bảng tin ({filteredPosts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-800">{post.title}</h3>
                    {post.featured && <Badge variant="destructive">Nổi bật</Badge>}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <Badge variant="outline">{post.categoryName}</Badge>
                    <Badge
                      variant={
                        post.status === "published" ? "default" : post.status === "draft" ? "secondary" : "destructive"
                      }
                    >
                      {post.statusName}
                    </Badge>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {post.views}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {/* <Dialog o> */}

                  <Dialog >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Xem bảng tin</DialogTitle>
                      </DialogHeader>

                      <div className="space-y-4 mt-4">
                        <form className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Tiêu đề(*)</label>
                            <Input placeholder="Nhập tiêu đề bảng tin" disabled />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">Tóm Tắt (*)</label>
                            <Input placeholder="Nhập tóm tắt bảng tin" disabled />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">Nội dung</label>
                            <textarea
                              className="mt-1 w-full border rounded-md p-2"
                              rows={10}
                              placeholder="Nhập nội dung bảng tin"
                              disabled />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label>Danh mục</label>
                              <Select disabled>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn danh mục" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="tin-trong-nuoc">Tin trong nước</SelectItem>
                                  <SelectItem value="tin-quoc-te">Quốc tế</SelectItem>
                                  <SelectItem value="tin-tuc-quan-su">Tin tức quân sự</SelectItem>
                                  <SelectItem value="tin-hoat-dong-su-doan">Tin hoạt động của sư đoàn</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label>Hình ảnh</label>
                              <div className="space-y-2">
                                <Input
                                  id="imageFile"
                                  type="file"
                                  onChange={handleFileChange}
                                  accept="image/*"
                                  className="cursor-pointer"
                                  disabled />
                                {imagePreview && (
                                  <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="mt-2 w-32 h-32 object-cover rounded border"
                                  />
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label>Hoạt động quân sự</label>
                              <Select disabled>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn hoạt động" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="vu-khi-trang-bi">Vũ khí trang bị</SelectItem>
                                  <SelectItem value="chien-thuat">Chiến Thuật</SelectItem>
                                  <SelectItem value="cong-nghe-quan-su">Công nghệ quân sự</SelectItem>
                                  <SelectItem value="quoc-phong">Quốc Phòng</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label>Hoạt động sư đoàn</label>
                              <Select disabled>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn hoạt động" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="huan-luyen">Huấn luyện</SelectItem>
                                  <SelectItem value="thi-dua">Thi đua</SelectItem>
                                  <SelectItem value="hoi-nghi">Hội Nghị</SelectItem>
                                  <SelectItem value="sinh-hoat">Sinh Hoạt</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="featured" className="rounded" disabled />
                            <label htmlFor="featured" className="text-sm text-gray-700">
                              Gắn bảng tin nổi bật
                            </label>
                          </div>

                          <DialogFooter>
                            <DialogClose asChild>

                              <Button type="button" >
                                Hủy
                              </Button>
                            </DialogClose>

                          </DialogFooter>
                        </form>
                      </div>
                    </DialogContent>
                  </Dialog>


                  <Dialog >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Cập nhật bảng tin</DialogTitle>
                      </DialogHeader>

                      <div className="space-y-4 mt-4">
                        <form className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Tiêu đề(*)</label>
                            <Input placeholder="Nhập tiêu đề bảng tin" />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">Tóm Tắt (*)</label>
                            <Input placeholder="Nhập tóm tắt bảng tin" />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">Nội dung</label>
                            <textarea
                              className="mt-1 w-full border rounded-md p-2"
                              rows={10}
                              placeholder="Nhập nội dung bảng tin"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label>Danh mục</label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn danh mục" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="tin-trong-nuoc">Tin trong nước</SelectItem>
                                  <SelectItem value="tin-quoc-te">Quốc tế</SelectItem>
                                  <SelectItem value="tin-tuc-quan-su">Tin tức quân sự</SelectItem>
                                  <SelectItem value="tin-hoat-dong-su-doan">Tin hoạt động của sư đoàn</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label>Hình ảnh</label>
                              <div className="space-y-2">
                                <Input
                                  id="imageFile"
                                  type="file"
                                  onChange={handleFileChange}
                                  accept="image/*"
                                  className="cursor-pointer"
                                />
                                {imagePreview && (
                                  <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="mt-2 w-32 h-32 object-cover rounded border"
                                  />
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label>Hoạt động quân sự</label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn hoạt động" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="vu-khi-trang-bi">Vũ khí trang bị</SelectItem>
                                  <SelectItem value="chien-thuat">Chiến Thuật</SelectItem>
                                  <SelectItem value="cong-nghe-quan-su">Công nghệ quân sự</SelectItem>
                                  <SelectItem value="quoc-phong">Quốc Phòng</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label>Hoạt động sư đoàn</label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn hoạt động" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="huan-luyen">Huấn luyện</SelectItem>
                                  <SelectItem value="thi-dua">Thi đua</SelectItem>
                                  <SelectItem value="hoi-nghi">Hội Nghị</SelectItem>
                                  <SelectItem value="sinh-hoat">Sinh Hoạt</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="featured" className="rounded" />
                            <label htmlFor="featured" className="text-sm text-gray-700">
                              Gắn bảng tin nổi bật
                            </label>
                          </div>

                          <DialogFooter>
                            <DialogClose asChild>

                              <Button type="submit">Hủy</Button>
                            </DialogClose>
                            <DialogClose asChild>

                              <Button
                                type="submit"

                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                Lưu
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </form>
                      </div>
                    </DialogContent>
                  </Dialog>

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
        </CardContent>
      </Card>
    </div >
  )
}

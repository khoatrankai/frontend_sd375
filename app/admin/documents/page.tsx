"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Download, Calendar, User, FileText, Building } from "lucide-react"
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { DialogHeader } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export default function AdminDocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedUnit, setSelectedUnit] = useState("all")

  const documentTypes = [
    { id: "all", name: "Tất cả loại" },
    { id: "directive", name: "Chỉ thị" },
    { id: "notice", name: "Thông báo" },
    { id: "plan", name: "Kế hoạch" },
    { id: "regulation", name: "Quy định" },
    { id: "report", name: "Báo cáo" },
  ]

  const units = [
    { id: "all", name: "Tất cả đơn vị" },
    { id: "command", name: "Chỉ huy sư đoàn" },
    { id: "political", name: "Phòng chính trị" },
    { id: "staff", name: "Phòng tham mưu" },
    { id: "logistics", name: "Phòng HC-KT" },
  ]

  const documents = [
    {
      id: 1,
      title: "Chỉ thị số 01/CT-F375 về công tác chuẩn bị năm 2025",
      type: "directive",
      typeName: "Chỉ thị",
      unit: "command",
      unitName: "Chỉ huy sư đoàn",
      author: "Đại tá Nguyễn Văn A",
      date: "15/12/2024",
      downloads: 45,
      size: "2.3 MB",
      status: "published",
    },
    {
      id: 2,
      title: "Thông báo về việc tổ chức hội nghị tổng kết",
      type: "notice",
      typeName: "Thông báo",
      unit: "political",
      unitName: "Phòng chính trị",
      author: "Trung tá Trần Văn B",
      date: "12/12/2024",
      downloads: 32,
      size: "1.8 MB",
      status: "published",
    },
    {
      id: 3,
      title: "Kế hoạch huấn luyện quý I/2025",
      type: "plan",
      typeName: "Kế hoạch",
      unit: "staff",
      unitName: "Phòng tham mưu",
      author: "Thiếu tá Lê Văn C",
      date: "10/12/2024",
      downloads: 67,
      size: "4.1 MB",
      status: "draft",
    },
    {
      id: 4,
      title: "Quy định về quản lý tài sản kỹ thuật",
      type: "regulation",
      typeName: "Quy định",
      unit: "logistics",
      unitName: "Phòng HC-KT",
      author: "Đại úy Phạm Văn D",
      date: "08/12/2024",
      downloads: 28,
      size: "3.2 MB",
      status: "pending",
    },
    {
      id: 5,
      title: "Báo cáo tình hình thực hiện nhiệm vụ tháng 12",
      type: "report",
      typeName: "Báo cáo",
      unit: "staff",
      unitName: "Phòng tham mưu",
      author: "Trung tá Hoàng Văn E",
      date: "05/12/2024",
      downloads: 19,
      size: "2.7 MB",
      status: "published",
    },
  ]

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || doc.type === selectedType
    const matchesUnit = selectedUnit === "all" || doc.unit === selectedUnit
    return matchesSearch && matchesType && matchesUnit
  })

  const stats = [
    { label: "Tổng văn bản", value: "89", color: "text-blue-600" },
    { label: "Đã xuất bản", value: "76", color: "text-green-600" },
    { label: "Bản nháp", value: "8", color: "text-yellow-600" },
    { label: "Chờ duyệt", value: "5", color: "text-red-600" },
  ]
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
  const handleDownloadAll = async () => {
    const fileUrls = [
      "https://example.com/file1.pdf",
      "https://example.com/image.jpg",
    ];

    for (const url of fileUrls) {
      try {
        const res = await fetch(url);
        const blob = await res.blob();

        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = url.split("/").pop() || "download"; // đặt tên file
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // cleanup
        URL.revokeObjectURL(a.href);
      } catch (err) {
        console.error("Lỗi tải file:", err);
      }
    }
  };
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        alert("Kích thước file không được vượt quá 50MB");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };



  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý văn bản</h1>
        <Dialog >
          <DialogTrigger asChild>
            <Button
              className="bg-white text-green-600 hover:bg-gray-100 shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm văn bản mới
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tạo văn bản mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label>Tiêu đề *</label>
                <Input placeholder="Nhập tiêu đề văn bản" />
              </div>

              <div>
                <label>Mô tả *</label>
                <Textarea
                  id="description"
                  placeholder="Nhập mô tả văn bản"
                  rows={10}
                />
              </div>

              <div>
                <label>Số văn bản</label>
                <Input placeholder="Nhập số văn bản" />
              </div>

              <div>
                <label>Danh mục *</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Thêm các danh mục */}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="">Tải file lên</label>
                <div className="space-y-2 mt-2">
                  <Input
                    id="fileUrl"
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                    onChange={handleFileChange}
                  />

                  {selectedFile && (
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded border border-green-300">
                      <span className="text-sm text-green-700">
                        ✓ File đã được tải lên: <strong>{selectedFile.name}</strong>
                      </span>
                      <button
                        onClick={handleRemoveFile}
                        className="text-red-500 text-sm hover:underline"
                      >
                        Xóa
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button type="button" >
                  Hủy
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Lưu
                </Button>
              </DialogFooter>


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
                <FileText className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Tìm kiếm văn bản..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại văn bản" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn đơn vị" />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.name}
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

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách văn bản ({filteredDocuments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">{doc.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <Badge variant="outline">{doc.typeName}</Badge>
                      <Badge
                        variant={
                          doc.status === "published" ? "default" : doc.status === "draft" ? "secondary" : "destructive"
                        }
                      >
                        {doc.status === "published" ? "Đã xuất bản" : doc.status === "draft" ? "Bản nháp" : "Chờ duyệt"}
                      </Badge>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        {doc.unitName}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {doc.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {doc.date}
                      </div>
                      <span>Dung lượng: {doc.size}</span>
                      <span>Lượt tải: {doc.downloads}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={handleDownloadAll}>
                    <Download className="h-4 w-4" />
                  </Button>

                  <Dialog >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Tạo văn bản mới</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label>Tiêu đề *</label>
                          <Input placeholder="Nhập tiêu đề văn bản" />
                        </div>

                        <div>
                          <label>Mô tả *</label>
                          <Textarea
                            id="description"
                            placeholder="Nhập mô tả văn bản"
                            rows={10}
                          />
                        </div>

                        <div>
                          <label>Số văn bản</label>
                          <Input placeholder="Nhập số văn bản" />
                        </div>

                        <div>
                          <label>Danh mục *</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn danh mục" />
                            </SelectTrigger>
                            <SelectContent>
                              {/* Thêm các danh mục */}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label htmlFor="">Tải file lên</label>
                          <div className="space-y-2 mt-2">
                            <Input
                              id="fileUrl"
                              type="file"
                              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                              onChange={handleFileChange}
                            />

                            {selectedFile && (
                              <div className="flex items-center gap-2 p-2 bg-green-50 rounded border border-green-300">
                                <span className="text-sm text-green-700">
                                  ✓ File đã được tải lên: <strong>{selectedFile.name}</strong>
                                </span>
                                <button
                                  onClick={handleRemoveFile}
                                  className="text-red-500 text-sm hover:underline"
                                >
                                  Xóa
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="button" >
                            Hủy
                          </Button>
                          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                            Lưu
                          </Button>
                        </DialogFooter>
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
    </div>
  )
}

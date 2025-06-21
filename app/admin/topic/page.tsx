"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Download, Calendar, User, FileText, Building, Eye } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { DialogHeader } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { usePathname } from "next/navigation"

export default function AdminDocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedUnit, setSelectedUnit] = useState("all")


  const documentTypes = [
    // { id: "all", name: "Tất cả loại" },
    // { id: "regulation", name: "Liên hệ góp ý" },
    { id: "report", name: "CCHC & Chuyển đổi số" },
    { id: "directive", name: "Thông tin tuyên truyền" },
    { id: "notice", name: "Thông tin Pháp luật" },
    { id: "plan", name: "Thông tin KHQS" },
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
    { label: "CCHC & Chuyển đổi số", value: "89", color: "text-blue-600" },
    { label: "Thông tin tuyên truyền", value: "76", color: "text-green-600" },
    { label: "Thông tin Pháp luật", value: "8", color: "text-yellow-600" },
    { label: "TThông tin KHQS", value: "5", color: "text-red-600" },
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
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };
  const [selectedDocType, setSelectedDocType] = useState("all");
  const reportSectionRef = useRef<HTMLDivElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const pathname = usePathname()
  const [dialogOpen, setDialogOpen] = useState(false)
  useEffect(() => {
    // Nếu đang ở trang giới thiệu thì tự chọn "report" và mở dialog
    if (pathname === "/admin/topic") {
      setSelectedDocType("report")
      // setDialogOpen(true)
    }
  }, [pathname])
  const [inputValue, setInputValue] = useState("")
  const [fields, setFields] = useState<string[]>([])

  const handleAddField = () => {
    const trimmed = inputValue.trim()
    if (trimmed && !fields.includes(trimmed)) {
      setFields([...fields, trimmed])
    }
    setInputValue("") // Reset ô input
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý chuyên đề</h1>

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
              <Select onValueChange={setSelectedDocType} defaultValue="report" >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn mục" />
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
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-4">
              <CardTitle>Danh sách quản lý </CardTitle>
            </div>
            <div className="text-right" >
              {selectedDocType === "report" && (
                <Dialog >
                  <DialogTrigger asChild>
                    <Button
                      className="bg-white text-green-600 hover:bg-gray-100 shadow-lg"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm CCHC & Chuyển đổi số
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">

                    <DialogHeader >
                      <DialogTitle>CCHC & Chuyển đổi số</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label>Tiêu đề *</label>
                        <Input placeholder="Nhập tiêu đề " />
                      </div>

                      <div>
                        <label>Mô tả *</label>
                        <Textarea
                          id="description"
                          placeholder="Nhập mô tả "
                          rows={10}
                        />
                      </div>
                      <div>
                        <label>Loại bài viết</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại bài viết" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="chuyen-doi-so">Chuyển đổi số</SelectItem>
                            <SelectItem value="cai-cach-hanh-chinh">Cải cách hành chính</SelectItem>
                            <SelectItem value="chinh-phu-dien-tu">Chính phủ điện tử</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label>Thuộc lĩnh vực</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Input
                            className="w-60"
                            placeholder="Nhập"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddField()}
                          />
                          <Button type="button" onClick={handleAddField}>
                            Nhập
                          </Button>
                        </div>

                        {/* Hiển thị các lĩnh vực đã nhập */}
                        {fields.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {fields.map((field, index) => (
                              <div
                                key={index}
                                className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                              >
                                <span>{field}</span>
                                <button
                                  onClick={() => {
                                    const updated = fields.filter((_, i) => i !== index)
                                    setFields(updated)
                                  }}
                                  className="ml-2 text-red-500 hover:text-red-700"
                                  aria-label={`Xoá ${field}`}
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                      </div>
                      <div>
                        <label>Tên và cấp bậc</label>
                        <Input placeholder="Nhập tên và cấp bậc " />
                      </div>

                      <DialogFooter >
                        <DialogClose asChild>

                          <Button type="button"  >
                            Hủy
                          </Button>
                        </DialogClose>
                        <DialogClose asChild>

                          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                            Lưu
                          </Button>
                        </DialogClose>
                      </DialogFooter>


                    </div>
                  </DialogContent>

                </Dialog>
              )}
              {selectedDocType === "directive" && (
                <Dialog >
                  <DialogTrigger asChild>
                    <Button
                      className="bg-white text-green-600 hover:bg-gray-100 shadow-lg"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm Thông tin tuyên truyền
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">

                    <DialogHeader >
                      <DialogTitle>Thông tin tuyên truyền</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label>Tiêu đề *</label>
                        <Input placeholder="Nhập tiêu đề " />
                      </div>

                      <div>
                        <label>Mô tả *</label>
                        <Textarea
                          id="description"
                          placeholder="Nhập mô tả "
                          rows={10}
                        />
                      </div>
                      <div>
                        <label>Loại bài viết</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại bài viết" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="giao-duc-chinh-tri">Giáo dục chính trị</SelectItem>
                            <SelectItem value="truyen-thong">Truyền Thông</SelectItem>
                            <SelectItem value="van-hoa">Văn hóa</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label>Thuộc lĩnh vực</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Input
                            className="w-60"
                            placeholder="Nhập"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddField()}
                          />
                          <Button type="button" onClick={handleAddField}>
                            Nhập
                          </Button>
                        </div>

                        {/* Hiển thị các lĩnh vực đã nhập */}
                        {fields.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {fields.map((field, index) => (
                              <div
                                key={index}
                                className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                              >
                                <span>{field}</span>
                                <button
                                  onClick={() => {
                                    const updated = fields.filter((_, i) => i !== index)
                                    setFields(updated)
                                  }}
                                  className="ml-2 text-red-500 hover:text-red-700"
                                  aria-label={`Xoá ${field}`}
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                      </div>
                      <div>
                        <label>Tên và cấp bậc</label>
                        <Input placeholder="Nhập tên và cấp bậc " />
                      </div>

                      <DialogFooter >
                        <DialogClose asChild>

                          <Button type="button"  >
                            Hủy
                          </Button>
                        </DialogClose>
                        <DialogClose asChild>

                          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                            Lưu
                          </Button>
                        </DialogClose>
                      </DialogFooter>


                    </div>
                  </DialogContent>

                </Dialog>
              )}
              {selectedDocType === "notice" && (
                <Dialog >
                  <DialogTrigger asChild>
                    <Button
                      className="bg-white text-green-600 hover:bg-gray-100 shadow-lg"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm Thông tin Pháp luật
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">

                    <DialogHeader >
                      <DialogTitle>Thông tin Pháp luật</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label>Tiêu đề *</label>
                        <Input placeholder="Nhập tiêu đề " />
                      </div>

                      <div>
                        <label>Mô tả *</label>
                        <Textarea
                          id="description"
                          placeholder="Nhập mô tả "
                          rows={10}
                        />
                      </div>
                      <div>
                        <label>Loại bài viết</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại bài viết" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="luat-quoc-phong">Luật Quốc phòng</SelectItem>
                            <SelectItem value="luat-quan-su">Luật Quân sự</SelectItem>
                            <SelectItem value="quy-dinh">Quy định</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label>Thuộc lĩnh vực</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Input
                            className="w-60"
                            placeholder="Nhập"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddField()}
                          />
                          <Button type="button" onClick={handleAddField}>
                            Nhập
                          </Button>
                        </div>

                        {/* Hiển thị các lĩnh vực đã nhập */}
                        {fields.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {fields.map((field, index) => (
                              <div
                                key={index}
                                className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                              >
                                <span>{field}</span>
                                <button
                                  onClick={() => {
                                    const updated = fields.filter((_, i) => i !== index)
                                    setFields(updated)
                                  }}
                                  className="ml-2 text-red-500 hover:text-red-700"
                                  aria-label={`Xoá ${field}`}
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                      </div>
                      <div>
                        <label>Tên và cấp bậc</label>
                        <Input placeholder="Nhập tên và cấp bậc " />
                      </div>

                      <DialogFooter >
                        <DialogClose asChild>

                          <Button type="button"  >
                            Hủy
                          </Button>
                        </DialogClose>
                        <DialogClose asChild>

                          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                            Lưu
                          </Button>
                        </DialogClose>
                      </DialogFooter>


                    </div>
                  </DialogContent>

                </Dialog>
              )}
              {selectedDocType === "plan" && (
                <Dialog >
                  <DialogTrigger asChild>
                    <Button
                      className="bg-white text-green-600 hover:bg-gray-100 shadow-lg"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm Thông tin KHQS
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">

                    <DialogHeader >
                      <DialogTitle>CCHC & Chuyển đổi số</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label>Tiêu đề *</label>
                        <Input placeholder="Nhập tiêu đề " />
                      </div>

                      <div>
                        <label>Mô tả *</label>
                        <Textarea
                          id="description"
                          placeholder="Nhập mô tả "
                          rows={10}
                        />
                      </div>
                      <div>
                        <label>Loại bài viết</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại bài viết" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cong-nghe-quan-su">Công nghệ Quân sự</SelectItem>
                            <SelectItem value="chien-luoc">Chiến lược</SelectItem>
                            <SelectItem value="nghien-cuu">Nghiên cứu</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label>Thuộc lĩnh vực</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Input
                            className="w-60"
                            placeholder="Nhập"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddField()}
                          />
                          <Button type="button" onClick={handleAddField}>
                            Nhập
                          </Button>
                        </div>

                        {/* Hiển thị các lĩnh vực đã nhập */}
                        {fields.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {fields.map((field, index) => (
                              <div
                                key={index}
                                className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                              >
                                <span>{field}</span>
                                <button
                                  onClick={() => {
                                    const updated = fields.filter((_, i) => i !== index)
                                    setFields(updated)
                                  }}
                                  className="ml-2 text-red-500 hover:text-red-700"
                                  aria-label={`Xoá ${field}`}
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                      </div>
                      <div>
                        <label>Tên và cấp bậc</label>
                        <Input placeholder="Nhập tên và cấp bậc " />
                      </div>

                      <DialogFooter >
                        <DialogClose asChild>

                          <Button type="button"  >
                            Hủy
                          </Button>
                        </DialogClose>
                        <DialogClose asChild>

                          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                            Lưu
                          </Button>
                        </DialogClose>
                      </DialogFooter>


                    </div>
                  </DialogContent>

                </Dialog>
              )}


            </div>
          </div>

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
                  {/* <Button variant="outline" size="sm" >
                    <Eye className="h-4 w-4" />
                  </Button> */}
                  {selectedDocType === "report" && (
                    <Dialog >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">

                        <DialogHeader >
                          <DialogTitle> Xem CCHC & Chuyển đổi số</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label>Tiêu đề *</label>
                            <Input placeholder="xem tiêu đề " disabled />
                          </div>

                          <div>
                            <label>Mô tả *</label>
                            <Textarea
                              id="description"
                              placeholder="Xem mô tả "
                              rows={10}
                              disabled />
                          </div>
                          <div>
                            <label>Loại bài viết</label>
                            <Select disabled>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn loại bài viết" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="chuyen-doi-so">Chuyển đổi số</SelectItem>
                                <SelectItem value="cai-cach-hanh-chinh">Cải cách hành chính</SelectItem>
                                <SelectItem value="dchinh-phu-dien-tu">Chính phủ điện tử</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label>Thuộc lĩnh vực</label>
                            <div className="flex items-center gap-2 mt-1">
                              <Input
                                className="w-60"
                                placeholder="Xem"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAddField()}
                                disabled />
                              <Button type="button" onClick={handleAddField} disabled>
                                Nhập
                              </Button>
                            </div>

                            {/* Hiển thị các lĩnh vực đã nhập */}
                            {fields.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {fields.map((field, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                                  >
                                    <span>{field}</span>
                                    <button
                                      onClick={() => {
                                        const updated = fields.filter((_, i) => i !== index)
                                        setFields(updated)
                                      }}
                                      className="ml-2 text-red-500 hover:text-red-700"
                                      aria-label={`Xoá ${field}`}
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}

                          </div>
                          <div>
                            <label>Tên và cấp bậc</label>
                            <Input placeholder="Xem tên và cấp bậc " disabled />
                          </div>




                        </div>
                      </DialogContent>

                    </Dialog>
                  )}
                  {selectedDocType === "directive" && (
                    <Dialog >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">

                        <DialogHeader >
                          <DialogTitle>Xem thông tin tuyên truyền</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label>Tiêu đề *</label>
                            <Input placeholder="xem tiêu đề " disabled />
                          </div>

                          <div>
                            <label>Mô tả *</label>
                            <Textarea
                              id="description"
                              placeholder="Xem mô tả "
                              rows={10}
                              disabled />
                          </div>
                          <div>
                            <label>Loại bài viết</label>
                            <Select disabled>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn loại bài viết" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="giao-duc-chinh-tri">Giáo dục chính trị</SelectItem>
                                <SelectItem value="truyen-thong">Truyền Thông</SelectItem>
                                <SelectItem value="van-hoa">Văn hóa</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label>Thuộc lĩnh vực</label>
                            <div className="flex items-center gap-2 mt-1">
                              <Input
                                className="w-60"
                                placeholder="Xem"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAddField()}
                                disabled />
                              <Button type="button" onClick={handleAddField} disabled>
                                Nhập
                              </Button>
                            </div>

                            {/* Hiển thị các lĩnh vực đã nhập */}
                            {fields.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {fields.map((field, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                                  >
                                    <span>{field}</span>
                                    <button
                                      onClick={() => {
                                        const updated = fields.filter((_, i) => i !== index)
                                        setFields(updated)
                                      }}
                                      className="ml-2 text-red-500 hover:text-red-700"
                                      aria-label={`Xoá ${field}`}
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}

                          </div>
                          <div>
                            <label>Tên và cấp bậc</label>
                            <Input placeholder="Xem tên và cấp bậc " disabled />
                          </div>




                        </div>
                      </DialogContent>

                    </Dialog>
                  )}
                  {selectedDocType === "notice" && (
                    <Dialog >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">

                        <DialogHeader >
                          <DialogTitle>Xem thông tin Pháp luật</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label>Tiêu đề *</label>
                            <Input placeholder="xem tiêu đề " disabled />
                          </div>

                          <div>
                            <label>Mô tả *</label>
                            <Textarea
                              id="description"
                              placeholder="Xem mô tả "
                              rows={10}
                              disabled />
                          </div>
                          <div>
                            <label>Loại bài viết</label>
                            <Select disabled>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn loại bài viết" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="luat-quoc-phong">Luật Quốc phòng</SelectItem>
                                <SelectItem value="luat-quan-su">Luật Quân sự</SelectItem>
                                <SelectItem value="quy-dinh">Quy định</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label>Thuộc lĩnh vực</label>
                            <div className="flex items-center gap-2 mt-1">
                              <Input
                                className="w-60"
                                placeholder="Xem"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAddField()}
                                disabled />
                              <Button type="button" onClick={handleAddField} disabled>
                                Nhập
                              </Button>
                            </div>

                            {/* Hiển thị các lĩnh vực đã nhập */}
                            {fields.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {fields.map((field, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                                  >
                                    <span>{field}</span>
                                    <button
                                      onClick={() => {
                                        const updated = fields.filter((_, i) => i !== index)
                                        setFields(updated)
                                      }}
                                      className="ml-2 text-red-500 hover:text-red-700"
                                      aria-label={`Xoá ${field}`}
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}

                          </div>
                          <div>
                            <label>Tên và cấp bậc</label>
                            <Input placeholder="Xem tên và cấp bậc " disabled />
                          </div>




                        </div>
                      </DialogContent>

                    </Dialog>
                  )}
                  {selectedDocType === "plan" && (
                    <Dialog >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">

                        <DialogHeader >
                          <DialogTitle>Xem thông tin KHQS</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label>Tiêu đề *</label>
                            <Input placeholder="xem tiêu đề " disabled />
                          </div>

                          <div>
                            <label>Mô tả *</label>
                            <Textarea
                              id="description"
                              placeholder="Xem mô tả "
                              rows={10}
                              disabled />
                          </div>
                          <div>
                            <label>Loại bài viết</label>
                            <Select disabled>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn loại bài viết" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cong-nghe-quan-su">Công nghệ Quân sự</SelectItem>
                                <SelectItem value="chien-luoc">Chiến lược</SelectItem>
                                <SelectItem value="nghien-cuu">Nghiên cứu</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label>Thuộc lĩnh vực</label>
                            <div className="flex items-center gap-2 mt-1">
                              <Input
                                className="w-60"
                                placeholder="Xem"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAddField()}
                                disabled />
                              <Button type="button" onClick={handleAddField} disabled>
                                Nhập
                              </Button>
                            </div>

                            {/* Hiển thị các lĩnh vực đã nhập */}
                            {fields.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {fields.map((field, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                                  >
                                    <span>{field}</span>
                                    <button
                                      disabled
                                      onClick={() => {
                                        const updated = fields.filter((_, i) => i !== index)
                                        setFields(updated)
                                      }}
                                      className="ml-2 text-red-500 hover:text-red-700"
                                      aria-label={`Xoá ${field}`}
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}

                          </div>
                          <div>
                            <label>Tên và cấp bậc</label>
                            <Input placeholder="Xem tên và cấp bậc " disabled />
                          </div>




                        </div>
                      </DialogContent>

                    </Dialog>
                  )}



                  <div className="text-right">
                    {selectedDocType === "report" && (
                      <Dialog >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">

                          <DialogHeader >
                            <DialogTitle>Cập nhật CCHC & Chuyển đổi số</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label>Tiêu đề *</label>
                              <Input placeholder="Nhập tiêu đề " />
                            </div>

                            <div>
                              <label>Mô tả *</label>
                              <Textarea
                                id="description"
                                placeholder="Nhập mô tả "
                                rows={10}
                              />
                            </div>
                            <div>
                              <label>Loại bài viết</label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn loại bài viết" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="chuyen-doi-so">Chuyển đổi số</SelectItem>
                                  <SelectItem value="cai-cach-hanh-chinh">Cải cách hành chính</SelectItem>
                                  <SelectItem value="dchinh-phu-dien-tu">Chính phủ điện tử</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label>Thuộc lĩnh vực</label>
                              <div className="flex items-center gap-2 mt-1">
                                <Input
                                  className="w-60"
                                  placeholder="Nhập"
                                  value={inputValue}
                                  onChange={(e) => setInputValue(e.target.value)}
                                  onKeyDown={(e) => e.key === "Enter" && handleAddField()}
                                />
                                <Button type="button" onClick={handleAddField}>
                                  Nhập
                                </Button>
                              </div>

                              {/* Hiển thị các lĩnh vực đã nhập */}
                              {fields.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {fields.map((field, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                                    >
                                      <span>{field}</span>
                                      <button
                                        onClick={() => {
                                          const updated = fields.filter((_, i) => i !== index)
                                          setFields(updated)
                                        }}
                                        className="ml-2 text-red-500 hover:text-red-700"
                                        aria-label={`Xoá ${field}`}
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}

                            </div>
                            <div>
                              <label>Tên và cấp bậc</label>
                              <Input placeholder="Nhập tên và cấp bậc " />
                            </div>

                            <DialogFooter >
                              <DialogClose asChild>

                                <Button type="button"  >
                                  Hủy
                                </Button>
                              </DialogClose>
                              <DialogClose asChild>

                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                  Lưu
                                </Button>
                              </DialogClose>
                            </DialogFooter>


                          </div>
                        </DialogContent>

                      </Dialog>
                    )}
                    {selectedDocType === "directive" && (
                      <Dialog >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">

                          <DialogHeader >
                            <DialogTitle>Cập nhật CCHC & Chuyển đổi số</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label>Tiêu đề *</label>
                              <Input placeholder="Nhập tiêu đề " />
                            </div>

                            <div>
                              <label>Mô tả *</label>
                              <Textarea
                                id="description"
                                placeholder="Nhập mô tả "
                                rows={10}
                              />
                            </div>
                            <div>
                              <label>Loại bài viết</label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn loại bài viết" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="giao-duc-chinh-tri">Giáo dục chính trị</SelectItem>
                                  <SelectItem value="truyen-thong">Truyền Thông</SelectItem>
                                  <SelectItem value="van-hoa">Văn hóa</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label>Thuộc lĩnh vực</label>
                              <div className="flex items-center gap-2 mt-1">
                                <Input
                                  className="w-60"
                                  placeholder="Nhập"
                                  value={inputValue}
                                  onChange={(e) => setInputValue(e.target.value)}
                                  onKeyDown={(e) => e.key === "Enter" && handleAddField()}
                                />
                                <Button type="button" onClick={handleAddField}>
                                  Nhập
                                </Button>
                              </div>

                              {/* Hiển thị các lĩnh vực đã nhập */}
                              {fields.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {fields.map((field, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                                    >
                                      <span>{field}</span>
                                      <button
                                        onClick={() => {
                                          const updated = fields.filter((_, i) => i !== index)
                                          setFields(updated)
                                        }}
                                        className="ml-2 text-red-500 hover:text-red-700"
                                        aria-label={`Xoá ${field}`}
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}

                            </div>
                            <div>
                              <label>Tên và cấp bậc</label>
                              <Input placeholder="Nhập tên và cấp bậc " />
                            </div>

                            <DialogFooter >
                              <DialogClose asChild>

                                <Button type="button"  >
                                  Hủy
                                </Button>
                              </DialogClose>
                              <DialogClose asChild>

                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                  Lưu
                                </Button>
                              </DialogClose>
                            </DialogFooter>


                          </div>
                        </DialogContent>

                      </Dialog>
                    )}
                    {selectedDocType === "notice" && (
                      <Dialog >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">

                          <DialogHeader >
                            <DialogTitle>Cập nhật CCHC & Chuyển đổi số</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label>Tiêu đề *</label>
                              <Input placeholder="Nhập tiêu đề " />
                            </div>

                            <div>
                              <label>Mô tả *</label>
                              <Textarea
                                id="description"
                                placeholder="Nhập mô tả "
                                rows={10}
                              />
                            </div>
                            <div>
                              <label>Loại bài viết</label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn loại bài viết" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="luat-quoc-phong">Luật Quốc phòng</SelectItem>
                                  <SelectItem value="luat-quan-su">Luật Quân sự</SelectItem>
                                  <SelectItem value="quy-dinh">Quy định</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label>Thuộc lĩnh vực</label>
                              <div className="flex items-center gap-2 mt-1">
                                <Input
                                  className="w-60"
                                  placeholder="Nhập"
                                  value={inputValue}
                                  onChange={(e) => setInputValue(e.target.value)}
                                  onKeyDown={(e) => e.key === "Enter" && handleAddField()}
                                />
                                <Button type="button" onClick={handleAddField}>
                                  Nhập
                                </Button>
                              </div>

                              {/* Hiển thị các lĩnh vực đã nhập */}
                              {fields.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {fields.map((field, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                                    >
                                      <span>{field}</span>
                                      <button
                                        onClick={() => {
                                          const updated = fields.filter((_, i) => i !== index)
                                          setFields(updated)
                                        }}
                                        className="ml-2 text-red-500 hover:text-red-700"
                                        aria-label={`Xoá ${field}`}
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}

                            </div>
                            <div>
                              <label>Tên và cấp bậc</label>
                              <Input placeholder="Nhập tên và cấp bậc " />
                            </div>

                            <DialogFooter >
                              <DialogClose asChild>

                                <Button type="button"  >
                                  Hủy
                                </Button>
                              </DialogClose>
                              <DialogClose asChild>

                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                  Lưu
                                </Button>
                              </DialogClose>
                            </DialogFooter>


                          </div>
                        </DialogContent>

                      </Dialog>
                    )}
                    {selectedDocType === "plan" && (
                      <Dialog >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">

                          <DialogHeader >
                            <DialogTitle>Cập nhật CCHC & Chuyển đổi số</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label>Tiêu đề *</label>
                              <Input placeholder="Nhập tiêu đề " />
                            </div>

                            <div>
                              <label>Mô tả *</label>
                              <Textarea
                                id="description"
                                placeholder="Nhập mô tả "
                                rows={10}
                              />
                            </div>
                            <div>
                              <label>Loại bài viết</label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn loại bài viết" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="cong-nghe-quan-su">Công nghệ Quân sự</SelectItem>
                                  <SelectItem value="chien-luoc">Chiến lược</SelectItem>
                                  <SelectItem value="nghien-cuu">Nghiên cứu</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label>Thuộc lĩnh vực</label>
                              <div className="flex items-center gap-2 mt-1">
                                <Input
                                  className="w-60"
                                  placeholder="Nhập"
                                  value={inputValue}
                                  onChange={(e) => setInputValue(e.target.value)}
                                  onKeyDown={(e) => e.key === "Enter" && handleAddField()}
                                />
                                <Button type="button" onClick={handleAddField}>
                                  Nhập
                                </Button>
                              </div>

                              {/* Hiển thị các lĩnh vực đã nhập */}
                              {fields.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {fields.map((field, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                                    >
                                      <span>{field}</span>
                                      <button
                                        onClick={() => {
                                          const updated = fields.filter((_, i) => i !== index)
                                          setFields(updated)
                                        }}
                                        className="ml-2 text-red-500 hover:text-red-700"
                                        aria-label={`Xoá ${field}`}
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}

                            </div>
                            <div>
                              <label>Tên và cấp bậc</label>
                              <Input placeholder="Nhập tên và cấp bậc " />
                            </div>

                            <DialogFooter >
                              <DialogClose asChild>

                                <Button type="button"  >
                                  Hủy
                                </Button>
                              </DialogClose>
                              <DialogClose asChild>

                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                  Lưu
                                </Button>
                              </DialogClose>
                            </DialogFooter>


                          </div>
                        </DialogContent>

                      </Dialog>
                    )}


                  </div>
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

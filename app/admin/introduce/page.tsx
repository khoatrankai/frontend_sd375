"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Download, Calendar, User, FileText, Building, Eye, Phone } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { DialogHeader } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { usePathname } from "next/navigation"
import { reportService } from "@/services/report.service"

export default function AdminDocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedUnit, setSelectedUnit] = useState("all")
  //phân trang
  const [report, setReport] = useState<any>([])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Tính vị trí dữ liệu
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReport = report.slice(indexOfFirstItem, indexOfLastItem);

  // Tổng số trang
  const totalPages = Math.ceil(report.length / itemsPerPage);

  // Phân nhóm trang (2 trang mỗi cụm)
  const pagesPerGroup = 2;
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  const totalGroups = Math.ceil(totalPages / pagesPerGroup);

  // Xác định các trang trong cụm hiện tại
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  // Chuyển nhóm
  const handlePrevGroup = () => {
    const newPage = Math.max(1, startPage - pagesPerGroup);
    setCurrentPage(newPage);
  };

  const handleNextGroup = () => {
    const newPage = Math.min(totalPages, startPage + pagesPerGroup);
    setCurrentPage(newPage);
  };
  //end phân trang



  const documentTypes = [
    // { id: "all", name: "Tất cả loại" },
    // { id: "report", name: "Giới thiệu" },
    { id: "directive", name: "Lịch sử chiến đấu" },
    { id: "notice", name: "Các phần thưởng cao quý" },
    { id: "plan", name: "Lãnh đạo -  Chỉ huy" },
    { id: "regulation", name: "Liên hệ góp ý" },
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
    { label: "Lịch sử chiến đấu", value: "89", color: "text-blue-600" },
    { label: "Các phần thưởng cao quý", value: "76", color: "text-green-600" },
    { label: "Lãnh đạo - Chỉ huy", value: "8", color: "text-yellow-600" },
    { label: "Liên hệ - Góp ý", value: "5", color: "text-red-600" },
  ]
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xoá?");

    if (confirmDelete) {
      const res = await reportService.deleteReport(id)
      if (res?.statusCode === 200) {


      }
      console.log("Đã xoá phản hồi");

      // 👉 Thông báo
      if (Notification.permission === "granted") {
        new Notification("Đã xoá phản hồi", {
          body: "phản hồi đã được xoá thành công.",
        });
      } else if (Notification.permission !== "denied") {
        // Yêu cầu quyền nếu chưa được cấp
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("Đã xoá phản hồi", {
              body: "phản hồi đã được xoá thành công.",
            });
          } else {
            alert("Đã xoá phản hồi.");
          }
        });
      } else {
        alert("Đã xoá phản hồi.");
      }
      fetchData()
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
    if (pathname === "/admin/introduce") {
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
  const [open, setOpen] = useState(false);

  const [catagory, setCategory] = useState<any>([])

  const fetchData = async () => {
    const res = await reportService.getCategories() as any
    const res2 = await reportService.getReports() as any
    if (res.statusCode === 200) {
      setCategory(res.data)
    }
    if (res.statusCode === 200) {
      setReport(res2.data)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])


  return (
    <div className="p-6 space-y-6 overflow-auto max-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý giới thiệu</h1>

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
              <Select onValueChange={setSelectedDocType} defaultValue="directive" >
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

            {/* <div>
              <Button variant="outline" className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Tìm kiếm
              </Button>
            </div> */}
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
              {/* {selectedDocType === "report" && (
                <Dialog >
                  <DialogTrigger asChild>
                    <Button
                      className="bg-white text-green-600 hover:bg-gray-100 shadow-lg"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm nội dung giới thiệu
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">

                    <DialogHeader >
                      <DialogTitle>Giới Thiệu</DialogTitle>
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
                        <label>Năm thành lập</label>
                        <Input type="number" placeholder="Nhập năm thành lập " />
                      </div>
                      <div>
                        <label>Số đơn vị trực thuộc</label>
                        <Input type="number" placeholder="Nhập số đơn vị trực thuộc" />
                      </div>


                      <div>
                        <label className="block text-sm font-medium text-gray-700">Tải file lên</label>
                        <div className="space-y-2">
                          <Input
                            id="imageFile"
                            type="file"
                            accept="image/*"
                            className="cursor-pointer"
                            onChange={handleFileChange}
                          />

                          {selectedFile && (
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 bg-green-50 rounded border border-green-300">
                              {previewUrl && (
                                <img
                                  src={previewUrl}
                                  alt="Preview"
                                  className="w-24 h-24 object-cover rounded"
                                />
                              )}
                              <div>
                                <span className="text-sm text-green-700 block">
                                  ✓ File đã được tải lên: <strong>{selectedFile.name}</strong>
                                </span>
                                <button
                                  onClick={handleRemoveFile}
                                  className="text-red-500 text-sm hover:underline mt-1"
                                >
                                  Xóa
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
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
              )} */}
              {selectedDocType === "directive" && (
                <Dialog >
                  <DialogTrigger asChild>
                    <Button
                      className="bg-white text-green-600 hover:bg-gray-100 shadow-lg"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm lịch sử chiến đấu
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">

                    <DialogHeader>
                      <DialogTitle>Tạo lịch sử chiến đấu</DialogTitle>
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
                        <label>Năm *</label>
                        <div className="flex items-center gap-2">
                          <Input type="number" placeholder="Nhập..." className="w-60" />
                          <span className="text-gray-600">(năm)</span>
                        </div>
                      </div>
                      <div>
                        <label>Các trận đánh tiêu biểu</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Input
                            placeholder="Nhập trận đánh"
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
                      <DialogFooter>
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
                      Thêm phần thưởng cao quý
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">

                    <DialogHeader>
                      <DialogTitle>Tạo phần thưởng cao quý</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label>Danh hiệu *</label>
                        <Input placeholder="Nhập Danh hiệu " />
                      </div>

                      <div>
                        <label>Nội dung danh hiệu *</label>
                        <Textarea
                          id="description"
                          placeholder="Nhập Nội dung danh hiệu"
                          rows={10}
                        />
                      </div>

                      <div>
                        <label>Năm nhận </label>
                        <Input type="number" placeholder="Nhập năm nhận " />
                      </div>

                      <div>
                        <label>Phần thưởng cao quý *</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn phần thưởng cao quý" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="huan-chuong-nha-nuoc">Huân chương nhà nước</SelectItem>
                            <SelectItem value="bang-khen-cac-cap">Bằng khen các cấp</SelectItem>
                            <SelectItem value="danh-hieu-tap-the">Danh hiệu tập thể</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label>Hạng huân chương *</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn phần thưởng cao quý" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cao-nhat">Cao nhất</SelectItem>
                            <SelectItem value="hang-nhat">Hạng nhất</SelectItem>
                            <SelectItem value="hang-nhi">Hạng nhì</SelectItem>
                            <SelectItem value="xuat-sac">Xuất sắc</SelectItem>
                            <SelectItem value="dac-biet">Đặc biệt</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>


                      <DialogFooter>
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
                      Thêm lãnh đạo - chỉ huy
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">

                    <DialogHeader>
                      <DialogTitle>Tạo lãnh đạo - chỉ huy</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label>Tên và cấp bậc *</label>
                        <Input placeholder="Nhập tên và cấp bậc" />
                      </div>
                      <div>
                        <label>Chức vụ *</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn chức vụ" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="chi-huy-sd">Chỉ huy trưởng Sư đoàn </SelectItem>
                            <SelectItem value="chinh-uy-sd">Chính ủy Sư đoàn  </SelectItem>
                            <SelectItem value="pho-chinh-uy-sd">Phó chính ủy Sư đoàn </SelectItem>
                            <SelectItem value="phi-chi-huy-sd">Phó chỉ huy trưởng Sư đoàn </SelectItem>
                            <SelectItem value="tham-muu-truong">Phó chỉ huy trưởng Sư đoàn,TMT </SelectItem>

                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label>Kinh nghiệm</label>
                        <div className="flex items-center gap-2">
                          <Input type="number" placeholder="Nhập " className="w-32" />
                          <span className="text-gray-600">(năm)</span>
                        </div>
                      </div>
                      <div>
                        <label>Học vấn</label>
                        <Input placeholder="Nhập học vấn" />
                      </div>
                      <div>
                        <label>Thành tích</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Input
                            className="w-100%"
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
                        <label>Số điện thoại</label>
                        <Input placeholder="Nhập Số điện thoại" />
                      </div>

                      <div>
                        <label>Email</label>
                        <Input placeholder="Nhập Email" />
                      </div>
                      <DialogFooter>
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
            {currentReport.map((doc: any) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">{doc.subject}</h3>
                    <div className="font-normal text-gray-400 mb-2">
                      {doc.message.split(" ").slice(0, 2).join(" ") + (doc.message.split(" ").length > 2 ? "..." : "")}
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      {/* <Badge variant="outline">{doc.typeName}</Badge> */}

                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        {doc.email}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {doc.name}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {doc.phone}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {doc?.category?.name}
                      </div>

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
                          <DialogTitle>Giới Thiệu</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label>Tiêu đề *</label>
                            <Input placeholder="Xem tiêu đề " disabled />
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
                            <label>Năm thành lập</label>
                            <Input type="number" placeholder="Xem năm thành lập " disabled />
                          </div>
                          <div>
                            <label>Số đơn vị trực thuộc</label>
                            <Input type="number" placeholder="Xem số đơn vị trực thuộc" disabled />
                          </div>


                          <div>
                            <label className="block text-sm font-medium text-gray-700">Tải file lên</label>
                            <div className="space-y-2">
                              <Input
                                id="imageFile"
                                type="file"
                                accept="image/*"
                                className="cursor-pointer"
                                onChange={handleFileChange}
                                disabled
                              />

                              {selectedFile && (
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 bg-green-50 rounded border border-green-300">
                                  {previewUrl && (
                                    <img
                                      src={previewUrl}
                                      alt="Preview"
                                      className="w-24 h-24 object-cover rounded"
                                    />
                                  )}
                                  <div>
                                    <span className="text-sm text-green-700 block">
                                      ✓ File đã được tải lên: <strong>{selectedFile.name}</strong>
                                    </span>
                                    <button
                                      onClick={handleRemoveFile}
                                      className="text-red-500 text-sm hover:underline mt-1"
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>



                        </div>
                      </DialogContent>

                    </Dialog>
                  )}
                  {selectedDocType === "directive" && (
                    <Dialog >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">

                        <DialogHeader>
                          <DialogTitle>Xem lịch sử chiến đấu</DialogTitle>
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
                              placeholder="xem mô tả "
                              rows={10}
                              disabled />
                          </div>

                          <div>
                            <label>Năm *</label>
                            <div className="flex items-center gap-2">
                              <Input type="number" placeholder="Nhập..." className="w-60" disabled />
                              <span className="text-gray-600">(năm)</span>
                            </div>
                          </div>
                          <div>
                            <label>Các trận đánh tiêu biểu</label>
                            <div className="flex items-center gap-2 mt-1">
                              <Input
                                placeholder="Nhập trận đánh"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAddField()}
                                disabled
                              />
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

                        <DialogHeader>
                          <DialogTitle>Xem phần thưởng cao quý</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label>Danh hiệu *</label>
                            <Input placeholder="Xem Danh hiệu " disabled />
                          </div>

                          <div>
                            <label>Nội dung danh hiệu *</label>
                            <Textarea
                              id="description"
                              placeholder="Xem Nội dung danh hiệu"
                              rows={10}
                              disabled />
                          </div>

                          <div>
                            <label>Năm nhận </label>
                            <Input type="number" placeholder="Xem năm nhận " disabled />
                          </div>

                          <div>
                            <label>Phần thưởng cao quý *</label>
                            <Select disabled>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn phần thưởng cao quý" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="huan-chuong-nha-nuoc">Huân chương nhà nước</SelectItem>
                                <SelectItem value="bang-khen-cac-cap">Bằng khen các cấp</SelectItem>
                                <SelectItem value="danh-hieu-tap-the">Danh hiệu tập thể</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label>Hạng huân chương *</label>
                            <Select disabled>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn phần thưởng cao quý" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cao-nhat">Cao nhất</SelectItem>
                                <SelectItem value="hang-nhat">Hạng nhất</SelectItem>
                                <SelectItem value="hang-nhi">Hạng nhì</SelectItem>
                                <SelectItem value="xuat-sac">Xuất sắc</SelectItem>
                                <SelectItem value="dac-biet">Đặc biệt</SelectItem>
                              </SelectContent>
                            </Select>
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

                        <DialogHeader>
                          <DialogTitle>Xem lãnh đạo - chỉ huy</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label>Tên và cấp bậc *</label>
                            <Input placeholder="Nhập tên và cấp bậc" disabled />
                          </div>
                          <div>
                            <label>Chức vụ *</label>
                            <Select disabled>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn chức vụ" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="chi-huy-sd">Chỉ huy trưởng Sư đoàn </SelectItem>
                                <SelectItem value="chinh-uy-sd">Chính ủy Sư đoàn  </SelectItem>
                                <SelectItem value="pho-chinh-uy-sd">Phó chính ủy Sư đoàn </SelectItem>
                                <SelectItem value="phi-chi-huy-sd">Phó chỉ huy trưởng Sư đoàn </SelectItem>
                                <SelectItem value="tham-muu-truong">Phó chỉ huy trưởng Sư đoàn,TMT </SelectItem>

                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label>Kinh nghiệm</label>
                            <div className="flex items-center gap-2">
                              <Input type="number" placeholder="Nhập " className="w-32" disabled />
                              <span className="text-gray-600">(năm)</span>
                            </div>
                          </div>
                          <div>
                            <label>Học vấn</label>
                            <Input placeholder="Nhập học vấn" disabled />
                          </div>
                          <div>
                            <label>Thành tích</label>
                            <div className="flex items-center gap-2 mt-1">
                              <Input
                                disabled
                                className="w-100%"
                                placeholder="Nhập"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAddField()}
                              />
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
                            <label>Số điện thoại</label>
                            <Input placeholder="Nhập Số điện thoại" disabled />
                          </div>

                          <div>
                            <label>Email</label>
                            <Input placeholder="Nhập Email" disabled />
                          </div>



                        </div>
                      </DialogContent>

                    </Dialog>
                  )}
                  {selectedDocType === "regulation" && (
                    <Dialog >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">

                        <DialogHeader>
                          <DialogTitle>Xem đánh giá</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label>Họ và tên </label>
                            <Input value={doc.name} placeholder="Xem họ và tên" disabled />
                          </div>
                          <div>
                            <label>Email</label>
                            <Input value={doc.email} placeholder="Xem Email" disabled />
                          </div>
                          <div>
                            <label>Số điện thoại </label>
                            <Input value={doc.phone} placeholder="Xem Số điện thoại" disabled />
                          </div>
                          <div>
                            <label>Loại góp ý</label>
                            <Select value={doc?.category?.id} disabled>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn loại">
                                  {doc?.category?.name}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                {doc?.category && (
                                  <SelectItem value={doc.category.id}>
                                    {doc.category.name}
                                  </SelectItem>
                                )}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label>Tiêu đề </label>
                            <Input value={doc.subject} placeholder="Xem họ và tên" disabled />
                          </div>

                          <div>
                            <label>Nội dung</label>
                            <Textarea
                              value={doc.message}
                              id="description"
                              placeholder="Nội dung"
                              rows={10}
                              disabled />
                          </div>



                        </div>
                      </DialogContent>

                    </Dialog>
                  )}


                  <div className="text-right">
                    {/* {selectedDocType === "report" && (
                      <Dialog >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">

                          <DialogHeader >
                            <DialogTitle>Giới Thiệu</DialogTitle>
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
                              <label>Năm thành lập</label>
                              <Input type="number" placeholder="Nhập năm thành lập " />
                            </div>
                            <div>
                              <label>Số đơn vị trực thuộc</label>
                              <Input type="number" placeholder="Nhập số đơn vị trực thuộc" />
                            </div>


                            <div>
                              <label className="block text-sm font-medium text-gray-700">Tải file lên</label>
                              <div className="space-y-2">
                                <Input
                                  id="imageFile"
                                  type="file"
                                  accept="image/*"
                                  className="cursor-pointer"
                                  onChange={handleFileChange}
                                />

                                {selectedFile && (
                                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 bg-green-50 rounded border border-green-300">
                                    {previewUrl && (
                                      <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-24 h-24 object-cover rounded"
                                      />
                                    )}
                                    <div>
                                      <span className="text-sm text-green-700 block">
                                        ✓ File đã được tải lên: <strong>{selectedFile.name}</strong>
                                      </span>
                                      <button
                                        onClick={handleRemoveFile}
                                        className="text-red-500 text-sm hover:underline mt-1"
                                      >
                                        Xóa
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
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
                    )} */}
                    {selectedDocType === "directive" && (
                      <Dialog >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">

                          <DialogHeader>
                            <DialogTitle>Cập nhật lịch sử chiến đấu</DialogTitle>
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
                              <label>Năm *</label>
                              <div className="flex items-center gap-2">
                                <Input type="number" placeholder="Nhập..." className="w-60" />
                                <span className="text-gray-600">(năm)</span>
                              </div>
                            </div>
                            <div>
                              <label>Các trận đánh tiêu biểu</label>
                              <div className="flex items-center gap-2 mt-1">
                                <Input
                                  placeholder="Nhập trận đánh"
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
                            <DialogFooter>
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
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">

                          <DialogHeader>
                            <DialogTitle>Cập nhật phần thưởng cao quý</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label>Danh hiệu *</label>
                              <Input placeholder="Nhập Danh hiệu " />
                            </div>

                            <div>
                              <label>Nội dung danh hiệu *</label>
                              <Textarea
                                id="description"
                                placeholder="Nhập Nội dung danh hiệu"
                                rows={10}
                              />
                            </div>

                            <div>
                              <label>Năm nhận </label>
                              <Input type="number" placeholder="Nhập năm nhận " />
                            </div>

                            <div>
                              <label>Phần thưởng cao quý *</label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn phần thưởng cao quý" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="huan-chuong-nha-nuoc">Huân chương nhà nước</SelectItem>
                                  <SelectItem value="bang-khen-cac-cap">Bằng khen các cấp</SelectItem>
                                  <SelectItem value="danh-hieu-tap-the">Danh hiệu tập thể</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label>Hạng huân chương *</label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn phần thưởng cao quý" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="cao-nhat">Cao nhất</SelectItem>
                                  <SelectItem value="hang-nhat">Hạng nhất</SelectItem>
                                  <SelectItem value="hang-nhi">Hạng nhì</SelectItem>
                                  <SelectItem value="xuat-sac">Xuất sắc</SelectItem>
                                  <SelectItem value="dac-biet">Đặc biệt</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>


                            <DialogFooter>
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

                          <DialogHeader>
                            <DialogTitle>Cập nhật lãnh đạo - chỉ huy</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label>Tên và cấp bậc *</label>
                              <Input placeholder="Nhập tên và cấp bậc" />
                            </div>
                            <div>
                              <label>Chức vụ *</label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn chức vụ" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="chi-huy-sd">Chỉ huy trưởng Sư đoàn </SelectItem>
                                  <SelectItem value="chinh-uy-sd">Chính ủy Sư đoàn  </SelectItem>
                                  <SelectItem value="pho-chinh-uy-sd">Phó chính ủy Sư đoàn </SelectItem>
                                  <SelectItem value="phi-chi-huy-sd">Phó chỉ huy trưởng Sư đoàn </SelectItem>
                                  <SelectItem value="tham-muu-truong">Phó chỉ huy trưởng Sư đoàn,TMT </SelectItem>

                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label>Kinh nghiệm</label>
                              <div className="flex items-center gap-2">
                                <Input type="number" placeholder="Nhập " className="w-32" />
                                <span className="text-gray-600">(năm)</span>
                              </div>
                            </div>
                            <div>
                              <label>Học vấn</label>
                              <Input placeholder="Nhập học vấn" />
                            </div>
                            <div>
                              <label>Thành tích</label>
                              <div className="flex items-center gap-2 mt-1">
                                <Input
                                  className="w-100%"
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
                              <label>Số điện thoại</label>
                              <Input placeholder="Nhập Số điện thoại" />
                            </div>

                            <div>
                              <label>Email</label>
                              <Input placeholder="Nhập Email" />
                            </div>
                            <DialogFooter>
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
                    key={doc.id} onClick={() => handleDelete(doc.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <div className="flex justify-center items-center gap-2 mt-4">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Trước
          </Button>

          {/* Nút ... lùi cụm */}
          {startPage > 1 && (
            <Button variant="outline" onClick={handlePrevGroup}>
              ...
            </Button>
          )}

          {/* Các trang trong nhóm hiện tại */}
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
            const page = startPage + i;
            return (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className={page === currentPage ? "font-bold" : ""}
              >
                {page}
              </Button>
            );
          })}

          {/* Nút ... tiến cụm */}
          {endPage < totalPages && (
            <Button variant="outline" onClick={handleNextGroup}>
              ...
            </Button>
          )}

          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Tiếp
          </Button>
        </div>

      </Card>
    </div>
  )
}

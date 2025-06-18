"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, FileText, Download, Calendar, Building } from "lucide-react"

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUnit, setSelectedUnit] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedOrgan, setSelectedOrgan] = useState("")

  const documents = [
    {
      title: "Chỉ thị số 01/CT-F375 về công tác chuẩn bị năm 2025",
      type: "Chỉ thị",
      unit: "Chỉ huy sư đoàn",
      organ: "Sư đoàn F375",
      date: "15/12/2024",
      downloads: 45,
      size: "2.3 MB",
    },
    {
      title: "Thông báo về việc tổ chức hội nghị tổng kết",
      type: "Thông báo",
      unit: "Phòng chính trị",
      organ: "Phòng chính trị F375",
      date: "12/12/2024",
      downloads: 32,
      size: "1.8 MB",
    },
    {
      title: "Kế hoạch huấn luyện quý I/2025",
      type: "Kế hoạch",
      unit: "Phòng tham mưu",
      organ: "Phòng tham mưu F375",
      date: "10/12/2024",
      downloads: 67,
      size: "4.1 MB",
    },
    {
      title: "Quy định về quản lý tài sản kỹ thuật",
      type: "Quy định",
      unit: "Phòng Hậu cần – kỹ thuật",
      organ: "Phòng HC-KT F375",
      date: "08/12/2024",
      downloads: 28,
      size: "3.2 MB",
    },
  ]

  const filteredDocuments = documents.filter((doc) => {
    return (
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedUnit === "" || doc.unit === selectedUnit) &&
      (selectedType === "" || doc.type === selectedType) &&
      (selectedOrgan === "" || doc.organ === selectedOrgan)
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Văn bản - Tài liệu</h1>
        <Badge variant="outline" className="text-sm">
          {filteredDocuments.length} tài liệu
        </Badge>
      </div>

      {/* Tìm kiếm nâng cao */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Tìm kiếm nâng cao
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Từ khóa</label>
              <Input
                placeholder="Nhập từ khóa tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Đơn vị đăng tải</label>
              <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn đơn vị" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="Chỉ huy sư đoàn">Chỉ huy sư đoàn</SelectItem>
                  <SelectItem value="Phòng chính trị">Phòng chính trị</SelectItem>
                  <SelectItem value="Phòng tham mưu">Phòng tham mưu</SelectItem>
                  <SelectItem value="Phòng Hậu cần – kỹ thuật">Phòng Hậu cần – kỹ thuật</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Loại văn bản</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="Chỉ thị">Chỉ thị</SelectItem>
                  <SelectItem value="Thông báo">Thông báo</SelectItem>
                  <SelectItem value="Kế hoạch">Kế hoạch</SelectItem>
                  <SelectItem value="Quy định">Quy định</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Cơ quan ban hành</label>
              <Select value={selectedOrgan} onValueChange={setSelectedOrgan}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn cơ quan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="Sư đoàn F375">Sư đoàn F375</SelectItem>
                  <SelectItem value="Phòng chính trị F375">Phòng chính trị F375</SelectItem>
                  <SelectItem value="Phòng tham mưu F375">Phòng tham mưu F375</SelectItem>
                  <SelectItem value="Phòng HC-KT F375">Phòng HC-KT F375</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Tìm kiếm
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedUnit("all")
                setSelectedType("all")
                setSelectedOrgan("all")
              }}
            >
              Xóa bộ lọc
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danh sách tài liệu */}
      <div className="space-y-4">
        {filteredDocuments.map((doc, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 cursor-pointer">
                      {doc.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      <span>{doc.unit}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{doc.date}</span>
                    </div>
                    <span>Dung lượng: {doc.size}</span>
                    <span>Lượt tải: {doc.downloads}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{doc.type}</Badge>
                    <Badge variant="outline">{doc.organ}</Badge>
                  </div>
                </div>

                <Button className="ml-4">
                  <Download className="h-4 w-4 mr-2" />
                  Tải xuống
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Không tìm thấy tài liệu nào phù hợp với tiêu chí tìm kiếm.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, FileText, Download, Calendar, Building } from "lucide-react"
import { documentService } from "@/services/documents.service"

export default function DocumentsPage() {
  const types = [{name:"Tất cả",value:"all"},{name:"Chỉ thị",value:"chi_thi"},{name:"Thông báo",value:"thong_bao"},{name:"Kế hoạch",value:"ke_hoach"},{name:"Quy định",value:"quy_dinh"}]
  const [categories,setCategories] = useState<any>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedOrgan, setSelectedOrgan] = useState("")

  const [documents,setDocuments] = useState<any>([
  ])

  const [filteredDocuments,setFilteredDocuments] = useState<any>([])
  

  const fetchData = async()=>{
    const res = await documentService.getDocuments()
    const res2 = await documentService.getCategories()
    if(res.statusCode === 200){
      setDocuments(res.data)
    }

    if(res2.statusCode === 200){
      setCategories(res2.data)
    }
  }

  useEffect(()=>{
    fetchData()
  },[])

  useEffect(()=>{
    setFilteredDocuments(
      documents.filter((doc:any) => {
    return (
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || doc.category?.nametag === selectedCategory || selectedCategory === "all") &&
      (selectedType === "" || doc.type === selectedType || selectedType === "all") &&
      (selectedOrgan === "" || doc.organ === selectedOrgan)
    )
  })
    )
  },[documents,searchTerm,selectedCategory,selectedType,selectedOrgan])

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
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn đơn vị" />
                </SelectTrigger>
                <SelectContent>
                  {
                    categories.map((category:any) => (
                      <SelectItem key={category.nametag} value={category.nametag}>
                        {category.name}
                      </SelectItem>
                    ))
                  }
                  {/* <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="chi_huy_su_doan">Chỉ huy sư đoàn</SelectItem>
                  <SelectItem value="phong_chinh_tri">Phòng chính trị</SelectItem>
                  <SelectItem value="phong_tham_muu">Phòng tham mưu</SelectItem>
                  <SelectItem value="hau_can_ky_thuat">Phòng Hậu cần – kỹ thuật</SelectItem> */}
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
                  {
                    types.map((type:any) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.name}
                      </SelectItem>
                    ))
                  }
                  {/* <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="chi_thi">Chỉ thị</SelectItem>
                  <SelectItem value="thong_bao">Thông báo</SelectItem>
                  <SelectItem value="ke_hoach">Kế hoạch</SelectItem>
                  <SelectItem value="quy_dinh">Quy định</SelectItem> */}
                </SelectContent>
              </Select>
            </div>

            {/* <div>
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
            </div> */}
          </div>

          {/* <div className="flex space-x-2">
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Tìm kiếm
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedType("all")
                setSelectedOrgan("all")
              }}
            >
              Xóa bộ lọc
            </Button>
          </div> */}
        </CardContent>
      </Card>

      {/* Danh sách tài liệu */}
      <div className="space-y-4">
        {filteredDocuments.map((doc:any, index:any) => (
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
                    <Badge variant="secondary">{
                    // doc.type
                    types.find((type:any)=>type.value === doc.type)?.name
                    }</Badge>
                    <Badge variant="outline">{doc.organ}</Badge>
                  </div>
                </div>
                
                <a href={doc?.link}>
                   <Button className="ml-4" >
                  <Download className="h-4 w-4 mr-2"/>
                  Tải xuống
                </Button>
                </a>
               
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

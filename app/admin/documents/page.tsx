"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Download, Calendar, User, FileText, Building, Eye } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { DialogHeader } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { documentService } from "@/services/documents.service"
import { downloadFile } from "@/lib/DownloadImage"
import { CustomFormData } from "@/lib/CustomFormData"

export default function AdminDocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [dataSave,setDataSave] = useState<any>({})
  const documentTypes = [
    { id: "all", name: "Tất cả loại" },
    { id: "chi_thi", name: "Chỉ thị" },
    { id: "thong_bao", name: "Thông báo" },
    { id: "ke_hoach", name: "Kế hoạch" },
    { id: "quy_dinh", name: "Quy định" }
  ]

  const [categories,setCategories] = useState([
    { id: "all", name: "Tất cả đơn vị" },
    { id: "command", name: "Chỉ huy sư đoàn" },
    { id: "political", name: "Phòng chính trị" },
    { id: "staff", name: "Phòng tham mưu" },
    { id: "logistics", name: "Phòng HC-KT" },
  ])

  const [documents,setDocuments] = useState<any>([
  ])

  const [filteredDocuments,setFilteredDocuments] = useState([]) 
  // documents.filter((doc) => {
  //   const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   const matchesType = selectedType === "all" || doc.type === selectedType
  //   const matchesUnit = selectedUnit === "all" || doc.unit === selectedUnit
  //   return matchesSearch && matchesType && matchesUnit
  // })

  const stats = [
    { label: "Tổng văn bản", value: "89", color: "text-blue-600" },
    { label: "Đã xuất bản", value: "76", color: "text-green-600" },
    { label: "Bản nháp", value: "8", color: "text-yellow-600" },
    { label: "Chờ duyệt", value: "5", color: "text-red-600" },
  ]
  const handleDelete = async(id:string) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xoá?");

    if (confirmDelete) {
      // 👉 Logic xoá ở đây — ví dụ API, xóa item, v.v.
      const res = await documentService.deleteDocument(id)
      fetchData()
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
      
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };
  const [open, setOpen] = useState(false);

  //  const handleSubmit = async (e: React.ChangeEvent<any>) => {
  //     // e.preventDefault();

  //     // Tạo đối tượng FormData để dễ dàng truyền file cùng các trường text
  //     const formData = new FormData();
  //     formData.append("title", title);
  //     formData.append("excerpt", excerpt);
  //     formData.append("region", selectedRegion ?? "");
  //     formData.append("category", selectedCategory ?? "");
  //     formData.append("categoryActivity", selectedActivity ?? "");
  //     formData.append("featured", isFeatured.toString()); // Nếu dùng checkbox
  //     if (selectedFile) {
  //       formData.append("coverImage", selectedFile);
  //     }

  //     try {
  //       // Gửi dữ liệu đến API backend
  //       const response = await apiClient.upload('/news', formData)

  //       if (!response) {
  //         throw new Error("Lỗi khi lưu dữ liệu.");
  //       }
  //       fetchDataNews()

  //       // Xử lý sau khi lưu thành công: reset form hoặc thông báo cho người dùng
  //       console.log("Đã lưu thành công!");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const fetchData= async()=>{
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
    setFilteredDocuments(documents.filter((doc:any)=>{
         const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase())
          const matchesType = selectedType === "all" || doc.type === selectedType
          const matchesCategory = selectedCategory === "all" || doc?.category?.nametag === selectedCategory
          return matchesSearch && matchesType && matchesCategory
    }))
  },[documents,searchTerm,selectedType,selectedCategory])

  const handleSubmit = async(e:any)=>{
    try{
      e.preventDefault();
      const formData = CustomFormData({...dataSave,coverDocument:selectedFile})
      const res = await documentService.createDocument(formData)
      if(res.statusCode === 201){
        fetchData()
        setDataSave({})
        setSelectedFile(null)
      }
    }catch{
      console.log("Lỗi khi lưu dữ liệu")
    }
  }

  const handleSubmitUp = async(e:any,id:string)=>{
    try{
      e.preventDefault();
      const formData = CustomFormData({...dataSave,coverDocument:selectedFile})
      const res = await documentService.updateDocument(id,formData)
      if(res.statusCode === 201){
        fetchData()
        setDataSave({})
        setSelectedFile(null)
      }
    }catch{
      console.log("Lỗi khi lưu dữ liệu")
    }
  }

  const handleFocusData = async(data:any)=>{
    setDataSave(data)
  }
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
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label>Tiêu đề *</label>
                  <Input placeholder="Nhập tiêu đề văn bản"
                  value={dataSave?.title || ""}
                    onChange={(e) => setDataSave((preValue:any)=>{
                      return {...preValue,title:e.target.value}
                    })} 
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label>Loại văn bản *</label>
                    <Select onValueChange={(value)=>{
                      setDataSave((preValue:any)=>{
                        return {...preValue,type:value}
                      })
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại văn bản" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chi_thi">Chỉ thị</SelectItem>
                        <SelectItem value="thong_bao">Thông báo</SelectItem>
                        <SelectItem value="ke_hoach">Kế hoạch</SelectItem>
                        <SelectItem value="quy_dinh">Quy định</SelectItem>
                        {/* <SelectItem value="bao_cao">Báo cáo</SelectItem> */}

                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <label>Đơn vị đăng tải *</label>
                    <Select 
                    onValueChange={(value:any)=>{
                      setDataSave((preValue:any)=>{
                        return {...preValue,category:value}
                      })
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại văn bản" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          categories.map((category) => {
                            return (
                              <SelectItem value={category.id}>{category.name}</SelectItem>
                            )
                          })
                        }
                        {/* <SelectItem value="chi-huy-sd">Chỉ huy Sư đoàn</SelectItem>
                        <SelectItem value="phong-chinh-tri">Phòng chính trị</SelectItem>
                        <SelectItem value="phong-tham-muu">Phòng tham mưu</SelectItem>
                        <SelectItem value="phong-hc-kt">Phòng HC-KT</SelectItem> */}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label>Người đăng tải(kèm cấp bậc) *</label>
                  <Input placeholder="Nhập người đăng tải"
                   value={dataSave?.organ || ""}
                    onChange={(e) => setDataSave((preValue:any)=>{
                      return {...preValue,organ:e.target.value}
                    })} 
                  />
                </div>
<div>
                  <label>Ngày đăng tải</label>
                  <Input placeholder="Nhập ngày đăng"
                   value={dataSave?.date || ""}
                    onChange={(e) => setDataSave((preValue:any)=>{
                      return {...preValue,date:e.target.value}
                    })} 
                  />
                </div>
                <div>
                  <label>Kích thước</label>
                  <Input placeholder="Nhập kích thước"
                   value={dataSave?.size || ""}
                    onChange={(e) => setDataSave((preValue:any)=>{
                      return {...preValue,size:e.target.value}
                    })} 
                  />
                </div>
                <div>
                  <label htmlFor="">Tải file </label>

                  <div className="space-y-2">
                    <Input
                      id="imageFile"
                      type="file"
                      className="cursor-pointer"
                      onChange={handleFileChange}
                    />

                    {/* {selectedFile && (
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
                      )} */}
                  </div>
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
              </form>




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
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn đơn vị" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category:any) => (
                    <SelectItem key={category?.nametag} value={category.nametag}>
                      {category.name}
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
          <CardTitle>Danh sách văn bản ({filteredDocuments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((doc:any) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">{doc.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <Badge variant="outline">{documentTypes.find((type:any) => type?.id === doc.type)?.name}</Badge>
                  
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        {doc?.category?.name}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {doc.organ}
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
                  <Button variant="outline" size="sm" onClick={()=>{downloadFile(doc?.link)}}>
                    <Download className="h-4 w-4" />
                  </Button>

                  <Dialog >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={()=>{handleFocusData({...doc,category:doc?.category?.id})}}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Cập nhật văn bản </DialogTitle>
                      </DialogHeader>
                       <form className="space-y-4" onSubmit={(e)=>{handleSubmitUp(e,doc?.id)}}>
                <div>
                  <label>Tiêu đề *</label>
                  <Input placeholder="Nhập tiêu đề văn bản"
                  value={dataSave?.title || ""}
                    onChange={(e) => setDataSave((preValue:any)=>{
                      return {...preValue,title:e.target.value}
                    })} 
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label>Loại văn bản *</label>
                    <Select onValueChange={(value)=>{
                      setDataSave((preValue:any)=>{
                        return {...preValue,type:value}
                      })
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại văn bản" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chi_thi">Chỉ thị</SelectItem>
                        <SelectItem value="thong_bao">Thông báo</SelectItem>
                        <SelectItem value="ke_hoach">Kế hoạch</SelectItem>
                        <SelectItem value="quy_dinh">Quy định</SelectItem>
                        {/* <SelectItem value="bao_cao">Báo cáo</SelectItem> */}

                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <label>Đơn vị đăng tải *</label>
                    <Select 
                    onValueChange={(value:any)=>{
                      setDataSave((preValue:any)=>{
                        return {...preValue,category:value}
                      })
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại văn bản" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          categories.map((category) => {
                            return (
                              <SelectItem value={category.id}>{category.name}</SelectItem>
                            )
                          })
                        }
                        {/* <SelectItem value="chi-huy-sd">Chỉ huy Sư đoàn</SelectItem>
                        <SelectItem value="phong-chinh-tri">Phòng chính trị</SelectItem>
                        <SelectItem value="phong-tham-muu">Phòng tham mưu</SelectItem>
                        <SelectItem value="phong-hc-kt">Phòng HC-KT</SelectItem> */}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label>Người đăng tải(kèm cấp bậc) *</label>
                  <Input placeholder="Nhập người đăng tải"
                   value={dataSave?.organ || ""}
                    onChange={(e) => setDataSave((preValue:any)=>{
                      return {...preValue,organ:e.target.value}
                    })} 
                  />
                </div>
<div>
                  <label>Ngày đăng tải</label>
                  <Input placeholder="Nhập ngày đăng"
                   value={dataSave?.date || ""}
                    onChange={(e) => setDataSave((preValue:any)=>{
                      return {...preValue,date:e.target.value}
                    })} 
                  />
                </div>
                <div>
                  <label>Kích thước</label>
                  <Input placeholder="Nhập kích thước"
                   value={dataSave?.size || ""}
                    onChange={(e) => setDataSave((preValue:any)=>{
                      return {...preValue,size:e.target.value}
                    })} 
                  />
                </div>
                <div>
                  <label htmlFor="">Tải file </label>

                  <div className="space-y-2">
                    <Input
                      id="imageFile"
                      type="file"
                      className="cursor-pointer"
                      onChange={handleFileChange}
                    />

                    {/* {selectedFile && (
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
                      )} */}
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>

                    <Button type="button"  >
                      Hủy
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>

                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Chỉnh sửa
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
                    </DialogContent>

                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={()=>{handleDelete(doc?.id)}}
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

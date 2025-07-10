"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Calendar, Star, Search, Monitor, Smartphone, Globe, Shield, FileText, Database } from "lucide-react"
import { softwareService } from "@/services/software.service"

export default function SoftwarePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPlatform, setSelectedPlatform] = useState("all")

  const categories = [
    { id: "all", name: "Tất cả", count: 12, icon: Monitor },
    { id: "quan_ly", name: "Quản lý", count: 5, icon: FileText },
    { id: "bao_mat", name: "Bảo mật", count: 3, icon: Shield },
    { id: "tien_ich", name: "Tiện ích", count: 2, icon: Globe },
    { id: "co_so_du_lieu", name: "Cơ sở dữ liệu", count: 2, icon: Database },
  ]

  const platforms = [
    { id: "all", name: "Tất cả nền tảng" },
    { id: "windows", name: "Windows" },
    { id: "android", name: "Android" },
    { id: "ios", name: "IOS" },
    { id: "web", name: "Web app" },
    { id: "cross", name: "Đa nền tảng" },
  ]

  const [software,setSoftware] = useState<any>([

    {
      id: 1,
      name: "Phần mềm quản lý văn bản v2.1",
      description: "Hệ thống quản lý văn bản điện tử cho các đơn vị, hỗ trợ quy trình số hóa tài liệu",
      version: "2.1.0",
      size: "45.2 MB",
      date: "15/12/2024",
      downloads: 234,
      rating: 4.8,
      category: "management",
      categoryName: "Quản lý",
      platform: "windows",
      platformName: "Windows",
      featured: true,
      requirements: "Windows 10/11, 4GB RAM, 100MB ổ cứng",
      developer: "Trạm CNTT F375",
      license: "Miễn phí",
    },
    
  ])
  const [filteredSoftware,setFilteredSoftware] = useState<any>([])




  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Tính vị trí dữ liệu
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currenData = filteredSoftware.slice(indexOfFirstItem, indexOfLastItem);

  // Tổng số trang
  const totalPages = Math.ceil(filteredSoftware.length / itemsPerPage);

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
 
  


  

  // software.filter((item) => {
  //   const matchesSearch =
  //     item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.description.toLowerCase().includes(searchTerm.toLowerCase())
  //   const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
  //   const matchesPlatform = selectedPlatform === "all" || item.platform === selectedPlatform

  //   return matchesSearch && matchesCategory && matchesPlatform
  // })

  const [featuredSoftware,setFeaturedSoftware] = useState<any>([])
  // filteredSoftware.filter((item) => item.featured)
  const [regularSoftware,setRegularSoftware] = useState<any>([])
  // filteredSoftware.filter((item) => !item.featured)

  const stats = [
    { label: "Tổng phần mềm", value: "12", icon: Monitor, color: "text-blue-600" },
    { label: "Lượt tải xuống", value: "1,234", icon: Download, color: "text-green-600" },
    { label: "Đánh giá trung bình", value: "4.6★", icon: Star, color: "text-yellow-600" },
    { label: "Cập nhật tháng này", value: "5", icon: Calendar, color: "text-purple-600" },
  ]



   useEffect(()=>{
    setFeaturedSoftware(filteredSoftware.filter((item:any) => item.featured))
    setRegularSoftware(filteredSoftware.filter((item:any) => !item.featured))
  },[filteredSoftware])

  useEffect(()=>{
    setFilteredSoftware(
      software.filter((item:any) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item?.category?.nametag === selectedCategory
    const matchesPlatform = selectedPlatform === "all" || item?.platform?.nametag === selectedPlatform

    return matchesSearch && matchesCategory && matchesPlatform
  })
    )
  },[software,searchTerm,selectedCategory,selectedPlatform])
useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await softwareService.getSoftwares() as any
    if(res.statusCode === 200) {
      setSoftware(res.data)
    }
  }
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Thư viện Phần mềm</h1>
        <p className="text-lg text-gray-600">
          Kho phần mềm và ứng dụng phục vụ công tác quản lý và hoạt động của Sư đoàn
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${stat.color.replace("text-", "bg-").replace("-600", "-100")}`}
              >
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Tìm kiếm và lọc
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Tìm kiếm</label>
              <Input
                placeholder="Tên phần mềm hoặc mô tả..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Danh mục</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name} ({
                category.id === "all" ? software.length : software.filter((i:any)=>i?.category?.nametag === category.id).length
              })
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Nền tảng</label>
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn nền tảng" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <SelectItem key={platform.id} value={platform.id}>
                      {platform.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center space-x-2"
          >
            <category.icon className="h-4 w-4" />
            <span>{category.name}</span>
            <Badge variant="secondary" className="ml-2">
               {
                category.id === "all" ? software.length : software.filter((i:any)=>i?.category?.nametag === category.id).length
              }
            </Badge>
          </Button>
        ))}
      </div>

      {/* Featured Software */}
      {featuredSoftware?.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">Phần mềm nổi bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredSoftware.map((item:any) => (
              <Card key={item.id} className="hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Monitor className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg line-clamp-1">{item.name}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant="destructive">{item?.category?.name}</Badge>
                          <Badge variant="outline">{item?.platform?.name}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                    <div>
                      <span className="font-medium">Phiên bản:</span>
                      <span className="ml-1">{item.version}</span>
                    </div>
                    <div>
                      <span className="font-medium">Dung lượng:</span>
                      <span className="ml-1">{item.size}</span>
                    </div>
                    <div>
                      <span className="font-medium">Cập nhật:</span>
                      <span className="ml-1">{item.date}</span>
                    </div>
                    <div>
                      <span className="font-medium">Lượt tải:</span>
                      <span className="ml-1">{item.downloads}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <div className="font-medium text-gray-700">{item.developer}</div>
                      <div className="text-gray-500">{item.license}</div>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700">
                      <Download className="h-4 w-4 mr-2" />
                      Tải xuống
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Regular Software */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">Tất cả phần mềm</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(selectedCategory === "all"?regularSoftware:filteredSoftware).map((item:any) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Monitor className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg line-clamp-2 mb-2">{item.name}</h3>
                  <div className="flex justify-center space-x-2">
                    <Badge variant="outline">{item?.category?.name}</Badge>
                    <Badge variant="secondary">{item?.platform?.name}</Badge>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.description}</p>

                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex justify-between">
                    <span>Phiên bản:</span>
                    <span className="font-medium">{item.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dung lượng:</span>
                    <span className="font-medium">{item.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lượt tải:</span>
                    <span className="font-medium">{item.downloads}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Đánh giá:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="font-medium">{item.rating}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Tải xuống
                </Button>
              </CardContent>
              
            </Card>
          ))}
        </div>
      </section>
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

      {/* No Results */}
      {filteredSoftware.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Monitor className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Không tìm thấy phần mềm nào phù hợp với tiêu chí tìm kiếm.</p>
          </CardContent>
        </Card>
      )}

      {/* Development Info */}
      <Card className="bg-gradient-to-r from-green-50 to-green-100 mt-12">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center mb-6">Phát triển phần mềm</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Monitor className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Ứng dụng Desktop</h4>
              <p className="text-sm text-gray-600">Phần mềm quản lý và tiện ích cho Windows</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Ứng dụng Mobile</h4>
              <p className="text-sm text-gray-600">App Android cho tra cứu và tiện ích</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Web Application</h4>
              <p className="text-sm text-gray-600">Hệ thống web cho quản lý và báo cáo</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

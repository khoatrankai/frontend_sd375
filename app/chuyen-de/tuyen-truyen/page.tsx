"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Megaphone, Clock, Eye, User, ChevronRight, Users, BookOpen, Radio } from "lucide-react"
import { articlesService } from "@/services/articles.service"
import { useRouter } from "next/navigation"

export default function PropagandaPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")

  const filters = [
    { id: "all", name: "Tất cả", count: 10 },
    { id: "education", name: "Giáo dục chính trị", count: 4 },
    { id: "media", name: "Truyền thông", count: 3 },
    { id: "culture", name: "Văn hóa", count: 3 },
  ]

   const [articles,setArticles] = useState<any>([
  ])
  const router = useRouter()
  const [filteredArticles,setFilteredArticales] = useState<any>([])
    // selectedFilter === "all" ? articles : articles.filter((article) => article.category === selectedFilter)

  const [featuredArticles,setFeaturedArticles] = useState<any>([])
  // filteredArticles.filter((article) => article.featured)
  const [regularArticles,setRegularArticles] = useState<any>([]) 
  // filteredArticles.filter((article) => !article.featured)

  const stats = [
    { label: "Bài viết", value: articles.length, icon: BookOpen, color: "text-blue-600" },
    { label: "Lượt xem", value: articles.reduce((pre:any,curr:any)=>{
    return pre + curr?.views
  },0), icon: Eye, color: "text-green-600" },
    { label: "Chuyên gia", value: "6+", icon: Users, color: "text-purple-600" },
    { label: "Chủ đề", value: "4", icon: Megaphone, color: "text-orange-600" },
  ]

  const fetchData = async()=>{
          const res = await articlesService.getArticles({type:'ttpl'})
          if(res.statusCode === 200){
            setArticles(res.data)
          }
        }

        //phân trang
            const [currentPage, setCurrentPage] = useState(1);
            const itemsPerPage = 3;
          
            // Tính vị trí dữ liệu
            const indexOfLastItem = currentPage * itemsPerPage;
            const indexOfFirstItem = indexOfLastItem - itemsPerPage;
            const currentData = (selectedFilter === "all" ?regularArticles:filteredArticles).slice(indexOfFirstItem, indexOfLastItem);
          
            // Tổng số trang
            const totalPages = Math.ceil((selectedFilter === "all" ?regularArticles:filteredArticles).length / itemsPerPage);
          
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
      
        useEffect(()=>{
          fetchData()
        },[])
      
        useEffect(()=>{
          setFilteredArticales( selectedFilter === "all" ? articles : articles.filter((article:any) => article?.category?.nametag === selectedFilter))
        },[articles,selectedFilter])
      
        useEffect(()=>{
          setFeaturedArticles( filteredArticles.filter((article:any) => article?.featured))
          setRegularArticles( filteredArticles.filter((article:any) => !article?.featured))
        },[filteredArticles])
  

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Thông tin tuyên truyền</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Chuyên đề về công tác thông tin tuyên truyền, giáo dục chính trị và xây dựng văn hóa trong quân đội
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

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={selectedFilter === filter.id ? "default" : "outline"}
            onClick={() => setSelectedFilter(filter.id)}
            className="flex items-center space-x-2"
          >
            <Megaphone className="h-4 w-4" />
            <span>{filter.name}</span>
            <Badge variant="secondary" className="ml-2">
              {
                filter.id === "all" ? articles.length : articles.filter((i:any)=>i?.category?.nametag === filter.id).length
              }
            </Badge>
          </Button>
        ))}
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">Bài viết nổi bật</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredArticles.map((article:any) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={()=>{
                router.push(`/chuyen-de/${article.id}`)
              }}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge className="bg-red-600">{article?.category?.name}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-red-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3" dangerouslySetInnerHTML={{__html:article?.excerpt}}/>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag:any, index:number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {article.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.date}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {article.views}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Regular Articles */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">
          {selectedFilter === "all" ? "Tất cả bài viết" : filters.find((f) => f.id === selectedFilter)?.name}
        </h2>
        <div className="space-y-6">
          {currentData.map((article:any) => (
            <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={()=>{
                router.push(`/chuyen-de/${article.id}`)
              }}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline">{article?.category?.name}</Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-red-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2" dangerouslySetInnerHTML={{__html:article?.excerpt}}/>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag:any, index:number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {article.author}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {article.views}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Đọc thêm
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
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
      {/* Propaganda Methods Showcase */}
      <Card className="bg-gradient-to-r from-green-50 to-green-100 mt-12">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center mb-6">Phương pháp tuyên truyền hiện đại</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Radio className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Truyền thông số</h4>
              <p className="text-sm text-gray-600">Ứng dụng mạng xã hội và nền tảng số</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Giáo dục trực tiếp</h4>
              <p className="text-sm text-gray-600">Tổ chức các buổi học tập, tọa đàm</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Tài liệu học tập</h4>
              <p className="text-sm text-gray-600">Biên soạn và phát hành tài liệu</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

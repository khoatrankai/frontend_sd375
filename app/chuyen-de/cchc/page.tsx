"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Settings, Clock, Eye, User, ChevronRight, TrendingUp, FileText, Zap } from "lucide-react"
import { articlesService } from "@/services/articles.service"

export default function CCHCPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")

  const filters = [
    { id: "all", name: "Tất cả", count: 12 },
    { id: "chuyen_doi_so", name: "Chuyển đổi số", count: 5 },
    { id: "cai_cach_hanh_chinh", name: "Cải cách hành chính", count: 4 },
    { id: "chinh_phu_dien_ty", name: "Chính phủ điện tử", count: 3 },
  ]

  const [articles,setArticles] = useState<any>([
  ])

  const [filteredArticles,setFilteredArticales] = useState<any>([])
    // selectedFilter === "all" ? articles : articles.filter((article) => article.category === selectedFilter)

  const [featuredArticles,setFeaturedArticles] = useState<any>([])
  // filteredArticles.filter((article) => article.featured)
  const [regularArticles,setRegularArticles] = useState<any>([]) 
  // filteredArticles.filter((article) => !article.featured)

  const stats = [
    { label: "Bài viết", value: "12", icon: FileText, color: "text-blue-600" },
    { label: "Lượt xem", value: "8,547", icon: Eye, color: "text-green-600" },
    { label: "Tác giả", value: "8", icon: User, color: "text-purple-600" },
    { label: "Cập nhật", value: "Hàng tuần", icon: TrendingUp, color: "text-orange-600" },
  ]

  const fetchData = async()=>{
    const res = await articlesService.getArticles({type:'cchc'})
    if(res.statusCode === 200){
      setArticles(res.data)
    }
  }

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
        <h1 className="text-4xl font-bold text-gray-800 mb-4">CCHC & Chuyển đổi số</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Chuyên đề về cải cách hành chính và chuyển đổi số trong lĩnh vực quốc phòng
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
            <Settings className="h-4 w-4" />
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
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
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
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
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
          {(selectedFilter === "all" ?regularArticles:filteredArticles).map((article:any) => (
            <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
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
                    <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag:any, index:any) => (
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

      {/* Digital Transformation Showcase */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 mt-12">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center mb-6">Chuyển đổi số trong quân đội</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Tự động hóa quy trình</h4>
              <p className="text-sm text-gray-600">Số hóa và tự động hóa các quy trình hành chính</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Nâng cao hiệu quả</h4>
              <p className="text-sm text-gray-600">Giảm thời gian xử lý và chi phí vận hành</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Cải thiện dịch vụ</h4>
              <p className="text-sm text-gray-600">Nâng cao chất lượng phục vụ người dân</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

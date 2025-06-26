"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Microscope, Clock, Eye, User, ChevronRight, Zap, Target, Shield } from "lucide-react"
import { articlesService } from "@/services/articles.service"

export default function MilitarySciencePage() {
  const [selectedFilter, setSelectedFilter] = useState("all")

  const filters = [
    { id: "all", name: "Tất cả", count: 9 },
    { id: "technology", name: "Công nghệ quân sự", count: 4 },
    { id: "strategy", name: "Chiến lược", count: 3 },
    { id: "research", name: "Nghiên cứu", count: 2 },
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
    { label: "Nghiên cứu", value: "9", icon: Microscope, color: "text-blue-600" },
    { label: "Lượt xem", value: "4,267", icon: Eye, color: "text-green-600" },
    { label: "Nhà khoa học", value: "7", icon: User, color: "text-purple-600" },
    { label: "Dự án", value: "5", icon: Target, color: "text-orange-600" },
  ]

   const fetchData = async()=>{
      const res = await articlesService.getArticles({type:'khqs'})
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
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Thông tin KHQS</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Chuyên đề về khoa học quân sự, công nghệ quân sự và các nghiên cứu ứng dụng trong lĩnh vực quốc phòng
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
            <Microscope className="h-4 w-4" />
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">Nghiên cứu nổi bật</h2>
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
          {selectedFilter === "all" ? "Tất cả nghiên cứu" : filters.find((f) => f.id === selectedFilter)?.name}
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

      {/* Research Areas Showcase */}
      <Card className="bg-gradient-to-r from-cyan-50 to-cyan-100 mt-12">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center mb-6">Lĩnh vực nghiên cứu</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Công nghệ AI</h4>
              <p className="text-sm text-gray-600">Ứng dụng trí tuệ nhân tạo trong quân sự</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Hệ thống vũ khí</h4>
              <p className="text-sm text-gray-600">Nghiên cứu và phát triển vũ khí hiện đại</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">An ninh mạng</h4>
              <p className="text-sm text-gray-600">Bảo mật thông tin và tác chiến mạng</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

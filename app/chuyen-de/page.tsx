"use client"

import { use, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Settings, Megaphone, Scale, Microscope, Clock, User, Eye, ChevronRight, FileText } from "lucide-react"
import { articlesService } from "@/services/articles.service"
import { useRouter } from "next/navigation"

export default function SpecialarticlesPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const [categories,setCategories] = useState([
    {
      id: "all",
      name: "Tất cả",
      icon: FileText,
      count: 28,
      description: "Tất cả chuyên đề",
    },
    {
      id: "cchc",
      name: "CCHC & Chuyển đổi số",
      icon: Settings,
      count: 8,
      description: "Cải cách hành chính và chuyển đổi số",
    },
    {
      id: "tttt",
      name: "Thông tin tuyên truyền",
      icon: Megaphone,
      count: 7,
      description: "Công tác thông tin tuyên truyền",
    },
    {
      id: "ttpl",
      name: "Thông tin Pháp luật",
      icon: Scale,
      count: 6,
      description: "Thông tin pháp luật và quy định",
    },
    {
      id: "khqs",
      name: "Thông tin KHQS",
      icon: Microscope,
      count: 7,
      description: "Khoa học quân sự",
    },
  ])

  


  const [articles, setArticles] = useState<any>([
  ])
  const router = useRouter()
  const [filteredArticles,setFilteredArticales] = useState<any>([])
  // activeCategory === "all" ? articles : articles.filter((topic) => topic.category === activeCategory)

  const [featuredArticles,setFeaturedArticles] = useState<any>([]) 
  // filteredarticles.filter((topic) => topic.featured)
  const [regularArticles,setRegularArticles] = useState<any>([]) 
  // filteredarticles.filter((topic) => !topic.featured)

  const fetchData = async()=>{
    const res = await articlesService.getArticles()
    console.log(res)
    if(res.statusCode === 200){
      console.log(res.data)
      setArticles(res.data)
      
    }
  }

    //phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
  
    // Tính vị trí dữ liệu
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = (activeCategory === "all"? regularArticles:filteredArticles).slice(indexOfFirstItem, indexOfLastItem);
  
    // Tổng số trang
    const totalPages = Math.ceil((activeCategory === "all"?regularArticles:filteredArticles).length / itemsPerPage);
  
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


  useEffect(()=> {
    fetchData()
  },[])

   useEffect(()=> {
    setFilteredArticales(activeCategory === "all" ? articles : articles.filter((topic:any) => topic?.type === activeCategory))
  },[articles,activeCategory])

  useEffect(()=> {
    setFeaturedArticles(filteredArticles.filter((topic:any) => topic.featured))
    setRegularArticles(filteredArticles.filter((topic:any) => !topic.featured))
  },[filteredArticles])
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Chuyên đề</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Các chuyên đề chuyên sâu về cải cách hành chính, chuyển đổi số, tuyên truyền, pháp luật và khoa học quân sự
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {categories.slice(1).map((category) => (
          <Card
            key={category.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              activeCategory === category.id ? "ring-2 ring-red-500 bg-red-50" : ""
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            <CardContent className="p-6 text-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  activeCategory === category.id ? "bg-red-600 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                <category.icon className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{category.description}</p>
              <Badge variant={activeCategory === category.id ? "default" : "secondary"}>
                {
                category.id === "all" ? articles.length : articles.filter((i:any)=>i.type === category.id).length
              } bài viết
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            onClick={() => setActiveCategory(category.id)}
            className="flex items-center space-x-2"
          >
            <category.icon className="h-4 w-4" />
            <span>{category.name}</span>
            <Badge variant="secondary" className="ml-2">
              {
                category.id === "all" ? articles.length : articles.filter((i:any)=>i.type === category.id).length
              }
            </Badge>
          </Button>
        ))}
      </div>

      {/* Featured articles */}
      {featuredArticles.length > 0 && activeCategory === "all" && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">Chuyên đề nổi bật</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredArticles.map((topic:any) => (
              <Card key={topic.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={()=>{
                router.push(`/chuyen-de/${topic.id}`)
              }}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge className="bg-red-600">{categories.find((c:any)=>c.id === topic.type)?.name}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {topic.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-red-600 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3" dangerouslySetInnerHTML={{__html:topic?.excerpt}}/>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {topic.tags.map((tag:any, index:number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {topic.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {topic.date}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {topic.views}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Regular articles */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">
          {activeCategory === "all" ? "Tất cả chuyên đề" : categories.find((c) => c.id === activeCategory)?.name}
        </h2>
        <div className="space-y-6">
          {currentData.map((topic:any) => (
            <Card key={topic.id} className="hover:shadow-md transition-shadow cursor-pointer"  onClick={()=>{
                router.push(`/chuyen-de/${topic.id}`)
              }}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline">{categories.find((c:any)=>c.id === topic.type)?.name}</Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {topic.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-red-600 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2" dangerouslySetInnerHTML={{__html:topic?.excerpt}}/>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {topic?.tags.map((tag:any, index:number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {topic.author}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {topic.views}
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

      {/* Load More */}
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
    </div>
  )
}

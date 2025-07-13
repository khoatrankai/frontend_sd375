"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Eye, User, ChevronRight, Shield, Target, Zap } from "lucide-react"
import { newsService } from "@/services/news.service"
import { useRouter } from "next/navigation"
import TimeAgo from "@/components/time-ago"
import { removeImagesFromHTML } from "@/lib/removeImgHTML"

export default function MilitaryNewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const router = useRouter()
  const [categories,setCategories] = useState<any>([
  ])

  const [news, setNews] = useState<any>([
  ])

  const [filteredNews, setFilteredNews] = useState([])
  // activeCategory === "all" ? news : news.filter((item) => item.category === activeCategory)

  const [featuredNews, setFeaturedNews] = useState([])
  // news.filter((item) => item.featured)
  const [regularNews, setRegularNews] = useState([])
  // filteredNews.filter((item) => !item.featured)
  const fetchData = async () => {
    const res = await newsService.getPosts({ type: "quan_su" }) as any
    const res2 = await newsService.getCategoriesNew() as any
    if (res.statusCode === 200) {
      setNews(res.data)
    }

    if (res2.statusCode === 200) {
      setCategories(res2.data)
    }
  }

  useEffect(() => {
    setRegularNews(filteredNews.filter((item: any) => !item.featured))
  }, [filteredNews])

  useEffect(() => {
    setFilteredNews((selectedCategory === "all" ? news : news.filter((item: any) => item.category.nametag === selectedCategory)) as any)
  }, [news, selectedCategory])

  useEffect(() => {
    setFeaturedNews(news.filter((i: any) => i.featured) as any)
  }, [news])
  useEffect(() => {
    fetchData()
  }, [])
  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Tính vị trí dữ liệu
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = (selectedCategory === "all" ?regularNews:filteredNews).slice(indexOfFirstItem, indexOfLastItem);

  // Tổng số trang
  const totalPages = Math.ceil((selectedCategory === "all" ?regularNews:filteredNews).length / itemsPerPage);

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

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Tin tức quân sự</h1>
        <p className="text-lg text-gray-600">
          Thông tin chuyên sâu về vũ khí, trang bị, chiến thuật và công nghệ quân sự
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category: any) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => 
            {

              setSelectedCategory(category.nametag)
              setCurrentPage(1)
            }
            }
            className="flex items-center space-x-2"
          >
            <Target className="h-4 w-4" />
            <span>{category.name}</span>
            <Badge variant="secondary" className="ml-2">
              {
                category.nametag === "all" ? news.length : news.filter((i:any)=>i?.category?.nametag === category.nametag).length
              }
            </Badge>
          </Button>
        ))}
      </div>

      {/* Featured News */}
      {selectedCategory === "all" && featuredNews.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">Tin nổi bật</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredNews.map((item:any) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={()=>{
                router.push(`/tin-tuc/${item?.id}`)
              }}>
                <div className="relative">
                  <img src={item.image || "/public/placeholder.svg"} alt={item.title} className="w-full h-64 object-cover" />
                  <Badge className="absolute top-4 left-4 bg-red-600">{item?.category?.name}</Badge>
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    {item.views}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3" dangerouslySetInnerHTML={{__html:removeImagesFromHTML(item.excerpt)}}/>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {item.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {<TimeAgo date={item.created_at} />}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Regular News */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">
          {selectedCategory === "all" ? "Tin tức khác" : categories.find((c: any) => c.nametag === selectedCategory)?.name}
        </h2>
        <div className="space-y-6">
          {currentData.map((item:any) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={()=>{
                router.push(`/tin-tuc/${item?.id}`)
              }}>
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={item.image || "/public/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline">{item?.category?.name}</Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {<TimeAgo date={item.created_at} />}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-red-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2" dangerouslySetInnerHTML={{__html:item.excerpt}}/>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {item.author}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {item.views}
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
      {/* Military Technology Showcase */}
      <Card className="bg-gradient-to-r from-green-50 to-green-100 mt-12">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center mb-6">Công nghệ quân sự hiện đại</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Hệ thống tên lửa</h4>
              <p className="text-sm text-gray-600">Công nghệ tên lửa phòng không tiên tiến</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Radar cảnh báo</h4>
              <p className="text-sm text-gray-600">Hệ thống radar thế hệ mới</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Chỉ huy tự động</h4>
              <p className="text-sm text-gray-600">Hệ thống C4ISR hiện đại</p>
            </div>
          </div>
        </CardContent>
      </Card>

   
    </div>
  )
}

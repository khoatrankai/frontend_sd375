"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Eye, User, ChevronRight } from "lucide-react"
import { newsService } from "@/services/news.service"

export default function DomesticNewsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [news,setNews] = useState([
  ])

  useEffect(()=>{
    fetchData()
  },[])

  const fetchData = async()=>{
    const res = await newsService.getPosts({type:"trong_nuoc",page:currentPage,limit:10})
    if(res.statusCode === 200){
      setNews(res.data)
      setCurrentPage(currentPage+1)
    }else{
      console.log(res)
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Tin tức trong nước</h1>
        <p className="text-lg text-gray-600">
          Cập nhật những thông tin mới nhất về tình hình chính trị, kinh tế, xã hội trong nước
        </p>
      </div>

      {/* News List */}
      <div className="space-y-6">
        {news.map((item:any) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
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
                    <Badge variant="outline">{item.category.name}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {item.time}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{item.excerpt}</p>
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

      {/* Pagination */}
      <div className="flex justify-center space-x-2">
        <Button variant="outline" disabled={currentPage === 1}>
          Trang trước
        </Button>
        <Button variant="outline">1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
        <Button variant="outline">Trang sau</Button>
      </div>
    </div>
  )
}

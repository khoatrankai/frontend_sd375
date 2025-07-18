"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Eye, User, ChevronRight, Globe } from "lucide-react"
import { newsService } from "@/services/news.service"
import { useRouter } from "next/navigation"
import TimeAgo from "@/components/time-ago"
import { removeImagesFromHTML } from "@/lib/removeImgHTML"

export default function InternationalNewsPage() {
  // const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()
  const [news, setNews] = useState([
    {
      id: 1,
      title: "NATO tăng cường hợp tác quốc phòng với các đối tác châu Á-Thái Bình Dương",
      excerpt:
        "Liên minh NATO công bố kế hoạch mở rộng hợp tác với các quốc gia trong khu vực châu Á-Thái Bình Dương...",
      image: "/public/placeholder.svg?height=200&width=300",
      author: "Reuters",
      date: "20/12/2024",
      time: "3 giờ trước",
      views: 1890,
      category: "Quốc phòng",
      region: "Châu Âu",
    },
    {
      id: 2,
      title: "Trung Quốc thử nghiệm thành công hệ thống phòng thủ tên lửa mới",
      excerpt: "Quân đội Trung Quốc thông báo đã thử nghiệm thành công hệ thống phòng thủ tên lửa thế hệ mới...",
      image: "/public/placeholder.svg?height=200&width=300",
      author: "Xinhua",
      date: "19/12/2024",
      time: "1 ngày trước",
      views: 2340,
      category: "Công nghệ quân sự",
      region: "Châu Á",
    },
    {
      id: 3,
      title: "Mỹ và Nhật Bản tăng cường hợp tác an ninh biển",
      excerpt: "Hai nước cam kết tăng cường tuần tra chung và chia sẻ thông tin tình báo trong khu vực...",
      image: "/public/placeholder.svg?height=200&width=300",
      author: "AP",
      date: "18/12/2024",
      time: "2 ngày trước",
      views: 1567,
      category: "An ninh biển",
      region: "Châu Á",
    },
    {
      id: 4,
      title: "Nga triển khai hệ thống radar cảnh báo sớm tại Bắc Cực",
      excerpt: "Bộ Quốc phòng Nga thông báo triển khai hệ thống radar hiện đại tại khu vực Bắc Cực...",
      image: "/public/placeholder.svg?height=200&width=300",
      author: "TASS",
      date: "17/12/2024",
      time: "3 ngày trước",
      views: 1234,
      category: "Quốc phòng",
      region: "Châu Âu",
    },
  ])

  const regions = [
    { id: "all", name: "Tất cả", count: 45 },
    { id: "chau_a", name: "Châu Á", count: 18 },
    { id: "chau_au", name: "Châu Âu", count: 12 },
    { id: "chau_my", name: "Châu Mỹ", count: 8 },
    { id: "chau_phi", name: "Châu Phi", count: 4 },
    { id: "chau_dai_duong", name: "Châu Đại Dương", count: 3 },
  ]


  const [filteredNews, setFilteredNews] = useState<any>([])

  useEffect(() => {
    setFilteredNews(selectedRegion === "all" ? news : news.filter((dt: any) => {
      if (selectedRegion === "all" || dt.region.nametag === selectedRegion) {
        return true
      }
      return false
    }))
  })
  const [selectedRegion, setSelectedRegion] = useState("all")
  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Tính vị trí dữ liệu
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

  // Tổng số trang
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

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
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await newsService.getPosts({ type: "quoc_te", page: currentPage, limit: 10 })
    if (res.statusCode === 200) {
      setNews(res.data)
      // setCurrentPage(currentPage+1)
    } else {
      console.log(res)
    }
  }
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Tin tức quốc tế</h1>
        <p className="text-lg text-gray-600">Cập nhật tình hình quốc phòng, an ninh và quân sự trên thế giới</p>
      </div>

      {/* Region Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {regions.map((region) => (
          <Button
            key={region.id}
            variant={selectedRegion === region.id ? "default" : "outline"}
            onClick={() => 
            {
              setSelectedRegion(region.id)
              setCurrentPage(1)
            }
            }
            className="flex items-center space-x-2"
          >
            <Globe className="h-4 w-4" />
            <span>{region.name}</span>
            <Badge variant="secondary" className="ml-2">
              {
                region.id === "all" ? news.length : news.filter((i:any)=>i?.region?.nametag === region.id).length
              }
            </Badge>
          </Button>
        ))}
      </div>

      {/* News List */}
      <div className="space-y-6">
        {currentData.filter((dt:any)=>{
          if(selectedRegion === "all" || dt?.region?.nametag === selectedRegion){
            return true
          }
          return false
        }).map((item:any) => (
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
                    <Badge variant="outline">{item?.category?.name ?? "Quốc tế"}</Badge>
                    <Badge variant="secondary">{item?.region?.name}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {<TimeAgo date={item.created_at} />}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2" dangerouslySetInnerHTML={{__html:removeImagesFromHTML(item.excerpt)}}/>
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
      {/* World Map Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center mb-6">Bản đồ tin tức thế giới</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">18</span>
              </div>
              <h4 className="font-semibold">Châu Á</h4>
              <p className="text-sm text-gray-600">Tin tức quốc phòng</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">12</span>
              </div>
              <h4 className="font-semibold">Châu Âu</h4>
              <p className="text-sm text-gray-600">Tin tức NATO</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">8</span>
              </div>
              <h4 className="font-semibold">Châu Mỹ</h4>
              <p className="text-sm text-gray-600">Tin tức an ninh</p>
            </div>
          </div>
        </CardContent>
      </Card>

      
    </div>
  )
}

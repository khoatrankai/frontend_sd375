"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Eye, User, ChevronRight, Users, Award, Calendar, Activity } from "lucide-react"
import { newsService } from "@/services/news.service"
import { useRouter } from 'next/navigation';


export default function DivisionNewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "Tất cả", icon: Activity },
    { id: "huan_luyen", name: "Huấn luyện", icon: Users },
    { id: "thi_dua", name: "Thi đua", icon: Award },
    { id: "hoi_nghi", name: "Hội nghị", icon: Calendar },
    { id: "sinh_hoat", name: "Sinh hoạt", icon: Users },
  ]

  const [news, setNews] = useState<any>([
  ])

  const [filteredNews, setFilteredNews] = useState([])
  // activeCategory === "all" ? news : news.filter((item) => item.category === activeCategory)

  const [featuredNews, setFeaturedNews] = useState([])
  // news.filter((item) => item.featured)
  const [regularNews, setRegularNews] = useState([])
  // filteredNews.filter((item) => !item.featured)
  const fetchData = async () => {
    const res = await newsService.getPosts({ type: "hoat_dong_su_doan" }) as any
    if (res.statusCode === 200) {
      setNews(res.data)
    }


  }

  useEffect(() => {
    setRegularNews(filteredNews.filter((item: any) => !item.featured))
  }, [filteredNews])

  useEffect(() => {
    setFilteredNews((selectedCategory === "all" ? news : news.filter((item: any) => item.categoryActivity.nametag === selectedCategory)) as any)
  }, [news, selectedCategory])

  useEffect(() => {
    setFeaturedNews(news.filter((i: any) => i.featured) as any)
  }, [news])
  useEffect(() => {
    fetchData()
  }, [])


  const achievements = [
    { label: "Đơn vị hoàn thành xuất sắc nhiệm vụ", value: "15/15", color: "text-green-600" },
    { label: "Cá nhân đạt danh hiệu chiến sĩ thi đua", value: "89", color: "text-blue-600" },
    { label: "Giải thưởng thi đua các cấp", value: "23", color: "text-purple-600" },
    { label: "Sáng kiến kỹ thuật được áp dụng", value: "12", color: "text-orange-600" },
  ]
  const router = useRouter();

  const loadDetail = async (id: string | number) => {
    router.push(`/tin-tuc/${id}`);
  };
  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Tính vị trí dữ liệu
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = regularNews.slice(indexOfFirstItem, indexOfLastItem);

  // Tổng số trang
  const totalPages = Math.ceil(regularNews.length / itemsPerPage);

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
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Hoạt động Sư đoàn</h1>
        <p className="text-lg text-gray-600">
          Tin tức về các hoạt động, sự kiện và thành tích của Sư đoàn phòng không 375
        </p>
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {achievements.map((achievement, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className={`text-3xl font-bold mb-2 ${achievement.color}`}>{achievement.value}</div>
              <div className="text-sm text-gray-600">{achievement.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category: any) => (
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
                category.id === "all" ? news.length : news.filter((i: any) => i.categoryActivity.nametag === category.id).length
              }
            </Badge>
          </Button>
        ))}
      </div>

      {/* Featured News */}
      {selectedCategory === "all" && featuredNews.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">Hoạt động nổi bật</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredNews.map((item: any) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <img src={item.image || "/public/placeholder.svg"} alt={item.title} className="w-full h-64 object-cover" />
                  <Badge className="absolute top-4 left-4 bg-red-600">{item.categoryActivity.name}</Badge>
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    {item.views}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {item.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {item.time}
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
          {selectedCategory === "all" ? "Hoạt động khác" : categories.find((c) => c.id === selectedCategory)?.name}
        </h2>
        <div className="space-y-6">
          {(selectedCategory === "all" ? currentData : filteredNews).map((item: any) => (
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
                      <Badge variant="outline">{item.categoryActivity.name}</Badge>
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
                      <Button variant="ghost" size="sm" onClick={() => loadDetail(item.id)}>
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

      {/* Upcoming Events */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 mt-12">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center mb-6">Sự kiện sắp tới</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-3">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-semibold">25/12/2024</span>
              </div>
              <h4 className="font-semibold mb-2">Hội nghị Đảng ủy tháng 12</h4>
              <p className="text-sm text-gray-600">Đánh giá kết quả thực hiện nhiệm vụ năm 2024</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-3">
                <Calendar className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-semibold">30/12/2024</span>
              </div>
              <h4 className="font-semibold mb-2">Giao lưu văn hóa cuối năm</h4>
              <p className="text-sm text-gray-600">Chương trình văn nghệ chào mừng năm mới</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-3">
                <Calendar className="h-5 w-5 text-red-600 mr-2" />
                <span className="font-semibold">05/01/2025</span>
              </div>
              <h4 className="font-semibold mb-2">Khai mạc năm huấn luyện 2025</h4>
              <p className="text-sm text-gray-600">Lễ khai mạc năm huấn luyện mới</p>
            </div>
          </div>
        </CardContent>
      </Card>

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

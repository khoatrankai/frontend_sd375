"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Eye, User, ChevronRight } from "lucide-react"
import { newsService } from "@/services/news.service"
import { useRouter } from 'next/navigation';
import TimeAgo from "@/components/time-ago"
import { removeImagesFromHTML } from "@/lib/removeImgHTML"


export default function NewsPage() {
  const [activeType, setActiveType] = useState("all")
  const [filteredNews, setFilteredNews] = useState([])

  const [types, setTypes] = useState([
    { id: "all", name: "Tất cả" },
    { id: "trong_nuoc", name: "Trong nước" },
    { id: "quoc_te", name: "Quốc tế" },
    { id: "quan_su", name: "Quân sự" },
    { id: "hoat_dong_su_doan", name: "Hoạt động Sư đoàn" },
  ])
  const [news, setNews] = useState([
    {
      "id": "abc",
      "title": "Giải bóng đá học sinh 2025",
      "excerpt": "Giải đấu năm nay quy tụ hơn 30 trường tham dự...",
      "image": "https://example.com/images/school-sports.jpg",
      "author": "Trần Tấn Khoa",
      "date": "2025-06-20",
      "time": "10:30",
      "views": 123,
      "type": "trong_nuoc",             // <-- Phải đúng giá trị trong enum NewsType
      "category": "83230BE7-7B4D-F011-9263-8C47BE21632B",
      "categoryActivity": "68F67D1B-744D-F011-9263-8C47BE21632B",
      "region": "B3FD84A6-BE4C-F011-9262-8C47BE21632B",
      "featured": true
    }
  ])
//   const filteredNew = news.filter((dt: any) => {
//   if (activeType === "all") {
//     return dt?.featured === false;
//   } else {
//     return true;
//   }
// });
  
  
  //end phân trang
  






  // activeCategory === "all" ? news : news.filter((item) => item.category === activeCategory)

  const [featuredNews, setFeaturedNews] = useState([])
  // news.filter((item) => item.featured)
  const [regularNews, setRegularNews] = useState([])
  // filteredNews.filter((item) => !item.featured)
  const fetchData = async () => {
    const res = await newsService.getPosts() as any
    if (res.statusCode === 200) {
      setNews(res.data)

    }
  }

  useEffect(() => {
    setRegularNews(filteredNews.filter((item: any) => !item.featured))
  }, [filteredNews])

  useEffect(() => {
    console.log(activeType)
    setFilteredNews((activeType === "all" ? news : news.filter((item) => item.type === activeType)) as any)
  }, [news, activeType])

  useEffect(() => {
    setFeaturedNews(news.filter((i) => i.featured) as any)
  }, [news])
  useEffect(() => {
    fetchData()
  }, [])
  const router = useRouter();

  const loadDetail = async (id: string | number) => {
    router.push(`/tin-tuc/${id}`);
  };
  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Tính vị trí dữ liệu
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNew = (activeType === "all"?regularNews:filteredNews).slice(indexOfFirstItem, indexOfLastItem);

  // Tổng số trang
  const totalPages = Math.ceil((activeType === "all"?regularNews:filteredNews).length / itemsPerPage);

  // Phân nhóm trang (2 trang mỗi cụm)
  const pagesPerGroup = 2;
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  // const totalGroups = Math.ceil(totalPages / pagesPerGroup);

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
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Tin tức</h1>
        <p className="text-lg text-gray-600">
          Cập nhật thông tin mới nhất về hoạt động của Sư đoàn và tình hình trong nước, quốc tế
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {types.map((category) => (
          <Button
            key={category.id}
            variant={activeType === category.id ? "default" : "outline"}
            onClick={() =>
            {
              setActiveType(category.id)
              setCurrentPage(1)
            }
            }
            className="flex items-center space-x-2"
          >
            <span>{category.name}</span>
            <Badge variant="secondary" className="ml-2">
              {
                category.id === "all" ? news.length : news.filter((i) => i.type === category.id).length
              }

            </Badge>
          </Button>
        ))}
      </div>

      {/* Featured News */}
      {activeType === "all" && featuredNews.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">Tin nổi bật</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" >
            {featuredNews.map((item: any) => (
              <Card key={item.id} onClick={() => loadDetail(item.id)} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" >
                <div className="relative">
                  <img src={item.image || "/public/placeholder.svg"} alt={item.title} className="w-full h-64 object-cover" />
                  <Badge className="absolute top-4 left-4 bg-red-600">{types.find((i) => i.id === item.type)?.name}</Badge>
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
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {item.views}
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
          {activeType === "all" ? "Tin tức khác" : types.find((c) => c.id === activeType)?.name}
        </h2>
        <div className="space-y-6">
          {currentNew.map((item: any) => (
            <Card key={item.id}  className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={()=>{
              router.push(`/tin-tuc/${item.id}`)
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
                      <Badge variant="outline">{types.find((i) => i.id === item.type)?.name}</Badge>
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

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Eye, Calendar, Clock, Filter } from "lucide-react"
import { videosService } from "@/services/videos.service"
import dynamic from "next/dynamic"
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isPlayingFeatured, setIsPlayingFeatured] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<number>(-1)
  const [categories, setCategories] = useState([
  ])
  const [videos, setVideos] = useState<any>([])
  const [filteredVideos, setFilteredVideos] = useState<any>([])


  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Tính vị trí dữ liệu
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currenData = filteredVideos.slice(indexOfFirstItem, indexOfLastItem);

  // Tổng số trang
  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);

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






  const [featuredFVideo, setFeaturedVideo] = useState<any>()
  selectedCategory === "all" ? videos : videos.filter((video: any) => video?.category?.nametag === selectedCategory)


  const fetchData = async () => {
    const res = await videosService.getVideos() as any
    const res2 = await videosService.getCategories() as any
    // console.log(res)
    if (res.statusCode === 200) {
      // console.log(res)
      setVideos(res.data)
    }

    if (res2.statusCode === 200) {
      setCategories(res2.data)
    }
  }

  useEffect(() => {
    setFeaturedVideo(filteredVideos.find((dt: any) => dt.featured === true))
  }, [filteredVideos])

  useEffect(() => {
    setFilteredVideos(selectedCategory === "all" ? videos : videos.filter((img: any) => img?.category?.nametag === selectedCategory))
  }, [videos, selectedCategory])

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Thư viện Video</h1>
        <p className="text-lg text-gray-600">
          Kho lưu trữ video về các hoạt động và sự kiện của Sư đoàn phòng không 375
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category: any) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.nametag ? "default" : "outline"}
            onClick={() => 
            {

              setSelectedCategory(category.nametag)
              setCurrentPage(1)
            }
            }
            className="flex items-center space-x-2"
          >
            <span>{category.name}</span>
            <Badge variant="secondary" className="ml-2">
              {
                category.nametag === "all" ? videos.length : videos.filter((i: any) => i?.category?.nametag === category.nametag).length
              }
            </Badge>
          </Button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          {/* <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Bộ lọc
          </Button> */}
        </div>
        <div className="text-sm text-gray-500">Hiển thị {filteredVideos.length} video</div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currenData.map((video: any, index: number) => (
          <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="relative">


              {/* Play Button Overlay */}

              <div className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300">
                <ReactPlayer
                  url={video?.link || "/public/placeholder.svg?height=200&width=300"}
                  className='react-player'
                  playing={isPlaying === index}
                  controls={isPlaying === index}

                  width='100%'
                  height='100%'
                  style={{ position: 'absolute', top: 0, left: 0 }}
                />
              </div>
              {
                isPlaying !== index &&
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity" onClick={() => {
                    setIsPlayingFeatured(false)
                    setIsPlaying(index)
                  }}>
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                </div>

              }
              {/* Duration */}
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {video.duration}
              </div>

              {/* Views */}
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                {video.views}
              </div>

              {/* Category Badge */}
              <Badge className="absolute top-2 left-2 bg-red-600">{video?.category?.name}</Badge>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-red-600 transition-colors">
                {video.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{video.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {video.date}
                </div>
                <div className="flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  {video.views} lượt xem
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Video Section */}
      {
        featuredFVideo &&
        <Card className="bg-gradient-to-r from-red-50 to-red-100 mt-12">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center mb-6">Video nổi bật</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative">

                <div className="w-full h-64 object-cover rounded-lg">
                  <ReactPlayer
                    url={featuredFVideo?.link || "/public/placeholder.svg?height=200&width=300"}
                    className='react-player'
                    playing={isPlayingFeatured}
                    controls={isPlayingFeatured}

                    width='100%'
                    height='100%'
                    style={{ position: 'absolute', top: 0, left: 0 }}
                  />
                </div>
                {
                  !isPlayingFeatured &&
                  <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center" onClick={() => {
                      setIsPlayingFeatured(!isPlayingFeatured)
                      setIsPlaying(-1)
                    }
                    }>
                      <Play className="h-10 w-10 text-white ml-1" />
                    </div>
                  </div>

                }

                <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded">{featuredFVideo?.duration}</div>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-4">{featuredFVideo?.title}</h4>
                <p className="text-gray-700 mb-4">
                  {featuredFVideo?.description}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Phát hành: {featuredFVideo?.date}
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {featuredFVideo?.views} lượt xem
                  </div>
                </div>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Play className="h-4 w-4 mr-2" />
                  Xem ngay
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      }


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

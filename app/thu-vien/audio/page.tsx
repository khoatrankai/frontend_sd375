"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Volume2, SkipForward, SkipBack, Download, Clock, Music, Heart, Share2, CloudCog } from "lucide-react"
import { tracksService } from "@/services/tracks.service"
import AudioPlayerProUI from "@/components/audio-player-pro.ui"

export default function AudioPage() {
  const refBtnReset = useRef<any>(undefined)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [tracks, setTracks] = useState<any>([])



  const [categories, setCategories] = useState<any>([
  ])



  const [filteredTracks, setFilteredTracks] = useState<any>([])
  // selectedCategory === "all" ? tracks : tracks.filter((track) => track.category === selectedCategory)
  const [featuredTracks, setFeaturedTracks] = useState<any>([])
  // filteredTracks.filter((track) => track.featured)
  const [regularTracks, setRegularTracks] = useState<any>([])
  // filteredTracks.filter((track) => !track.featured)

  const handleReset = () => {
    refBtnReset.current?.reset()
    setCurrentTrack(0)
  }

  useEffect(() => {
    console.log(filteredTracks)
    setFeaturedTracks(filteredTracks.filter((track: any) => track.featured))
    setRegularTracks(filteredTracks.filter((track: any) => !track.featured))
  }, [filteredTracks])




  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Tính vị trí dữ liệu
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTracks = filteredTracks.slice(indexOfFirstItem, indexOfLastItem);

  // Tổng số trang
  const totalPages = Math.ceil(filteredTracks.length / itemsPerPage);

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
    console.log(featuredTracks, regularTracks)

  }, [featuredTracks, regularTracks])
  useEffect(() => {
    setCurrentTrack(0)
  }, [currentPage])

  useEffect(() => {
    setFilteredTracks(selectedCategory === "all" ? tracks : tracks.filter((track: any) => track?.category?.nametag === selectedCategory))
  }, [selectedCategory, tracks])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await tracksService.getTracks()
    const res2 = await tracksService.getCategories()
    if (res.statusCode === 200) {
      setTracks(res.data)
    }

    if (res2.statusCode === 200) {
      setCategories(res2.data)
    }
  }


  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    // console.log(currentPage,totalPages)
    // if(currentTrack === totalPages -1){
    //   setCurrentTrack(1)
    // }else{
    if (currentTrack === itemsPerPage - 1) {
      if (currentPage === totalPages) {
        setCurrentPage(1)
      } else {
        setCurrentPage((preValue) => {
          return preValue + 1
        })
      }
    } else {
      setCurrentTrack((prev) => (prev + 1) % currentTracks.length)

    }
    // }
  }

  const prevTrack = () => {

    if (currentTrack === 0) {
      if (currentPage === 1) {
        setCurrentPage(totalPages)
      } else {
        setCurrentPage((preValue) => {
          return preValue - 1
        })
      }
    } else {
      setCurrentTrack((prev) => (prev - 1 + currentTracks.length) % currentTracks.length)

    }
  }

  const selectTrack = (index: number) => {
    // refBtn.current.click()
    setCurrentTrack(index)
    handleReset()
    // setIsPlaying(true)
  }




  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Thư viện Audio</h1>
        <p className="text-lg text-gray-600">
          Kho lưu trữ các bài hát, ca khúc cách mạng và âm thanh của Sư đoàn phòng không 375
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category: any) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.nametag ? "default" : "outline"}
            onClick={() => {
              setSelectedCategory(category.nametag)
              // refBtn.current.click()
              setCurrentPage(1)
              handleReset()
            }

            }
            className="flex items-center space-x-2"
          >
            <Music className="h-4 w-4" />
            <span>{category.name}</span>
            <Badge variant="secondary" className="ml-2">
              {
                category.nametag === "all" ? tracks.length : tracks.filter((i: any) => i?.category?.nametag === category.nametag).length
              }
            </Badge>
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Audio Player */}
        <div className="lg:col-span-1">
          {/* <Card className="bg-gradient-to-br from-red-50 to-red-100 sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Volume2 className="h-5 w-5 mr-2 text-red-600" />
                Đang phát
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Music className="h-16 w-16 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {filteredTracks[currentTrack]?.title || "Chọn bài hát"}
                </h3>
                <p className="text-gray-600">{filteredTracks[currentTrack]?.artist || ""}</p>
                <Badge variant="outline" className="mt-2">
                  {filteredTracks[currentTrack]?.categoryName || ""}
                </Badge>
              </div>

              <div className="flex items-center justify-center space-x-4 mb-4">
                <Button variant="outline" size="icon" onClick={prevTrack}>
                  <SkipBack className="h-4 w-4" />
                </Button>

                <Button size="icon" className="h-12 w-12 bg-red-600 hover:bg-red-700" onClick={togglePlay}>
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>

                <Button variant="outline" size="icon" onClick={nextTrack}>
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-red-600 h-2 rounded-full w-1/3"></div>
              </div>

              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>01:15</span>
                <span>{filteredTracks[currentTrack]?.duration || "00:00"}</span>
              </div>

              <div className="flex justify-center space-x-2">
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-1" />
                  Yêu thích
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  Chia sẻ
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Tải về
                </Button>
              </div>
            </CardContent>
          </Card> */}
          <AudioPlayerProUI refBtnReset={refBtnReset} onNext={nextTrack} onPrev={prevTrack}
            duration={currentTracks?.[currentTrack]?.duration}
            category={currentTracks?.[currentTrack]?.category?.name}
            artist={currentTracks?.[currentTrack]?.artist}
            title={currentTracks?.[currentTrack]?.title}
            src={currentTracks?.[currentTrack]?.link} />
        </div>

        {/* Playlist */}
        <div className="lg:col-span-2 space-y-6">
          {/* Featured Tracks */}
          {/* {featuredTracks.length} */}
          {featuredTracks.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-red-600 pb-2">Bài hát nổi bật</h2>
              <div className="relative">
                <div className="flex space-x-4 transition-all duration-300">
                  {currentTracks.map((track: any, index: number) => (
                    <Card
                      key={index}
                      className={`w-full md:w-[300px] cursor-pointer transition-all hover:shadow-lg ${index === currentTrack ? "bg-red-50 border border-red-200" : "hover:bg-gray-50"
                        }`}
                      onClick={() => {
                        setCurrentTrack(index);
                        setIsPlaying(true);
                      }}

                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${index === currentTrack ? "bg-red-600 text-white" : "bg-gray-200"
                              }`}
                          >
                            {index === currentTrack && isPlaying ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-800 truncate">{track.title}</h4>
                            <p className="text-sm text-gray-600">{track.artist}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {track?.category?.name}
                              </Badge>
                              <span className="text-xs text-gray-500">{track.duration}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">{track.plays} lượt phát</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>


              </div>

            </section>
          )}

          {/* Regular Playlist */}
          {regularTracks.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-red-600 pb-2">Danh sách phát</h2>
              <Card>

                <CardContent>
                  <div className="space-y-2">
                    {currentTracks?.map((track: any, index: number) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded cursor-pointer transition-colors ${index === currentTrack ? "bg-red-50 border border-red-200" : "hover:bg-gray-50"
                          }`}
                        onClick={() => {
                          setCurrentTrack(index);
                          setIsPlaying(true);
                        }}

                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${index === currentTrack ? "bg-red-600 text-white" : "bg-gray-200"
                              }`}
                          >
                            {index === currentTrack && isPlaying ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{track.title}</p>
                            <p className="text-xs text-gray-500">{track.artist}</p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{track.duration}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
            </section>
          )}

        </div>
      </div>

      {/* Audio Statistics */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 mt-12">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center mb-6">Thống kê thư viện</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Music className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800">{tracks.length}</div>
              <div className="text-sm text-gray-600">Tổng số bài hát</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Volume2 className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800">25,847</div>
              <div className="text-sm text-gray-600">Tổng lượt phát</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800">52:15</div>
              <div className="text-sm text-gray-600">Tổng thời lượng</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800">1,234</div>
              <div className="text-sm text-gray-600">Lượt yêu thích</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

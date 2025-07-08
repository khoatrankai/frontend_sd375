"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageIcon, Video, Music, Download, Play, Eye, Calendar, Filter, Grid3X3, List, Clock } from "lucide-react"
import { imagesService } from "@/services/images.service"
import { videosService } from "@/services/videos.service"
import { tracksService } from "@/services/tracks.service"
import { softwareService } from "@/services/software.service"
import { downloadFile } from "@/lib/DownloadImage"
import ReactPlayer from "react-player"
import AudioPlayerItemUI from "@/components/audio-player-item.ui"
import { Image } from "antd"

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState("images")
  const [viewMode, setViewMode] = useState("grid")
  const [isPlaying, setIsPlaying] = useState<number>(-1)
  const [isPlayingAudio, setIsPlayingAudio] = useState<number>(-1)


  const [mediaItems, setMediaItems] = useState<any>({

  })

  const currentItems = mediaItems[activeTab as keyof typeof mediaItems] || []
  



  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Tính vị trí dữ liệu
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currenData = currentItems.slice(indexOfFirstItem, indexOfLastItem);

  // Tổng số trang
  const totalPages = Math.ceil(currentItems.length / itemsPerPage);

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


  const tabs = [
    { id: "images", name: "Hình ảnh", icon: ImageIcon, count: mediaItems?.images?.length },
    { id: "videos", name: "Video", icon: Video, count: mediaItems?.videos?.length },
    { id: "audio", name: "Audio", icon: Music, count: mediaItems?.audio?.length },
    { id: "software", name: "Phần mềm", icon: Download, count: mediaItems?.software?.length },
  ]
  const nextTrack = () => {
    // console.log(currentPage,totalPages)
    // if(currentTrack === totalPages -1){
    //   setCurrentTrack(1)
    // }else{
    if (isPlayingAudio === currentItems?.length - 1) {
      setIsPlayingAudio(0)
    } else {
      setIsPlayingAudio((pre) => pre + 1)
    }


  }

  const prevTrack = () => {

    if (isPlayingAudio === 0) {
      setIsPlayingAudio(currentItems?.length - 1)
    } else {
      setIsPlayingAudio((pre) => pre - 1)
    }
  }
  const renderGridView = () => {
    if (activeTab === "audio") {
      return (
        <div className="space-y-4">
          {currenData.map((item: any, index: number) => (

            index === isPlayingAudio ?
              <AudioPlayerItemUI
                onNext={nextTrack}
                onPrev={prevTrack}
                // duration={item?.duration}
                category={item?.category?.name}
                artist={item?.artist}
                title={item?.title}
                src={item?.link}
              /> :

              <Card key={item?.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                      <Music className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>Thời lượng: {item.duration}</span>
                        <span>Lượt phát: {item.plays}</span>
                        <Badge variant="outline">{item?.category?.name}</Badge>
                      </div>
                    </div>
                    <Button size="icon" className="bg-red-600 hover:bg-red-700" onClick={() => {
                      setIsPlayingAudio(index)
                    }}>
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>



            // <AudioPlayerItemUI
            //             duration={item?.duration}
            //             category={item?.category?.name}
            //             artist={item?.artist}
            //             title={item?.title}
            //             src={item?.link}
            // />
            // <AudioPlayerProUI refBtnReset={refBtnReset} onNext={nextTrack} onPrev={prevTrack}
            //             duration={currentTracks?.duration}
            //             category={currentTracks?.category?.name}
            //             artist={currentTracks?.artist}
            //             title={currentTracks?.title}
            //             src={currentTracks?.link} />
          ))}
        </div>
      )
    }

    if (activeTab === "software") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currenData.map((item: any) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Download className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg line-clamp-2">{item.name}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex justify-between">
                    <span>Phiên bản:</span>
                    <span className="font-medium">{item.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dung lượng:</span>
                    <span className="font-medium">{item.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lượt tải:</span>
                    <span className="font-medium">{item.downloads}</span>
                  </div>
                </div>
                <Button className="w-full" variant="outline" onClick={() => {
                  downloadFile(item?.link)
                }}>
                  <Download className="h-4 w-4 mr-2" />
                  Tải xuống
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    }

    if (activeTab === "videos") {
      return <>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {currenData.map((video: any, index: number) => (
            <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="relative aspect-video w-full">


                {/* Play Button Overlay */}

                <div className="relative aspect-[16/9] w-full">
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
                      // setIsPlayingFeatured(false)
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
                <Badge className="absolute top-2 left-2 bg-red-600">{video.category.name}</Badge>
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


      </>
    }
    return <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currenData.map((image: any) => (
          <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex justify-center relative">
              <Image
                src={image.thumbnail || "/placeholder.svg"}
                alt={image.title || image.name}
                className="!w-full !h-full object-cover object-center rounded"
                width={450}
                height={228}
                preview={{
                  mask: (
                    <div className="text-white text-base font-semibold flex flex-col items-center justify-center">
                      <Eye className="text-xl mb-1" />
                    </div>
                  ),
                }}
              />

              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                {image.views}
              </div>
              <Badge className="absolute top-2 left-2">{image.category.name}</Badge>
            </div>
            <CardContent className="p-4 mt-auto">
              <h3 className="font-medium text-sm line-clamp-2 mb-2">{image.title}</h3>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                {image.date}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

    </>
  }

  const fetchData = async () => {
    const res = await imagesService.getImages()
    const res2 = await videosService.getVideos()
    const res3 = await tracksService.getTracks()
    const res4 = await softwareService.getSoftwares()
    if (res.statusCode === 200 && res2.statusCode === 200 && res3.statusCode === 200 && res4.statusCode === 200) {
      setMediaItems({
        images: res.data,
        videos: res2.data,
        audio: res3.data,
        software: res4.data,
      })
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Thư viện</h1>
        <p className="text-lg text-gray-600">Kho tài nguyên đa phương tiện của Sư đoàn phòng không 375</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center space-x-2"
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.name}</span>
            <Badge variant="secondary" className="ml-2">
              {tab.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Controls */}
      {/* <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Bộ lọc
          </Button>
        </div>
        {activeTab !== "audio" && activeTab !== "software" && (
          <div className="flex items-center space-x-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div> */}

      {/* Content */}
      {renderGridView()}

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

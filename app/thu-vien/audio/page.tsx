"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Volume2, SkipForward, SkipBack, Download, Clock, Music, Heart, Share2 } from "lucide-react"

export default function AudioPage() {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "Tất cả", count: 15 },
    { id: "national", name: "Quốc ca", count: 3 },
    { id: "revolutionary", name: "Ca khúc cách mạng", count: 6 },
    { id: "military", name: "Hành khúc quân đội", count: 4 },
    { id: "folk", name: "Dân ca", count: 2 },
  ]

  const tracks = [
    {
      id: 1,
      title: "Quốc ca Việt Nam",
      artist: "Văn Cao",
      duration: "03:45",
      category: "national",
      categoryName: "Quốc ca",
      plays: 5670,
      description: "Quốc ca nước Cộng hòa xã hội chủ nghĩa Việt Nam",
      releaseDate: "1944",
      featured: true,
    },
    {
      id: 2,
      title: "Bộ đội Cụ Hồ",
      artist: "Quân đội nhân dân",
      duration: "04:12",
      category: "revolutionary",
      categoryName: "Ca khúc cách mạng",
      plays: 3420,
      description: "Ca khúc bất hủ về Bộ đội Cụ Hồ",
      releaseDate: "1965",
      featured: true,
    },
    {
      id: 3,
      title: "Tiến quân ca",
      artist: "Nguyễn Văn Cao",
      duration: "02:58",
      category: "military",
      categoryName: "Hành khúc quân đội",
      plays: 2890,
      description: "Hành khúc của Quân đội nhân dân Việt Nam",
      releaseDate: "1944",
      featured: false,
    },
    {
      id: 4,
      title: "Đường tới ngày vinh quang",
      artist: "Văn Cao",
      duration: "03:30",
      category: "revolutionary",
      categoryName: "Ca khúc cách mạng",
      plays: 2156,
      description: "Ca khúc cách mạng bất hủ",
      releaseDate: "1945",
      featured: false,
    },
    {
      id: 5,
      title: "Quân hành ca",
      artist: "Đoàn Chuẩn",
      duration: "03:15",
      category: "military",
      categoryName: "Hành khúc quân đội",
      plays: 1890,
      description: "Hành khúc truyền thống của quân đội",
      releaseDate: "1946",
      featured: false,
    },
    {
      id: 6,
      title: "Việt Nam, Hồ Chí Minh",
      artist: "Lưu Hữu Phước",
      duration: "04:05",
      category: "national",
      categoryName: "Quốc ca",
      plays: 1567,
      description: "Bài hát về Chủ tịch Hồ Chí Minh",
      releaseDate: "1958",
      featured: false,
    },
    {
      id: 7,
      title: "Hò kéo pháo",
      artist: "Dân gian",
      duration: "02:45",
      category: "folk",
      categoryName: "Dân ca",
      plays: 1234,
      description: "Dân ca truyền thống về tinh thần chiến đấu",
      releaseDate: "Truyền thống",
      featured: false,
    },
    {
      id: 8,
      title: "Khúc hát sông Pô",
      artist: "Hoàng Việt",
      duration: "03:50",
      category: "revolutionary",
      categoryName: "Ca khúc cách mạng",
      plays: 987,
      description: "Ca khúc về chiến trường miền Nam",
      releaseDate: "1968",
      featured: false,
    },
  ]

  const filteredTracks =
    selectedCategory === "all" ? tracks : tracks.filter((track) => track.category === selectedCategory)
  const featuredTracks = filteredTracks.filter((track) => track.featured)
  const regularTracks = filteredTracks.filter((track) => !track.featured)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % filteredTracks.length)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + filteredTracks.length) % filteredTracks.length)
  }

  const selectTrack = (index: number) => {
    setCurrentTrack(index)
    setIsPlaying(true)
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
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center space-x-2"
          >
            <Music className="h-4 w-4" />
            <span>{category.name}</span>
            <Badge variant="secondary" className="ml-2">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Audio Player */}
        <div className="lg:col-span-1">
          <Card className="bg-gradient-to-br from-red-50 to-red-100 sticky top-4">
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
          </Card>
        </div>

        {/* Playlist */}
        <div className="lg:col-span-2 space-y-6">
          {/* Featured Tracks */}
          {featuredTracks.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-red-600 pb-2">Bài hát nổi bật</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredTracks.map((track, index) => (
                  <Card
                    key={track.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      currentTrack === index ? "ring-2 ring-red-500 bg-red-50" : ""
                    }`}
                    onClick={() => selectTrack(index)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            currentTrack === index && isPlaying ? "bg-red-600 text-white" : "bg-gray-200"
                          }`}
                        >
                          {currentTrack === index && isPlaying ? (
                            <Pause className="h-5 w-5" />
                          ) : (
                            <Play className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 truncate">{track.title}</h4>
                          <p className="text-sm text-gray-600">{track.artist}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {track.categoryName}
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
            </section>
          )}

          {/* Regular Playlist */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-red-600 pb-2">Danh sách phát</h2>
            <Card>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {regularTracks.map((track, index) => {
                    const actualIndex = featuredTracks.length + index
                    return (
                      <div
                        key={track.id}
                        className={`flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 ${
                          currentTrack === actualIndex ? "bg-red-50 border-red-200" : ""
                        }`}
                        onClick={() => selectTrack(actualIndex)}
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              currentTrack === actualIndex && isPlaying ? "bg-red-600 text-white" : "bg-gray-200"
                            }`}
                          >
                            {currentTrack === actualIndex && isPlaying ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">{track.title}</h4>
                            <p className="text-sm text-gray-600">{track.artist}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant="outline" className="text-xs">
                            {track.categoryName}
                          </Badge>
                          <span className="text-sm text-gray-500">{track.duration}</span>
                          <div className="flex items-center text-sm text-gray-500">
                            <Volume2 className="h-3 w-3 mr-1" />
                            {track.plays}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </section>
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
              <div className="text-3xl font-bold text-gray-800">15</div>
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

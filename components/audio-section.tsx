"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, SkipForward, SkipBack } from "lucide-react"
import { tracksService } from "@/services/tracks.service"
import AudioPlayerUI from "./audio-player.ui"

export default function AudioSection() {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const [tracks, setTracks] = useState<any>([
  ])


  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Tính vị trí dữ liệu
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = tracks.slice(indexOfFirstItem, indexOfLastItem);

  // Tổng số trang
  const totalPages = Math.ceil(tracks.length / itemsPerPage);

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
    const res = await tracksService.getTracks()
    if (res.statusCode === 200) {
      setTracks(res.data)
    }
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
  }

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">Một số bài hát quy định</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Audio Player */}
        <AudioPlayerUI duration={currentData?.[currentTrack]?.duration}
          category={currentData?.[currentTrack]?.category?.name}
          artist={currentData?.[currentTrack]?.artist}
          title={currentData?.[currentTrack]?.title}
          src={currentData?.[currentTrack]?.link} />
        <Card>
          <CardHeader>
            <CardTitle>Danh sách phát</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {currentData?.map((track: any, index: number) => (
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
        </Card>
      </div>
    </section>
  )
}

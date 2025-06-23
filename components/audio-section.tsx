"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, SkipForward, SkipBack } from "lucide-react"
import { tracksService } from "@/services/tracks.service"

export default function AudioSection() {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const [tracks,setTracks] = useState<any>([
  ])

  useEffect(()=>{
    fetchData()
  },[])

  const fetchData = async()=>{
    const res = await tracksService.getTracks()
    if(res.statusCode === 200){
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
        <Card className="bg-gradient-to-br from-red-50 to-red-100">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Volume2 className="h-5 w-5 mr-2 text-red-600" />
              Đang phát
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-1">{tracks?.[currentTrack]?.title}</h3>
              <p className="text-gray-600">{tracks?.[currentTrack]?.artist}</p>
              <p className="text-sm text-gray-500">{tracks?.[currentTrack]?.category?.name}</p>
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

            <div className="flex justify-between text-sm text-gray-500">
              <span>01:15</span>
              <span>{tracks?.[currentTrack]?.duration}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Danh sách phát</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tracks?.map((track:any, index:number) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded cursor-pointer transition-colors ${
                    index === currentTrack ? "bg-red-50 border border-red-200" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setCurrentTrack(index)}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === currentTrack ? "bg-red-600 text-white" : "bg-gray-200"
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
      </div>
    </section>
  )
}

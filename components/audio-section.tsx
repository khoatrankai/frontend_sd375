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
        <AudioPlayerUI duration={tracks?.[currentTrack]?.duration} category={tracks?.[currentTrack]?.category?.name} artist={tracks?.[currentTrack]?.artist} title={tracks?.[currentTrack]?.title} src={tracks?.[currentTrack]?.link} />
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

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, ExternalLink, Play, Volume2 } from "lucide-react"
import { newsService } from "@/services/news.service"
import { useEffect, useState } from "react"
import TimeAgo from "./time-ago"
import { imagesService } from "@/services/images.service"
import { videosService } from "@/services/videos.service"
import { tracksService } from "@/services/tracks.service"
import ReactPlayer from 'react-player'
import { Image } from "antd"
import AudioPlayer from "./audio-player"

export default function Sidebar() {
  const quickLinks = ["Bộ Quốc phòng", "Quân khu 7", "Báo Quân đội nhân dân", "VOV Giao thông", "Thời tiết"]
  const [imageTop,setImageTop] = useState<any>()
  const [isPlaying,setPlaying] = useState<boolean>(false)
  const [videoTop,setVideoTop] = useState<any>()
  const [tracks,setTracks] = useState<any>([])
  const [newsItems,setNewsItem] = useState<any>([
  ])
  const [newsFilter,setNewsFilter] = useState([])
  const fetchData = async()=>{
    const res = await newsService.getPosts({page:0,limit:10}) as any
    const res2 = await imagesService.getImages() as any
    const res3 = await videosService.getVideos() as any
    const res4 = await tracksService.getTracks() as any
    if(res.statusCode === 200){
      setNewsItem(res.data)
      
    }
    if(res4.statusCode === 200){
      setTracks(res4?.data?.filter((dt:any,index:number)=>{
        return index < 4
      }))
     
    }
    if(res2.statusCode === 200){
      setImageTop(res2?.data?.[0])
    }
    if(res3.statusCode === 200){
  
      setVideoTop(res3?.data?.[0])
    
    }
  }

  useEffect(()=>{
    setNewsFilter(newsItems.filter((i:any)=> !i.featured).filter((i:any,index:number)=> index > 3))
  },[newsItems])
useEffect(()=>{
  fetchData()
},[])
  return (
    <aside className="w-80 p-4 space-y-6 bg-gray-50">
      {/* Thanh tìm kiếm */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Tìm kiếm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input placeholder="Nhập từ khóa..." className="flex-1" />
            <Button size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bản tin */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Bản tin</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {newsFilter.map((item:any) => (
              <div key={item?.id} className="p-3 bg-white rounded border hover:shadow-md transition-shadow cursor-pointer">
                <p className="text-sm text-gray-700 line-clamp-2">{item.title}</p>
                <span className="text-xs text-gray-500">{<TimeAgo date={item.created_at}/>}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Liên kết nhanh */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Liên kết nhanh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center justify-between p-2 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
              >
                <span>{link}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hình ảnh slideshow */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Hình ảnh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* <img
              src={imageTop?.thumbnail || "/public/placeholder.svg?height=200&width=300"}
              alt="Hình ảnh hoạt động"
              className="w-full h-48 object-cover rounded"
            /> */}
            <div className="w-full h-48 object-cover rounded">
 <Image src={imageTop?.thumbnail || "/public/placeholder.svg?height=200&width=300"} alt="Hình ảnh hoạt động" height={'100%'} width={'100%'}/>
            </div>
            
            <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded text-xs">
              {imageTop?.title || "Hình ảnh hoạt động"}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video slideshow */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Video</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="w-full h-36 object-cover rounded overflow-hidden">
              <ReactPlayer
                url={videoTop?.link || "/public/placeholder.svg?height=200&width=300"}
                className='react-player'
                playing={isPlaying}
                controls={isPlaying}
                
                width='100%'
                height='100%'
                style={{ position: 'absolute', top: 0, left: 0 }}
              />
            </div>
            
            {
              !isPlaying &&
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="icon" className="rounded-full bg-red-600 hover:bg-red-700" onClick={()=>setPlaying(!isPlaying)}>
                  <Play className="h-6 w-6 text-white" />
                </Button>
              </div> 
            }
            
            <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded text-xs">
              {videoTop?.title || "Video thumbnail"}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audio */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Audio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {
              tracks?.map((dt:any)=>{
                return <>
              {/* <div className="flex items-center space-x-3 p-2 bg-white rounded border">
              <Button size="icon" variant="outline" className="h-8 w-8">
                <Volume2 className="h-4 w-4" />
              </Button>
              <div className="flex-1">
                <p className="text-sm font-medium">{dt?.title || "Audio title"}</p>
                <p className="text-xs text-gray-500">{dt?.duration || "00:00"}</p>
              </div>
            </div> */}
            <AudioPlayer src={dt?.link || "/public/placeholder.svg?height=200&width=300"} />
                </>
              })
            }
            
            
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}

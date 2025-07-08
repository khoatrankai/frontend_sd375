import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, ExternalLink, Play, Volume2, Eye } from "lucide-react"
import { newsService } from "@/services/news.service"
import { useEffect, useRef, useState } from "react"
import TimeAgo from "./time-ago"
import { imagesService } from "@/services/images.service"
import { videosService } from "@/services/videos.service"
import { tracksService } from "@/services/tracks.service"
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })
import { Image } from "antd"
import AudioPlayer from "./audio-player"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"

export default function Sidebar() {
  const router = useRouter()
  const playerRef = useRef<any>(null)
  const quickLinks = [{ name: "Quản lý văn bản", link: "http://quanlyvanban.bqp" }, { name: "Hệ thông tin CĐ-ĐH QC", link: "http://htt.qcpkkq.bqp" }, { name: "Hệ thông tin CĐ-ĐH F375", link: "https://192.168.1.120" }, { name: "Mail QS", link: "https://mail.bqp" }, { name: "Cổng TTĐT QC", link: "http://qcpkkq.bqp" }]
  const [imageTop, setImageTop] = useState<any>()
  const [isPlaying, setPlaying] = useState<boolean>(false)
  const [videoTop, setVideoTop] = useState<any>()
  const [tracks, setTracks] = useState<any>([])
  const [translateY,setTranslateY] =useState(260)
  const [newsItems, setNewsItem] = useState<any>([
  ])
  const [newsFilter, setNewsFilter] = useState([])
  const fetchData = async () => {
    const res = await newsService.getPosts({ page: 0, limit: 10 }) as any
    const res2 = await imagesService.getImages() as any
    const res3 = await videosService.getVideos() as any
    const res4 = await tracksService.getTracks() as any
    if (res.statusCode === 200) {
      setNewsItem(res.data)

    }
    if (res4.statusCode === 200) {
      setTracks(res4?.data?.filter((dt: any, index: number) => {
        return index < 4
      }))

    }
    if (res2.statusCode === 200) {
      setImageTop(res2?.data?.[0])
    }
    if (res3.statusCode === 200) {

      setVideoTop(res3?.data?.[0])

    }
  }

  useEffect(() => {
    setNewsFilter(newsItems.filter((i: any) => !i.featured).filter((i: any, index: number) => index < 3))
  }, [newsItems])

  useEffect(()=>{
    setInterval(()=>{
      // if(translateY<-()){
      //   setTranslateY(140)
      // }
      setTranslateY((prev)=>{
        if(prev<-(newsFilter.length * 140 + 50 + 256)){
          return 260
        }
        return prev - 1
      })
    },100)
  },[newsFilter.length])
 
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
  if (isPlaying && playerRef.current) {
    const element = playerRef.current.wrapper; // ReactPlayer dùng wrapper để tham chiếu đến DOM

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { // Safari
      element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
      element.msRequestFullscreen();
    }
  }
}, [isPlaying]);
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
          <div className="overflow-hidden h-64">
            <div className={`space-y-3 ${translateY <= -(newsFilter.length * 140 + 50) || translateY === 260 ?'':'transition-transform *:duration-100'}`} style={{transform:`translateY(${translateY}px)`}}>
            {newsFilter.map((item: any) => (
              <div key={item?.id} className="p-3 bg-white rounded border hover:shadow-md transition-shadow cursor-pointer" onClick={()=>{
                router.push(`/tin-tuc/${item.id}`)
              }}>
                <p className="text-sm text-gray-1400 line-clamp-2">{item.title}</p>
                <span className="text-xs text-gray-500">{<TimeAgo date={item.created_at} />}</span>
              </div>
            ))}
        
          </div>
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
            {quickLinks.map((link: any, index) => (
              <a
                key={index}
                target="_blank"
                href={link?.link}
                className="flex items-center justify-between p-2 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
              >
                <span>{link?.name}</span>
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
          <div className="relative flex justify-center">
            <div className="w-full h-48 object-cover rounded">
              <Image src={imageTop?.thumbnail || "/public/placeholder.svg?height=200&width=300"}
              alt="Hình ảnh hoạt động" 
              height={'100%'} width={'100%'} 
              className=" object-cover"
                preview={{
                  mask: (
                    <div className="text-white text-base font-semibold flex flex-col items-center justify-center">
                      <Eye className="text-xl mb-1" />
                    </div>
                  ),
                }}
              />
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
                ref={playerRef}
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
              <div  className="absolute inset-0 overflow-hidden object-contain">
              <Image alt="" preview={false} src={videoTop?.thumbnail || "/public/placeholder.svg?height=200&width=300"} className="w-64 h-36 object-cover"/>
                
              </div>
            }
            
            {
              !isPlaying &&
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="icon" className="rounded-full bg-red-600 hover:bg-red-1400" onClick={() => setPlaying(!isPlaying)}>
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
              tracks?.map((dt: any) => {
                return <div key={dt.id}>
                  {/* <div className="flex items-center space-x-3 p-2 bg-white rounded border">
              <Button size="icon" variant="outline" className="h-8 w-8">
                <Volume2 className="h-4 w-4" />
              </Button>
              <div className="flex-1">
                <p className="text-sm font-medium">{dt?.title || "Audio title"}</p>
                <p className="text-xs text-gray-500">{dt?.duration || "00:00"}</p>
              </div>
            </div> */}
                  <AudioPlayer src={dt?.link || "/public/placeholder.svg?height=200&width=300"} data={dt} />
                </div>
              })
            }


          </div>
        </CardContent>
      </Card>
    </aside>
  )
}

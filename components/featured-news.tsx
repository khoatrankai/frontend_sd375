"use client"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { newsService } from "@/services/news.service"
import TimeAgo from "./time-ago"
import { useRouter } from "next/navigation"

export default function FeaturedNews() {
  const router = useRouter()
  const [currentMainNews, setCurrentMainNews] = useState(0)

  const [mainNews,setMainNews] = useState([
   
  ])

  const [sideNews,setSideNews] = useState([
   
  ])

  useEffect(()=>{
    fetchData()
  },[])

  const fetchData = async()=>{
    const res = await newsService.getPosts({limit:9,page:0}) as any
    if(res.statusCode === 200){
      setMainNews(res.data.filter((dt:any)=> dt.featured))
      setSideNews(res.data.filter((dt:any)=> !dt.featured))
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMainNews((prev) => (prev + 1) % mainNews.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [mainNews.length])
const latestSideNews = [...sideNews as { created_at: string }[]]
  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  .slice(0, 3);

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">Tin tức nổi bật</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main news slideshow - 2/3 width */}
        <div className="lg:col-span-2"> 
          <div className="relative h-96 overflow-hidden rounded-lg shadow-lg">
            {mainNews.map((news:any, index) => (
              <div
                key={index}
                className={`absolute cursor-pointer inset-0 transition-opacity duration-500 ${
                  index === currentMainNews ? "opacity-100 z-40" : "opacity-0 -z-50"
                }`}
                onClick={()=>{
                  // window.location.href = `/tin-tuc/${news?.id}`
                  router.push(`/tin-tuc/${news.id}`)
                }}
              >
                <img src={news.image || "/public/placeholder.svg"} alt={news.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="destructive">{news?.category?.name ?? news?.categoryActivity?.name ?? news?.region?.name ?? "Trong nước"}</Badge>
                      <div className="flex items-center text-sm text-gray-200">
                        <Clock className="h-4 w-4 mr-1" />
                        {<TimeAgo date={news.created_at} />}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:underline" >{news.title}</h3>
                    <p className="text-gray-200 line-clamp-2" dangerouslySetInnerHTML={{__html:news.excerpt}}/>
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 z-50"
              onClick={() => setCurrentMainNews((prev) => (prev - 1 + mainNews.length) % mainNews.length)}
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 z-50"
              onClick={() => setCurrentMainNews((prev) => (prev + 1) % mainNews.length)}
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </Button>

            <div className="absolute bottom-20 left-6 flex space-x-2 z-50">
              {mainNews.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentMainNews ? "bg-white" : "bg-white/50"}`}
                  onClick={() => setCurrentMainNews(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Side news - 1/3 width */}
        <div className="space-y-3">
          {latestSideNews.map((news:any, index) => (
            <Card onClick={()=>{
              router.push(`/tin-tuc/${news.id}`)
            }} key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {news?.category?.name ?? news?.categoryActivity?.name ?? news?.region?.name ?? "Trong nước"}
                  </Badge>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {<TimeAgo date={news.created_at} />}
                  </div>
                </div>
                <h4 className="font-medium text-sm line-clamp-2 text-gray-800 hover:text-red-600 transition-colors">
                  {news.title}
                </h4>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

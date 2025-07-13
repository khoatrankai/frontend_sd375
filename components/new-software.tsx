"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Calendar, Star } from "lucide-react"
import { useEffect, useState } from "react"
import { softwareService } from "@/services/software.service"
import { downloadFile } from "@/lib/DownloadImage"

export default function NewSoftware() {
  const [software,setSoftware] = useState<any>([
   
  ])
  useEffect(()=>{
    fetchData()
  },[])

  const fetchData = async()=>{
    const res = await softwareService.getSoftwares()
    if(res.statusCode === 200){
      setSoftware(res.data)
    }
  }

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">Phần mềm mới</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {software.map((item:any, index:number) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg line-clamp-2">{item.name}</CardTitle>
                {/* {item.featured && ( */}
                  <Badge variant="destructive" className="ml-2">
                    <Star className="h-3 w-3 mr-1" />
                    Nổi bật
                  </Badge>
                {/* )} */}
              </div>
            </CardHeader>
            <CardContent>
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
                <div className="flex justify-between items-center">
                  <span>Ngày cập nhật:</span>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span className="font-medium">{item.date}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Lượt tải:</span>
                  <span className="font-medium">{item.downloads}</span>
                </div>
              </div>

              <Button className="w-full" variant="outline" onClick={()=>{
                downloadFile(item?.link)
              }}>
                <Download className="h-4 w-4 mr-2" />
                Tải xuống
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

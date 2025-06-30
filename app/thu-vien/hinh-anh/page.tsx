"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Calendar, Grid3X3, List, Filter } from "lucide-react"
import { imagesService } from "@/services/images.service"
import { Image } from "antd"

export default function ImagesPage() {
  const [viewMode, setViewMode] = useState("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [categories,setCategories] = useState<any>([])

  const [images,setImages] = useState<any>([
  ])

  const [filteredImages,setFilteredImage] = useState<any>([]) 
  // selectedCategory === "all" ? images : images.filter((img:any) => img.category.nametag === selectedCategory)



  const fetchData = async()=>{
    const res = await imagesService.getImages() as any
    const res2 = await imagesService.getCategories() as any
    // console.log(res)
    if(res.statusCode === 200){
      // console.log(res)
      setImages(res.data)
    }

    if(res2.statusCode === 200){
      setCategories(res2.data)
    }
  }
  

  useEffect(()=>{
    console.log(images)
    setFilteredImage(selectedCategory === "all" ? images : images.filter((img:any) => img.category.nametag === selectedCategory))
  },[images,selectedCategory])

  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Thư viện hình ảnh</h1>
        <p className="text-lg text-gray-600">Kho lưu trữ hình ảnh về các hoạt động của Sư đoàn phòng không 375</p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category:any) => (
          <Button
            key={category.nametag}
            variant={selectedCategory === category.nametag ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.nametag)}
            className="flex items-center space-x-2"
          >
            <span>{category.name}</span>
            <Badge variant="secondary" className="ml-2">
               {
                category.nametag === "all" ? images.length : images.filter((i:any)=>i.category.nametag === category.nametag).length
              }
            </Badge>
          </Button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          {/* <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Bộ lọc
          </Button> */}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Images Grid */}
      <div
        className={
          viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
        }
      >
        {filteredImages.map((image:any) => (
          <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="relative">
              
              <Image src={image.thumbnail || "/public/placeholder.svg"} alt="" className="w-full min-h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                {image.views}
              </div>
              <Badge className="absolute top-2 left-2">{image.category.name}</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-sm line-clamp-2 mb-2">{image.title}</h3>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                {image.date}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Xem thêm hình ảnh
        </Button>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { imagesService } from "@/services/images.service"
import { Image } from 'antd';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import dynamic from 'next/dynamic';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});


export default function FeaturedImages() {
  const [currentImageSet, setCurrentImageSet] = useState(0)
  const carouselRef = useRef<any>(null)


  const [imageSets, setImageSets] = useState<any>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await imagesService.getImages()
    if (res.statusCode === 200) {
      setImageSets(res.data)
    }
  }
const options = {
  loop: true,
  margin: 10,
  items: imageSets.length,
  autoplay: true,
  autoplayTimeout:2000

};
  const nextImageSet = () => {
     if (currentImageSet > 0) setCurrentImageSet(currentImageSet - 1)
    setCurrentImageSet((prev) => (prev + 1) % imageSets.length)
  }
  const itemsPerPage = 2;
  const totalPages = Math.ceil(imageSets.length / itemsPerPage);
  const prevImageSet = () => {
     if (currentImageSet < 0) setCurrentImageSet(currentImageSet + 1)
    setCurrentImageSet((prev) => (prev - 1 + imageSets.length) % imageSets.length)
  }

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-red-600 pb-2">Hình ảnh nổi bật</h2>
        {/* <div className="flex space-x-2">
          <Button variant="outline" size="icon" className="owl-prev">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="owl-next">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div> */}
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {imageSets.length > 0 && imageSets.filter((dt: any, index: number) => {
          return currentImageSet * 4 <= index && index < (currentImageSet + 1) * 4
        }
        ).map((image: any, index: number) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group relative">
            <div className="flex justify-center">
              <Image src={image.thumbnail || "/public/placeholder.svg"}
                alt=""
                width={450}
                height={228}
                className=" object-cover"
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
            </div>
            <CardContent className="p-3">
              <h4 className="font-medium text-sm line-clamp-2 text-gray-800">{image.title}</h4>
            </CardContent>
          </Card>
        ))}
      </div> */}
      <div className="w-screen lg:w-auto overflow-hidden">
<div className=" w-[1016px]">
<OwlCarousel className="owl-theme" {...options} >
        {imageSets.length > 0 && imageSets.map((image: any, index: number) => (
            <Card key={index} className="w-full item overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group relative">
            <div className="flex justify-center">
              <Image src={image.thumbnail || "/public/placeholder.svg"}
                alt=""
                width={450}
                height={228}
                className=" object-cover"
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
            </div>
            <CardContent className="p-3">
              <h4 className="font-medium text-sm line-clamp-2 text-gray-800">{image.title}</h4>
            </CardContent>
          </Card>
       
          
        ))}
      </OwlCarousel>
      </div>
      </div>
      
      
    </section>
  )
}

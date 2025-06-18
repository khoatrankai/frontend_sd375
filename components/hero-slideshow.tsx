"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/public/placeholder.svg?height=400&width=800",
      title: "Sư đoàn phòng không 375 - Bảo vệ vững chắc vùng trời Tổ quốc",
      description: "Đơn vị anh hùng với truyền thống vẻ vang trong sự nghiệp bảo vệ Tổ quốc",
    },
    {
      image: "/public/placeholder.svg?height=400&width=800",
      title: "Diễn tập phòng thủ khu vực năm 2024",
      description: "Nâng cao khả năng sẵn sàng chiến đấu, bảo vệ vùng trời quan trọng",
    },
    {
      image: "/public/placeholder.svg?height=400&width=800",
      title: "Thi đua quyết thắng - Xây dựng đơn vị vững mạnh toàn diện",
      description: "Phát huy truyền thống, đoàn kết, kỷ luật, sáng tạo trong công tác",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={slide.image || "/public/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
              <p className="text-lg">{slide.description}</p>
            </div>
          </div>
        </div>
      ))}

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4 text-white" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4 text-white" />
      </Button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Menu, X, Search, Phone, Mail, MapPin, ExternalLink, Play } from "lucide-react"

interface ImprovedLayoutProps {
  children: React.ReactNode
}

export default function ImprovedLayout({ children }: ImprovedLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true)
      } else {
        setSidebarCollapsed(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const quickLinks = ["Bộ Quốc phòng", "Quân khu 7", "Báo Quân đội nhân dân"]
  const newsItems = ["Hội nghị tổng kết công tác năm 2024", "Diễn tập phòng thủ khu vực", "Thi đua quyết thắng 2024"]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <header className="bg-gradient-to-r from-red-700 to-red-800 text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Shield className="h-10 w-10 text-yellow-400" />
              <div>
                <h1 className="text-xl font-bold">SƯ ĐOÀN PHÒNG KHÔNG 375</h1>
                <p className="text-xs text-red-100 hidden sm:block">Cổng thông tin điện tử</p>
              </div>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-red-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* Desktop quick info */}
            <div className="hidden lg:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>777322</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>banthongtin.f375@mail.bqp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-red-800 border-t border-red-600">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              <Link href="/" className="block py-2 hover:text-yellow-400">
                Trang chủ
              </Link>
              <Link href="/gioi-thieu" className="block py-2 hover:text-yellow-400">
                Giới thiệu
              </Link>
              <Link href="/tin-tuc" className="block py-2 hover:text-yellow-400">
                Tin tức
              </Link>
              <Link href="/thu-vien" className="block py-2 hover:text-yellow-400">
                Thư viện
              </Link>
              <Link href="/chuyen-de" className="block py-2 hover:text-yellow-400">
                Chuyên đề
              </Link>
              <Link href="/van-ban-tai-lieu" className="block py-2 hover:text-yellow-400">
                Văn bản - Tài liệu
              </Link>
              <Link href="/admin/login" className="block py-2 hover:text-yellow-400">
                Đăng nhập
              </Link>
            </nav>
          </div>
        )}
      </header>

      <div className="flex">
        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "lg:mr-0" : "lg:mr-80"}`}>
          <div className="p-4 lg:p-6">{children}</div>
        </main>

        {/* Enhanced Sidebar */}
        <aside
          className={`fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 bg-white shadow-lg transform transition-transform duration-300 z-30 overflow-y-auto ${
            sidebarCollapsed ? "translate-x-full lg:translate-x-0" : "translate-x-0"
          }`}
        >
          <div className="p-4 space-y-6">
            {/* Sidebar Toggle */}
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Thông tin</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="lg:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Search */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Tìm kiếm</h4>
                <div className="flex space-x-2">
                  <Input placeholder="Nhập từ khóa..." className="flex-1" />
                  <Button size="icon" variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick News */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Tin nhanh</h4>
                <div className="space-y-3">
                  {newsItems.map((item, index) => (
                    <div
                      key={index}
                      className="p-2 bg-gray-50 rounded text-sm hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      <p className="line-clamp-2">{item}</p>
                      <span className="text-xs text-gray-500">2 giờ trước</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Liên kết nhanh</h4>
                <div className="space-y-2">
                  {quickLinks.map((link, index) => (
                    <a
                      key={index}
                      href="#"
                      className="flex items-center justify-between text-sm text-blue-600 hover:bg-blue-50 p-2 rounded transition-colors"
                    >
                      <span>{link}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Hình ảnh</h4>
                <div className="relative">
                  <img
                    src="/public/placeholder.svg?height=150&width=250"
                    alt="Hoạt động Sư đoàn"
                    className="w-full h-32 object-cover rounded"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 rounded-b">
                    <p className="text-white text-xs">Diễn tập phòng thủ khu vực 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Audio Player */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Audio</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <Play className="h-3 w-3" />
                    </Button>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">Quốc ca Việt Nam</p>
                      <p className="text-xs text-gray-500">03:45</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Liên hệ</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-red-600" />
                    <span>Trạm CNTT F375</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-green-600" />
                    <span>777322</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="truncate">banthongtin.f375@mail.bqp</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>

      {/* Sidebar Toggle Button for Desktop */}
      <Button
        variant="outline"
        size="icon"
        className={`fixed right-4 top-20 z-40 hidden lg:flex transition-all duration-300 ${
          sidebarCollapsed ? "translate-x-0" : "translate-x-[-320px]"
        }`}
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
      >
        <Menu className="h-4 w-4" />
      </Button>
    </div>
  )
}

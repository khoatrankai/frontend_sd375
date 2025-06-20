"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, Info, Newspaper, Library, BookOpen, FileText, LogIn, ChevronDown, Menu, X } from "lucide-react"

export default function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const isActive = (path: string) => pathname === path || pathname.startsWith(path)

  const menuItems = [
    {
      id: "home",
      label: "Trang chủ",
      href: "/",
      icon: Home,
    },
    {
      id: "about",
      label: "Giới thiệu",
      icon: Info,
      submenu: [
        { label: "Giới thiệu về Sư đoàn", href: "/gioi-thieu" },
        { label: "Lịch sử chiến đấu BVVT", href: "/gioi-thieu/lich-su" },
        { label: "Các phần thưởng cao quý", href: "/gioi-thieu/phan-thuong" },
        { label: "Lãnh đạo - Chỉ huy", href: "/gioi-thieu/lanh-dao" },
        { label: "Liên hệ - Góp ý", href: "/gioi-thieu/lien-he" },
      ],
    },
    {
      id: "news",
      label: "Tin tức",
      icon: Newspaper,
      submenu: [
        { label: "Tất cả tin tức", href: "/tin-tuc" },
        { label: "Tin tức trong nước", href: "/tin-tuc/trong-nuoc" },
        { label: "Tin tức quốc tế", href: "/tin-tuc/quoc-te" },
        { label: "Tin tức quân sự", href: "/tin-tuc/quan-su" },
        { label: "Hoạt động Sư đoàn", href: "/tin-tuc/su-doan" },
      ],
    },
    {
      id: "library",
      label: "Thư viện",
      icon: Library,
      submenu: [
        { label: "Tất cả", href: "/thu-vien" },
        { label: "Hình ảnh", href: "/thu-vien/hinh-anh" },
        { label: "Video", href: "/thu-vien/video" },
        { label: "Audio", href: "/thu-vien/audio" },
        { label: "Phần mềm", href: "/thu-vien/phan-mem" },
      ],
    },
    {
      id: "topics",
      label: "Chuyên đề",
      icon: BookOpen,
      submenu: [
        { label: "Tất cả chuyên đề", href: "/chuyen-de" },
        { label: "CCHC và chuyển đổi số", href: "/chuyen-de/cchc" },
        { label: "Thông tin tuyên truyền", href: "/chuyen-de/tuyen-truyen" },
        { label: "Thông tin Pháp luật", href: "/chuyen-de/phap-luat" },
        { label: "Thông tin KHQS", href: "/chuyen-de/khqs" },
      ],
    },
    {
      id: "documents",
      label: "Văn bản - Tài liệu",
      href: "/van-ban-tai-lieu",
      icon: FileText,
    },
  ]

  const handleDropdownToggle = (itemId: string) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId)
  }

  return (
    <nav className="bg-gradient-to-r from-green-700 via-green-600 to-green-700 text-white shadow-xl relative z-30">
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {menuItems.map((item) => (
              <div key={item.id} className="relative group">
                {item.submenu ? (
                  <div className="relative">
                    <button
                      className={`flex items-center space-x-2 px-4 bg-transparent py-4 hover:bg-green-600 transition-all duration-200 rounded-t-lg ${
                        isActive(item.submenu[0]?.href || "") ? "bg-green-600 text-yellow-300" : ""
                      }`}
                      onMouseEnter={() => setActiveDropdown(item.id)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="font-medium">{item.label}</span>
                      <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                    </button>

                    {/* Dropdown Menu */}
                    <div
                      className={`absolute top-full left-0 w-64 bg-white shadow-2xl rounded-b-lg rounded-tr-lg border-t-2 border-green-500 transform transition-all duration-200 ${
                        activeDropdown === item.id
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                      onMouseEnter={() => setActiveDropdown(item.id)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {item.submenu.map((subItem, index) => (
                        <Link
                          key={index}
                          href={subItem.href}
                          className={`block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors border-b border-gray-100 last:border-b-0 ${
                            isActive(subItem.href) ? "bg-green-50 text-green-700 font-medium" : ""
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    className={`flex items-center space-x-2 px-4 py-4 hover:bg-green-600 transition-all duration-200 rounded-lg ${
                      isActive(item.href!) ? "bg-green-600 text-yellow-300" : ""
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Login Button */}
          <Link
            href="/admin/login"
            className="flex items-center space-x-2 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <LogIn className="h-4 w-4" />
            <span className="font-medium">Đăng nhập</span>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span className="font-bold">Menu</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white hover:bg-green-600"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-green-800 shadow-2xl border-t border-green-600 z-50">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {menuItems.map((item) => (
                <div key={item.id}>
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => handleDropdownToggle(item.id)}
                        className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-green-700 rounded-lg transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${activeDropdown === item.id ? "rotate-180" : ""}`}
                        />
                      </button>
                      {activeDropdown === item.id && (
                        <div className="ml-6 mt-2 space-y-1">
                          {item.submenu.map((subItem, index) => (
                            <Link
                              key={index}
                              href={subItem.href}
                              className={`block px-4 py-2 text-sm hover:bg-green-700 rounded transition-colors ${
                                isActive(subItem.href) ? "bg-green-700 text-yellow-300" : ""
                              }`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href!}
                      className={`flex items-center space-x-2 px-4 py-3 hover:bg-green-700 rounded-lg transition-colors ${
                        isActive(item.href!) ? "bg-green-700 text-yellow-300" : ""
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              ))}

              <Link
                href="/admin/login"
                className="flex items-center space-x-2 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogIn className="h-4 w-4" />
                <span>Đăng nhập</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

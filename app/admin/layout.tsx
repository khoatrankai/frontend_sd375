"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Home, FileText, ImageIcon, Users, Settings, LogOut, Menu, X, Info } from "lucide-react"
import { usePathname } from "next/navigation"
import { authService } from "@/services/auth.service"
import { userTypes } from "../gioi-thieu/lanh-dao/page"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dataProfile,setDataProfile] = useState<any>()
  const pathname = usePathname();
  const menuItems = [
    { href: "/admin/dashboard", icon: Home, label: "Tổng quan" },
    { href: "/admin/introduce", icon: Info, label: "Góp ý" },
    { href: "/admin/posts", icon: FileText, label: "Bảng tin" },
    { href: "/admin/media", icon: ImageIcon, label: "Thư viện" },
    { href: "/admin/topic", icon: ImageIcon, label: "Chuyên đề" },
    { href: "/admin/documents", icon: FileText, label: "Văn bản" },
    { href: "/admin/users", icon: Users, label: "Người dùng" },
    // { href: "/admin/settings", icon: Settings, label: "Cài đặt" },
  ]
  const checkLogin = async()=>{
    const dataUser = await authService.getCurrentUser()
    // console.log(dataUser,pathname.startsWith('/admin/login'),pathname)
    setDataProfile(dataUser)
    if(!dataUser){
      if(!pathname.startsWith('/admin/login')){
        window.location.href = "/admin/login"
      }
    }
    // if(!pathname.startsWith('/admin/login')){
    //   // window.location.href = "/admin/login"
    // }
    // else{
    //   if(pathname.startsWith('/admin/login')){
    //     window.location.href = "/admin/dashboard"
    //   }
    // }
  }
  useEffect(()=>{
    checkLogin()
  },[])

  const logoutUser = async()=>{
     const res = await authService.logout() as any
     if(res?.success){
      window.location.href = "/admin/login"
     }
  }

  return (
    <>
      {
        pathname.startsWith('/admin/login') ?<>
      {
        children
      }  
        
      </>:
<div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center space-x-2">
            {
              dataProfile? <img src={dataProfile?.avatar} className="h-8 w-8 rounded-full object-cover"/> : <Shield className="h-8 w-8 text-red-600" />
            }
            
            <div className="flex flex-col">
            <span>{dataProfile ? `${userTypes.find(dt => dt.value === dataProfile?.type)?.name}`:'' }</span>
            <span className="font-bold text-gray-800">{dataProfile ? `${dataProfile?.name}`:'Admin F375' } </span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (confirm("Bạn có chắc muốn đăng xuất?")) {
                logoutUser()
              }
            }}
            className="w-full flex items-center justify-center border rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Đăng xuất
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-sm border-b px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {children}
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
      }
    </>
    
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Navigation from "@/components/navigation"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import LayoutHeader from "./LayoutPage"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sư đoàn phòng không 375 - Cổng thông tin điện tử",
  description: "Cổng thông tin điện tử chính thức của Sư đoàn phòng không 375",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
       <LayoutHeader>
        {children}
       </LayoutHeader>
      </body>
    </html>
  )
}

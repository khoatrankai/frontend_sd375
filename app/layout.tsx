import type React from "react"
import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import localFont from "next/font/local"  
// import "./globals.css"
import Header from "@/components/header"
import Navigation from "@/components/navigation"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import LayoutHeader from "./LayoutPage"

// const inter = Inter({ subsets: ["latin"] })
// const inter = localFont({
//   src: "../public/fonts/inter/Inter-Regular.woff2",  // đường dẫn đến file font
//   display: "swap",
//   variable: "--font-inter",
// })

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
      <head>
        <link rel="stylesheet" href="/build.css" />
      </head>
      <body>
       <LayoutHeader>
        {children}
       </LayoutHeader>
      </body>
    </html>
  )
}

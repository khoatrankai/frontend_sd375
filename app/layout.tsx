import type React from "react"
import type { Metadata } from "next"
// import { Inter } from "next/font/google"
import localFont from "next/font/local"  
import "./globals.css"
// import Header from "@/components/header"
// import Navigation from "@/components/navigation"
// import Sidebar from "@/components/sidebar"
// import Footer from "@/components/footer"
import LayoutHeader from "./LayoutPage"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
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
      {/* <head>
        <link rel="stylesheet" href="/build.css" />
      </head> */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}>
       <LayoutHeader>
        {children}
       </LayoutHeader>
      </body>
    </html>
  )
}

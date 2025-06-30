"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Navigation from "@/components/navigation";
import Sidebar from "@/components/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import './styles.scss'
// import ImageDownloaderAdvanced from "@/components/image-download";

export default function LayoutHeader({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();
  
  return (
    <>
      {/* max-w-[calc(100%-13rem)] */}
      {( !pathname.startsWith('/admin/')) ?<>
      <div className="flex justify-center">
        <div className="bg_header p-2">
          <div className="max-w-[1368px] min-h-screen bg-white rounded-sm">
             {/* <ImageDownloaderAdvanced imageUrl={'http://localhost:3003/public/images?id=6e6d3c70-83f2-4311-8a48-b869631fc4c9.png'} imageName="my-advanced-image.jpg" /> */}
          {/* <button onClick={downloadImage}>Tải ảnh</button> */}
                <Header />
                <Navigation />
                <div className="flex justify-center w-full">
                  <div className="flex flex-col lg:flex-row w-full">
                  <main className="flex-1 p-4 min-h-[calc(100vh-200px)]">{children}</main>
                  <div className="lg:w-80 lg:flex-shrink-0">
                    <Sidebar />
                  </div>
                </div>
                </div>
                
                <Footer />
        </div>
        </div>
        
                
              </div>
      </>:<>
        {children}
      </>}
      
    </>
  );
}
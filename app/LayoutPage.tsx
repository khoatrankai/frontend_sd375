"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Navigation from "@/components/navigation";
import Sidebar from "@/components/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LayoutHeader({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();
  
  return (
    <>
      {/* max-w-[calc(100%-13rem)] */}
      {( !pathname.startsWith('/admin/')) ?<>
      <div className="min-h-screen border-4 border-red-600 bg-white">
                <Header />
                <Navigation />
                <div className="flex flex-col lg:flex-row">
                  <main className="flex-1 p-4 lg:p-6 min-h-[calc(100vh-200px)]">{children}</main>
                  <div className="lg:w-80 lg:flex-shrink-0">
                    <Sidebar />
                  </div>
                </div>
                <Footer />
              </div>
      </>:<>
        {children}
      </>}
      
    </>
  );
}
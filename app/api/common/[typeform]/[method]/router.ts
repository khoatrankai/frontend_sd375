import { apiClient } from "@/lib/api"
import { useParams } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const {typeform,method} = useParams()
    
  try {
    if(typeform == "true"){
      const {link} = await request.json()
      const formData = await request.formData()
      if(method === "post"){
        const res = await apiClient.upload(link as string, formData)
        return res
      }
      if(method === "put"){
        const res = await apiClient.uploadPut(link as string, formData)
        return res
      }
      if(method === "patch"){
        const res = await apiClient.uploadPatch(link as string, formData)
        return res
      }
    }else{
      const {link,data} = await request.json()
      if(method === "getW"){
        const res = await apiClient.get(link as string)
        return res
      }
      if(method === "post"){
        const res = await apiClient.post(link as string, data)
        return res
      }
      if(method === "put"){
        const res = await apiClient.put(link as string, data)
        return res
      }
      if(method === "patch"){
        const res = await apiClient.uploadPatch(link as string, data)
        return res
      }
    }

    // Validate credentials
    
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Lỗi server. Vui lòng thử lại.",
      },
      { status: 500 },
    )
  }
}
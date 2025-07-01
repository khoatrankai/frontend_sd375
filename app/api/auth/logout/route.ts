import { apiLogin } from "@/lib/apiLogin"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // In a real application, you might want to blacklist the token
    // or perform other cleanup operations
    apiLogin.removeToken()
    return NextResponse.json({
      success: true,
      message: "Đăng xuất thành công",
    })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Lỗi server. Vui lòng thử lại.",
      },
      { status: 500 },
    )
  }
}

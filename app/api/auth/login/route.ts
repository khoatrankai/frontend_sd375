import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Mock user data - in production, this would come from a database
const ADMIN_USER = {
  id: 1,
  name: "Quản trị viên",
  email: "admin@f375.mil.vn",
  phone: "777322",
  role: "admin" as const,
  roleName: "Quản trị viên",
  status: "active" as const,
  statusName: "Hoạt động",
  unit: "Chỉ huy sư đoàn",
  lastLogin: new Date().toLocaleDateString("vi-VN"),
  avatar: "/public/placeholder.svg?height=40&width=40",
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Validate credentials
    if (username === "admin" && password === "admin123") {
      // Generate JWT token
      const token = jwt.sign(
        {
          userId: ADMIN_USER.id,
          username: username,
          role: ADMIN_USER.role,
        },
        JWT_SECRET,
        { expiresIn: "24h" },
      )

      return NextResponse.json({
        success: true,
        message: "Đăng nhập thành công",
        user: ADMIN_USER,
        token: token,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Tên đăng nhập hoặc mật khẩu không đúng",
        },
        { status: 401 },
      )
    }
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

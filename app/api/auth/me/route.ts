import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { usersService } from "@/services/users.service"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

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

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          success: false,
          message: "Token không hợp lệ",
        },
        { status: 401 },
      )
    }

    const token = authHeader.substring(7)

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any
      const res = await usersService.getUser(decoded?.userId)
      const dataUser = res?.data
      return NextResponse.json({
        success: true,
        data: dataUser,
      })
    } catch (jwtError) {
      return NextResponse.json(
        {
          success: false,
          message: "Token đã hết hạn",
        },
        { status: 401 },
      )
    }
  } catch (error) {
    console.error("Get current user error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Lỗi server. Vui lòng thử lại.",
      },
      { status: 500 },
    )
  }
}

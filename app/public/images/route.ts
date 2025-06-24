import { type NextRequest, NextResponse } from "next/server"

// Cách đúng để nhận tham số [link] từ URL
export async function GET(
  request: NextRequest
) {
  // const { link } = params
  const id = request.nextUrl.searchParams.get("id")
  try {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_API_CLIENT}/public/images/${id}`
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Lỗi server. Vui lòng thử lại.",
      },
      { status: 500 }
    )
  }
}

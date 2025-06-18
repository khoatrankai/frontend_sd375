import { type NextRequest, NextResponse } from "next/server"

// Mock media files data
const mockMediaFiles = [
  {
    id: 1,
    name: "hero-image-1.jpg",
    originalName: "hero-image-1.jpg",
    type: "image" as const,
    mimeType: "image/jpeg",
    size: 2048576,
    url: "/placeholder.svg?height=300&width=400",
    uploadedAt: "2024-12-15T10:00:00Z",
    uploadedBy: "Quản trị viên",
    description: "Hình ảnh chính của website",
  },
  {
    id: 2,
    name: "training-video.mp4",
    originalName: "training-video.mp4",
    type: "video" as const,
    mimeType: "video/mp4",
    size: 52428800,
    url: "/placeholder-video.mp4",
    uploadedAt: "2024-12-14T15:30:00Z",
    uploadedBy: "Biên tập viên",
    description: "Video huấn luyện",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const type = searchParams.get("type") || ""

    let filteredFiles = mockMediaFiles

    if (type && type !== "all") {
      filteredFiles = filteredFiles.filter((file) => file.type === type)
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedFiles = filteredFiles.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: {
        files: paginatedFiles,
        total: filteredFiles.length,
        page,
        limit,
      },
    })
  } catch (error) {
    console.error("Get media files error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Lỗi server. Vui lòng thử lại.",
      },
      { status: 500 },
    )
  }
}

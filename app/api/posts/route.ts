import { type NextRequest, NextResponse } from "next/server"

// Mock posts data
const mockPosts = [
  {
    id: 1,
    title: "Hội nghị tổng kết công tác năm 2024",
    content: "Nội dung chi tiết về hội nghị tổng kết...",
    excerpt: "Sư đoàn tổ chức hội nghị tổng kết công tác năm 2024",
    category: "su-doan",
    status: "published" as const,
    author: "Đại tá Nguyễn Văn A",
    authorId: 1,
    publishedAt: "2024-12-15T10:00:00Z",
    updatedAt: "2024-12-15T10:00:00Z",
    views: 245,
    featured: true,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["hội nghị", "tổng kết", "2024"],
  },
  {
    id: 2,
    title: "Diễn tập phòng không tháng 12",
    content: "Chi tiết về cuộc diễn tập phòng không...",
    excerpt: "Diễn tập phòng không quy mô lớn",
    category: "quan-su",
    status: "published" as const,
    author: "Trung tá Trần Văn B",
    authorId: 2,
    publishedAt: "2024-12-14T08:30:00Z",
    updatedAt: "2024-12-14T08:30:00Z",
    views: 189,
    featured: false,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["diễn tập", "phòng không"],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category") || ""
    const status = searchParams.get("status") || ""

    let filteredPosts = mockPosts

    // Apply filters
    if (search) {
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.content.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (category && category !== "all") {
      filteredPosts = filteredPosts.filter((post) => post.category === category)
    }

    if (status && status !== "all") {
      filteredPosts = filteredPosts.filter((post) => post.status === status)
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: {
        posts: paginatedPosts,
        total: filteredPosts.length,
        page,
        limit,
      },
    })
  } catch (error) {
    console.error("Get posts error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Lỗi server. Vui lòng thử lại.",
      },
      { status: 500 },
    )
  }
}

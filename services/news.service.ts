import { apiClient } from "@/lib/api"
import type { Post, PostsResponse, PaginationParams, ApiResponse } from "@/lib/types"
import { toast } from "react-toastify"

export class NewsService {
  async getPosts(params?: PaginationParams) {
    try {
      const response = await apiClient.get<any>("/news", params)
      return response || { posts: [], total: 0, page: 1, limit: 10 }
    } catch (error) {
      console.error("Get posts error:", error)
      return { posts: [], total: 0, page: 1, limit: 10 }
    }
  }

  async getCategoriesNew(params?: PaginationParams) {
    try {
      const response = await apiClient.get<any>("/news/categories", params)
      return response || { posts: [], total: 0, page: 1, limit: 10 }
    } catch (error) {
      console.error("Get posts error:", error)
      return { posts: [], total: 0, page: 1, limit: 10 }
    }
  }

  async getCategoryActivity(params?: PaginationParams) {
    try {
      const response = await apiClient.get<any>("/news/category-activity", params)
      return response || { posts: [], total: 0, page: 1, limit: 10 }
    } catch (error) {
      console.error("Get posts error:", error)
      return { posts: [], total: 0, page: 1, limit: 10 }
    }
  }

  async getCategories() {
    try {
      const response = await apiClient.get<any>("/news/categories")
      return response || { posts: [], total: 0, page: 1, limit: 10 }
    } catch (error) {
      console.error("Get posts error:", error)
      return { posts: [], total: 0, page: 1, limit: 10 }
    }
  }

  async getRegion() {
    try {
      const response = await apiClient.get<any>("/news/region")
      return response || { posts: [], total: 0, page: 1, limit: 10 }
    } catch (error) {
      console.error("Get posts error:", error)
      return { posts: [], total: 0, page: 1, limit: 10 }
    }
  }

  async getNews() {
    try {
      const response = await apiClient.get<any>("/news")
      return response || { posts: [], total: 0, page: 1, limit: 10 }
    } catch (error) {
      console.error("Get posts error:", error)
      return { posts: [], total: 0, page: 1, limit: 10 }
    }
  }

  async getNewsByID(id: string) {
    try {
      const response = await apiClient.get<any>(`/news/${id}`)
      return response || { posts: [], total: 0, page: 1, limit: 10 }
    } catch (error) {
      console.error("Get posts error:", error)
      return { posts: [], total: 0, page: 1, limit: 10 }
    }
  }

  async getcategoriesActivity() {
    try {
      const response = await apiClient.get<any>("/news/category-activity")
      return response || { posts: [], total: 0, page: 1, limit: 10 }
    } catch (error) {
      console.error("Get posts error:", error)
      return { posts: [], total: 0, page: 1, limit: 10 }
    }
  }

  async createPost(post: Omit<Post, "id" | "publishedAt" | "updatedAt" | "views">) {
    const toastId = toast.loading("Đang tạo bài viết...")
    console.log("vao day")
    // try {
    //   const response = await apiClient.post<any>("/news", post)
    //   toast.update(toastId, {
    //     render: "Tạo bài viết thành công!",
    //     type: "success",
    //     isLoading: false,
    //     autoClose: 3000
    //   })
    //   return response || null
    // } catch (error) {
    //   console.error("Create post error:", error)
    //   toast.update(toastId, {
    //     render: "Tạo bài viết thất bại!",
    //     type: "error",
    //     isLoading: false,
    //     autoClose: 3000
    //   })
    //   return null
    // }
  }

  async updatePost(id: string, post: any) {
    const toastId = toast.loading("Đang cập nhật bài viết...")
    try {
      const response = await apiClient.put<any>(`/news/${id}`, post)
      toast.update(toastId, {
        render: "Cập nhật thành công!",
        type: "success",
        isLoading: false,
        autoClose: 3000
      })
      return response || null
    } catch (error) {
      console.error("Update post error:", error)
      toast.update(toastId, {
        render: "Cập nhật thất bại!",
        type: "error",
        isLoading: false,
        autoClose: 3000
      })
      return null
    }
  }

  async deletePost(id: string) {
    const toastId = toast.loading("Đang xóa bài viết...")
    try {
      const response = await apiClient.delete<any>(`/news/${id}`)
      if (response.statusCode === 200) {
        toast.update(toastId, {
          render: "Xóa thành công!",
          type: "success",
          isLoading: false,
          autoClose: 3000
        })
      } else {
        toast.update(toastId, {
          render: "Xóa thất bại!",
          type: "error",
          isLoading: false,
          autoClose: 3000
        })
      }
      return response.success
    } catch (error) {
      console.error("Delete post error:", error)
      toast.update(toastId, {
        render: "Xảy ra lỗi khi xóa!",
        type: "error",
        isLoading: false,
        autoClose: 3000
      })
      return false
    }
  }

  async getFeaturedPosts() {
    try {
      const response = await apiClient.get<ApiResponse<Post[]>>("/news/featured")
      return response || []
    } catch (error) {
      console.error("Get featured posts error:", error)
      return []
    }
  }

  async getPostsByCategory(category: string, params?: PaginationParams) {
    try {
      const response = await apiClient.get<ApiResponse<PostsResponse>>(`/news/category/${category}`, params)
      return response || { posts: [], total: 0, page: 1, limit: 10 }
    } catch (error) {
      console.error("Get posts by category error:", error)
      return { posts: [], total: 0, page: 1, limit: 10 }
    }
  }
}

export const newsService = new NewsService()

import { apiClient } from "@/lib/api"
import type { Post, PostsResponse, PaginationParams, ApiResponse } from "@/lib/types"
import { toast } from "react-toastify"

export class ArticlesService {
  async getArticles(params?: PaginationParams) {
    try {
      const response = await apiClient.get<any>("/articles", params)
      return response || { posts: [], total: 0, page: 1, limit: 10 }
    } catch (error) {
      console.error("Get articles error:", error)
      return { posts: [], total: 0, page: 1, limit: 10 }
    }
  }

  async getArticle(id: string) {
    try {
      const response = await apiClient.get<any>(`/articles/${id}`)
      return response || null
    } catch (error) {
      console.error("Get article error:", error)
      return null
    }
  }

  async createArticle(data: any) {
    const toastId = toast.loading("Đang tạo bài viết...")
    try {
      const response = await apiClient.post<any>("/articles", data)
      if (response?.statusCode === 201) {
        toast.update(toastId, {
          render: response?.message || "Tạo thành công",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        })
      } else {
        toast.update(toastId, {
          render: "Tạo thất bại",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        })
      }
      return response || null
    } catch (error) {
      console.error("Create article error:", error)
      toast.update(toastId, {
        render: "Đã xảy ra lỗi khi tạo bài viết",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      })
      return null
    }
  }

  async updateArticle(id: string, data: any) {
    const toastId = toast.loading("Đang cập nhật bài viết...")
    try {
      const response = await apiClient.patch<any>(`/articles/${id}`, data)
      if (response?.statusCode === 200) {
        toast.update(toastId, {
          render: response?.message || "Cập nhật thành công",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        })
      } else {
        toast.update(toastId, {
          render: "Cập nhật thất bại",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        })
      }
      return response || null
    } catch (error) {
      console.error("Update article error:", error)
      toast.update(toastId, {
        render: "Đã xảy ra lỗi khi cập nhật",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      })
      return null
    }
  }

  async deleteArticle(id: string) {
    const toastId = toast.loading("Đang xóa bài viết...")
    try {
      const response = await apiClient.delete<any>(`/articles/${id}`)
      if (response?.statusCode === 200) {
        toast.update(toastId, {
          render: "Xóa thành công",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        })
        return true
      } else {
        toast.update(toastId, {
          render: "Xóa thất bại",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        })
        return false
      }
    } catch (error) {
      console.error("Delete article error:", error)
      toast.update(toastId, {
        render: "Đã xảy ra lỗi khi xóa bài viết",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      })
      return false
    }
  }

  async createCategory(category: { name: string, nametag: string }) {
    const toastId = toast.loading("Đang tạo chuyên mục...")
    try {
      const response = await apiClient.post<any>(`/articles/categories`, category)
      if (response?.statusCode === 201) {
        toast.update(toastId, {
          render: response?.message || "Tạo chuyên mục thành công",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        })
      } else {
        toast.update(toastId, {
          render: "Tạo chuyên mục thất bại",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        })
      }
      return response || null
    } catch (error) {
      console.error("Create category error:", error)
      toast.update(toastId, {
        render: "Đã xảy ra lỗi khi tạo chuyên mục",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      })
      return null
    }
  }

  // Các hàm GET khác giữ nguyên như bạn đã làm
  async incrementViews(id: string) {
    try {
      const response = await apiClient.patch<any>(`/articles/${id}/views`)
      return response || null
    } catch (error) {
      console.error("Increment views error:", error)
      return null
    }
  }

  async getArticlesByCategory(categoryId: string) {
    try {
      const response = await apiClient.get<ApiResponse<Post[]>>(`/articles/category/${categoryId}`)
      return response || []
    } catch (error) {
      console.error("Get articles by category error:", error)
      return []
    }
  }

  async getArticlesByType(type: string) {
    try {
      const response = await apiClient.get<ApiResponse<Post[]>>(`/articles?type=${type}`)
      return response || []
    } catch (error) {
      console.error("Get articles by type error:", error)
      return []
    }
  }

  async getFeaturedArticles() {
    try {
      const response = await apiClient.get<ApiResponse<Post[]>>(`/articles?featured=true`)
      return response || []
    } catch (error) {
      console.error("Get featured articles error:", error)
      return []
    }
  }

  async getCategories() {
    try {
      const response = await apiClient.get<any>(`/articles/categories`)
      return response || []
    } catch (error) {
      console.error("Get categories error:", error)
      return []
    }
  }
}

export const articlesService = new ArticlesService()

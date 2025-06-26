import { apiClient } from "@/lib/api"
import type { Post, PostsResponse, PaginationParams, ApiResponse } from "@/lib/types"

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

  async createArticle(data:any) {
    try {
      const response = await apiClient.post<any>("/articles", data)
      return response || null
    } catch (error) {
      console.error("Create article error:", error)
      return null
    }
  }

  async updateArticle(id: string, data:any) {
    try {
      const response = await apiClient.patch<any>(`/articles/${id}`, data)
      return response || null
    } catch (error) {
      console.error("Update article error:", error)
      return null
    }
  }

  async deleteArticle(id: string) {
    try {
      const response = await apiClient.delete<any>(`/articles/${id}`)
      return response?.statusCode === 200
    } catch (error) {
      console.error("Delete article error:", error)
      return false
    }
  }

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

  async createCategory(category: { name: string,nametag:string }) {
    try {
      const response = await apiClient.post<any>(`/articles/categories`, category)
      return response || null
    } catch (error) {
      console.error("Create category error:", error)
      return null
    }
  }
}

export const articlesService = new ArticlesService()

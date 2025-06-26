import { apiClient } from "@/lib/api"
import type { Post, PostsResponse, PaginationParams, ApiResponse } from "@/lib/types"

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

  async getPost(id: number){
    try {
      const response = await apiClient.get<any>(`/news/${id}`)
      return response || null
    } catch (error) {
      console.error("Get post error:", error)
      return null
    }
  }

  async createPost(post: Omit<Post, "id" | "publishedAt" | "updatedAt" | "views">) {
    try {
      const response = await apiClient.post<any>("/news", post)
      return response || null
    } catch (error) {
      console.error("Create post error:", error)
      return null
    }
  }

  async updatePost(id: number, post: Partial<Post>){
    try {
      const response = await apiClient.put<any>(`/news/${id}`, post)
      return response || null
    } catch (error) {
      console.error("Update post error:", error)
      return null
    }
  }

  async deletePost(id: number) {
    try {
      const response = await apiClient.delete<ApiResponse>(`/news/${id}`)
      return response.success
    } catch (error) {
      console.error("Delete post error:", error)
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

  async getPostsByCategory(category: string, params?: PaginationParams){
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

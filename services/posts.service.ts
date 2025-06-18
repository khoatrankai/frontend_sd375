import { apiClient } from "@/lib/api"
import type { Post, PostsResponse, PaginationParams, ApiResponse } from "@/lib/types"

export class PostsService {
  async getPosts(params?: PaginationParams): Promise<PostsResponse> {
    try {
      const response = await apiClient.get<ApiResponse<PostsResponse>>("/news", params)
      return response.data || { posts: [], total: 0, page: 1, limit: 10 }
    } catch (error) {
      console.error("Get posts error:", error)
      return { posts: [], total: 0, page: 1, limit: 10 }
    }
  }

  async getPost(id: number): Promise<Post | null> {
    try {
      const response = await apiClient.get<ApiResponse<Post>>(`/news/${id}`)
      return response.data || null
    } catch (error) {
      console.error("Get post error:", error)
      return null
    }
  }

  async createPost(post: Omit<Post, "id" | "publishedAt" | "updatedAt" | "views">): Promise<Post | null> {
    try {
      const response = await apiClient.post<ApiResponse<Post>>("/news", post)
      return response.data || null
    } catch (error) {
      console.error("Create post error:", error)
      return null
    }
  }

  async updatePost(id: number, post: Partial<Post>): Promise<Post | null> {
    try {
      const response = await apiClient.put<ApiResponse<Post>>(`/news/${id}`, post)
      return response.data || null
    } catch (error) {
      console.error("Update post error:", error)
      return null
    }
  }

  async deletePost(id: number): Promise<boolean> {
    try {
      const response = await apiClient.delete<ApiResponse>(`/news/${id}`)
      return response.success
    } catch (error) {
      console.error("Delete post error:", error)
      return false
    }
  }

  async getFeaturedPosts(): Promise<Post[]> {
    try {
      const response = await apiClient.get<ApiResponse<Post[]>>("/news/featured")
      return response.data || []
    } catch (error) {
      console.error("Get featured posts error:", error)
      return []
    }
  }

  async getPostsByCategory(category: string, params?: PaginationParams): Promise<PostsResponse> {
    try {
      const response = await apiClient.get<ApiResponse<PostsResponse>>(`/news/category/${category}`, params)
      return response.data || { posts: [], total: 0, page: 1, limit: 10 }
    } catch (error) {
      console.error("Get posts by category error:", error)
      return { posts: [], total: 0, page: 1, limit: 10 }
    }
  }
}

export const postsService = new PostsService()

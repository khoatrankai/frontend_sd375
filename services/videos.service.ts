import { apiClient } from "@/lib/api"

export class VideosService {
  // Get all videos or filter by category
  async getVideos(params?: { category?: string }) {
    try {
      const response = await apiClient.get<any>("/videos", params)
      return response || []
    } catch (error) {
      console.error("Get videos error:", error)
      return []
    }
  }

  // Get a single video by ID
  async getVideo(id: string) {
    try {
      const response = await apiClient.get<any>(`/videos/${id}`)
      return response || null
    } catch (error) {
      console.error("Get video error:", error)
      return null
    }
  }

  // Create a new video
  async createVideo(data: any) {
    try {
      const response = await apiClient.post<any>("/videos", data)
      return response || null
    } catch (error) {
      console.error("Create video error:", error)
      return null
    }
  }

  // Update an existing video
  async updateVideo(id: string, data: any) {
    try {
      const response = await apiClient.patch<any>(`/videos/${id}`, data)
      return response || null
    } catch (error) {
      console.error("Update video error:", error)
      return null
    }
  }

  // Increment the views count of a video
  async incrementViews(id: string) {
    try {
      const response = await apiClient.patch<any>(`/videos/${id}/views`)
      return response || null
    } catch (error) {
      console.error("Increment views error:", error)
      return null
    }
  }

  // Delete a video by ID
  async deleteVideo(id: string) {
    try {
      const response = await apiClient.delete<any>(`/videos/${id}`)
      return response?.statusCode === 200
    } catch (error) {
      console.error("Delete video error:", error)
      return false
    }
  }

  // Get all video categories
  async getCategories() {
    try {
      const response = await apiClient.get<any>("/videos/categories")
      return response || []
    } catch (error) {
      console.error("Get video categories error:", error)
      return []
    }
  }

  // Create a new category for videos
  async createCategory(data: { name: string }) {
    try {
      const response = await apiClient.post<any>("/videos/categories", data)
      return response || null
    } catch (error) {
      console.error("Create video category error:", error)
      return null
    }
  }
}

export const videosService = new VideosService()

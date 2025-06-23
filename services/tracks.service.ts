import { apiClient } from "@/lib/api"

export class TracksService {
  async getTracks(params?: { category?: string; featured?: boolean }) {
    try {
      const response = await apiClient.get<any>("/tracks", params)
      return response || []
    } catch (error) {
      console.error("Get tracks error:", error)
      return []
    }
  }

  async getTrack(id: string) {
    try {
      const response = await apiClient.get<any>(`/tracks/${id}`)
      return response || null
    } catch (error) {
      console.error("Get track error:", error)
      return null
    }
  }

  async createTrack(data: any) {
    try {
      const response = await apiClient.post<any>("/tracks", data)
      return response || null
    } catch (error) {
      console.error("Create track error:", error)
      return null
    }
  }

  async updateTrack(id: string, data: any) {
    try {
      const response = await apiClient.patch<any>(`/tracks/${id}`, data)
      return response || null
    } catch (error) {
      console.error("Update track error:", error)
      return null
    }
  }

  async deleteTrack(id: string) {
    try {
      const response = await apiClient.delete<any>(`/tracks/${id}`)
      return response?.statusCode === 200
    } catch (error) {
      console.error("Delete track error:", error)
      return false
    }
  }

  async incrementPlays(id: string) {
    try {
      const response = await apiClient.patch<any>(`/tracks/${id}/plays`)
      return response || null
    } catch (error) {
      console.error("Increment plays error:", error)
      return null
    }
  }

  async getCategories() {
    try {
      const response = await apiClient.get<any>("/tracks/categories")
      return response || []
    } catch (error) {
      console.error("Get track categories error:", error)
      return []
    }
  }

  async createCategory(data: { name: string }) {
    try {
      const response = await apiClient.post<any>("/tracks/categories", data)
      return response || null
    } catch (error) {
      console.error("Create track category error:", error)
      return null
    }
  }
}

export const tracksService = new TracksService()

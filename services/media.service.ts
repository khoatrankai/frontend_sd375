import { apiClient } from "@/lib/api"
import type { MediaFile, MediaResponse, PaginationParams, ApiResponse } from "@/lib/types"

export class MediaService {
  async getFiles(params?: PaginationParams): Promise<MediaResponse> {
    try {
      const response = await apiClient.get<ApiResponse<MediaResponse>>("/media", params)
      return response.data || { files: [], total: 0, page: 1, limit: 10 }
    } catch (error) {
      console.error("Get media files error:", error)
      return { files: [], total: 0, page: 1, limit: 10 }
    }
  }

  async uploadFile(file: File, description?: string): Promise<MediaFile | null> {
    try {
      const formData = new FormData()
      formData.append("file", file)
      if (description) {
        formData.append("description", description)
      }

      const response = await apiClient.upload<ApiResponse<MediaFile>>("/media/upload", formData)
      return response.data || null
    } catch (error) {
      console.error("Upload file error:", error)
      return null
    }
  }

  async deleteFile(id: number): Promise<boolean> {
    try {
      const response = await apiClient.delete<ApiResponse>(`/media/${id}`)
      return response.success
    } catch (error) {
      console.error("Delete file error:", error)
      return false
    }
  }

  async updateFile(id: number, data: { name?: string; description?: string }): Promise<MediaFile | null> {
    try {
      const response = await apiClient.put<ApiResponse<MediaFile>>(`/media/${id}`, data)
      return response.data || null
    } catch (error) {
      console.error("Update file error:", error)
      return null
    }
  }

  async getFilesByType(type: string, params?: PaginationParams): Promise<MediaResponse> {
    try {
      const response = await apiClient.get<ApiResponse<MediaResponse>>(`/media/type/${type}`, params)
      return response.data || { files: [], total: 0, page: 1, limit: 10 }
    } catch (error) {
      console.error("Get files by type error:", error)
      return { files: [], total: 0, page: 1, limit: 10 }
    }
  }
}

export const mediaService = new MediaService()

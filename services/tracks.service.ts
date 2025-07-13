import { apiClient } from "@/lib/api"
import { toast } from "react-toastify"

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
    const toastId = toast.loading("Đang tạo bài nhạc...")
    try {
      const response = await apiClient.post<any>("/tracks", data)
      toast.update(toastId, { render: "Tạo bài nhạc thành công!", type: "success", isLoading: false, autoClose: 3000 })
      return response || null
    } catch (error) {
      console.error("Create track error:", error)
      toast.update(toastId, { render: "Tạo bài nhạc thất bại!", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }

  async updateTrack(id: string, data: any) {
    const toastId = toast.loading("Đang cập nhật bài nhạc...")
    try {
      const response = await apiClient.patch<any>(`/tracks/${id}`, data)
      toast.update(toastId, { render: "Cập nhật bài nhạc thành công!", type: "success", isLoading: false, autoClose: 3000 })
      return response || null
    } catch (error) {
      console.error("Update track error:", error)
      toast.update(toastId, { render: "Cập nhật bài nhạc thất bại!", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }

  async deleteTrack(id: string) {
    const toastId = toast.loading("Đang xoá bài nhạc...")
    try {
      const response = await apiClient.delete<any>(`/tracks/${id}`)
      const success = response?.statusCode === 200
      toast.update(toastId, {
        render: success ? "Xoá bài nhạc thành công!" : "Xoá bài nhạc thất bại!",
        type: success ? "success" : "error",
        isLoading: false,
        autoClose: 3000,
      })
      return success
    } catch (error) {
      console.error("Delete track error:", error)
      toast.update(toastId, { render: "Xoá bài nhạc thất bại!", type: "error", isLoading: false, autoClose: 3000 })
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
    const toastId = toast.loading("Đang tạo danh mục bài nhạc...")
    try {
      const response = await apiClient.post<any>("/tracks/categories", data)
      toast.update(toastId, { render: "Tạo danh mục thành công!", type: "success", isLoading: false, autoClose: 3000 })
      return response || null
    } catch (error) {
      console.error("Create track category error:", error)
      toast.update(toastId, { render: "Tạo danh mục thất bại!", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }
}

export const tracksService = new TracksService()

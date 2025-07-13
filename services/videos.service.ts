import { apiClient } from "@/lib/api"
import { toast } from "react-toastify"

export class VideosService {
  async getVideos(params?: { category?: string }) {
    try {
      const response = await apiClient.get<any>("/videos", params)
      return response || []
    } catch (error) {
      console.error("Get videos error:", error)
      return []
    }
  }

  async getVideo(id: string) {
    try {
      const response = await apiClient.get<any>(`/videos/${id}`)
      return response || null
    } catch (error) {
      console.error("Get video error:", error)
      return null
    }
  }

  async createVideo(data: any) {
    const toastId = toast.loading("Đang tạo video...")
    try {
      const response = await apiClient.post<any>("/videos", data)
      toast.update(toastId, { render: "Tạo video thành công!", type: "success", isLoading: false, autoClose: 3000 })
      return response || null
    } catch (error) {
      console.error("Create video error:", error)
      toast.update(toastId, { render: "Tạo video thất bại!", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }

  async updateVideo(id: string, data: any) {
    const toastId = toast.loading("Đang cập nhật video...")
    try {
      const response = await apiClient.patch<any>(`/videos/${id}`, data)
      toast.update(toastId, { render: "Cập nhật video thành công!", type: "success", isLoading: false, autoClose: 3000 })
      return response || null
    } catch (error) {
      console.error("Update video error:", error)
      toast.update(toastId, { render: "Cập nhật video thất bại!", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }

  async incrementViews(id: string) {
    try {
      const response = await apiClient.patch<any>(`/videos/${id}/views`)
      return response || null
    } catch (error) {
      console.error("Increment views error:", error)
      return null
    }
  }

  async deleteVideo(id: string) {
    const toastId = toast.loading("Đang xoá video...")
    try {
      const response = await apiClient.delete<any>(`/videos/${id}`)
      if (response?.statusCode === 200) {
        toast.update(toastId, { render: "Xoá video thành công!", type: "success", isLoading: false, autoClose: 3000 })
        return true
      } else {
        toast.update(toastId, { render: "Xoá video thất bại!", type: "error", isLoading: false, autoClose: 3000 })
        return false
      }
    } catch (error) {
      console.error("Delete video error:", error)
      toast.update(toastId, { render: "Xoá video thất bại!", type: "error", isLoading: false, autoClose: 3000 })
      return false
    }
  }

  async getCategories() {
    try {
      const response = await apiClient.get<any>("/videos/categories")
      return response || []
    } catch (error) {
      console.error("Get video categories error:", error)
      return []
    }
  }

  async createCategory(data: { name: string }) {
    const toastId = toast.loading("Đang tạo danh mục video...")
    try {
      const response = await apiClient.post<any>("/videos/categories", data)
      toast.update(toastId, { render: "Tạo danh mục thành công!", type: "success", isLoading: false, autoClose: 3000 })
      return response || null
    } catch (error) {
      console.error("Create video category error:", error)
      toast.update(toastId, { render: "Tạo danh mục thất bại!", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }
}

export const videosService = new VideosService()

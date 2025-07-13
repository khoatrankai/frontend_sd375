import { apiClient } from "@/lib/api"
import type { ApiResponse } from "@/lib/types"
import { toast } from "react-toastify"

export class ImagesService {
  async getImages(category?: string) {
    try {
      const url = category ? `/images?category=${encodeURIComponent(category)}` : "/images"
      const response = await apiClient.get<any>(url)
      return response || []
    } catch (error) {
      console.error("Get images error:", error)
      return []
    }
  }

  async getImage(id: string) {
    try {
      const response = await apiClient.get<any>(`/images/${id}`)
      return response || null
    } catch (error) {
      console.error("Get image error:", error)
      return null
    }
  }

  async createImage(formData: FormData) {
    const toastId = toast.loading("Đang tạo ảnh...")
    try {
      const response = await apiClient.post<any>("/images", formData)
      if (response?.statusCode === 201) {
        toast.update(toastId, { render: "Tạo ảnh thành công", type: "success", isLoading: false, autoClose: 3000 })
      } else {
        toast.update(toastId, { render: "Tạo ảnh thất bại", type: "error", isLoading: false, autoClose: 3000 })
      }
      return response || null
    } catch (error) {
      console.error("Create image error:", error)
      toast.update(toastId, { render: "Lỗi khi tạo ảnh", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }

  async uploadImage(formData: FormData) {
    const toastId = toast.loading("Đang upload ảnh...")
    try {
      const response = await apiClient.upload<any>("/images/upload_image", formData)
      if (response?.statusCode === 201) {
        toast.update(toastId, { render: "Upload thành công", type: "success", isLoading: false, autoClose: 3000 })
      } else {
        toast.update(toastId, { render: "Upload thất bại", type: "error", isLoading: false, autoClose: 3000 })
      }
      return response || null
    } catch (error) {
      console.error("Upload image error:", error)
      toast.update(toastId, { render: "Lỗi khi upload ảnh", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }

  async updateImage(id: string, formData: FormData) {
    const toastId = toast.loading("Đang cập nhật ảnh...")
    try {
      const response = await apiClient.uploadPatch<any>(`/images/${id}`, formData)
      if (response?.statusCode === 200) {
        toast.update(toastId, { render: "Cập nhật thành công", type: "success", isLoading: false, autoClose: 3000 })
      } else {
        toast.update(toastId, { render: "Cập nhật thất bại", type: "error", isLoading: false, autoClose: 3000 })
      }
      return response || null
    } catch (error) {
      console.error("Update image error:", error)
      toast.update(toastId, { render: "Lỗi khi cập nhật ảnh", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }

  async deleteImage(id: string) {
    const toastId = toast.loading("Đang xóa ảnh...")
    try {
      const response = await apiClient.delete<any>(`/images/${id}`)
      if (response?.statusCode === 200) {
        toast.update(toastId, { render: "Xóa ảnh thành công", type: "success", isLoading: false, autoClose: 3000 })
        return true
      } else {
        toast.update(toastId, { render: "Xóa ảnh thất bại", type: "error", isLoading: false, autoClose: 3000 })
        return false
      }
    } catch (error) {
      console.error("Delete image error:", error)
      toast.update(toastId, { render: "Lỗi khi xóa ảnh", type: "error", isLoading: false, autoClose: 3000 })
      return false
    }
  }

  async incrementViews(id: string) {
    try {
      const formData = new FormData()
      const response = await apiClient.uploadPatch<any>(`/images/${id}/views`, formData)
      return response || null
    } catch (error) {
      console.error("Increment views error:", error)
      return null
    }
  }

  async getCategories() {
    try {
      const response = await apiClient.get<any>("/images/categories")
      return response || []
    } catch (error) {
      console.error("Get categories error:", error)
      return []
    }
  }

  async createCategory(data: { name: string }) {
    const toastId = toast.loading("Đang tạo danh mục...")
    try {
      const response = await apiClient.post<any>("/images/categories", data)
      if (response?.statusCode === 201) {
        toast.update(toastId, { render: "Tạo danh mục thành công", type: "success", isLoading: false, autoClose: 3000 })
      } else {
        toast.update(toastId, { render: "Tạo danh mục thất bại", type: "error", isLoading: false, autoClose: 3000 })
      }
      return response || null
    } catch (error) {
      console.error("Create category error:", error)
      toast.update(toastId, { render: "Lỗi khi tạo danh mục", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }
}

export const imagesService = new ImagesService()

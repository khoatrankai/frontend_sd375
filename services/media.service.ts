import { apiClient } from "@/lib/api"
import type { MediaFile, MediaResponse, PaginationParams, ApiResponse } from "@/lib/types"
import { toast } from "react-toastify"

export class MediaService {
  async getFiles(params?: PaginationParams): Promise<any> {
    try {
      const response = await apiClient.get<ApiResponse<MediaResponse>>("/media", params)
      return response || { files: [], total: 0, page: 1, limit: 10 }
    } catch (error) {
      console.error("Get media files error:", error)
      return { files: [], total: 0, page: 1, limit: 10 }
    }
  }

  async uploadFile(file: File, description?: string): Promise<any | null> {
    const toastId = toast.loading("Đang tải lên tệp...")
    try {
      const formData = new FormData()
      formData.append("file", file)
      if (description) {
        formData.append("description", description)
      }

      const response = await apiClient.upload<ApiResponse<MediaFile>>("/media/upload", formData)
      if (response) {
        toast.update(toastId, {
          render: "Tải tệp lên thành công",
          type: "success",
          isLoading: false,
          autoClose: 3000
        })
      } else {
        toast.update(toastId, {
          render: "Tải tệp lên thất bại",
          type: "error",
          isLoading: false,
          autoClose: 3000
        })
      }
      return response || null
    } catch (error) {
      console.error("Upload file error:", error)
      toast.update(toastId, {
        render: "Đã xảy ra lỗi khi tải tệp lên",
        type: "error",
        isLoading: false,
        autoClose: 3000
      })
      return null
    }
  }

  async deleteFile(id: number): Promise<boolean> {
    const toastId = toast.loading("Đang xóa tệp...")
    try {
      const response = await apiClient.delete<any>(`/media/${id}`)
      if (response?.statusCode === 200) {
        toast.update(toastId, {
          render: "Xóa tệp thành công",
          type: "success",
          isLoading: false,
          autoClose: 3000
        })
        return true
      } else {
        toast.update(toastId, {
          render: "Xóa tệp thất bại",
          type: "error",
          isLoading: false,
          autoClose: 3000
        })
        return false
      }
    } catch (error) {
      console.error("Delete file error:", error)
      toast.update(toastId, {
        render: "Lỗi khi xóa tệp",
        type: "error",
        isLoading: false,
        autoClose: 3000
      })
      return false
    }
  }

  async updateFile(id: number, data: { name?: string; description?: string }): Promise<any | null> {
    const toastId = toast.loading("Đang cập nhật tệp...")
    try {
      const response = await apiClient.put<ApiResponse<MediaFile>>(`/media/${id}`, data)
      if (response) {
        toast.update(toastId, {
          render: "Cập nhật tệp thành công",
          type: "success",
          isLoading: false,
          autoClose: 3000
        })
      } else {
        toast.update(toastId, {
          render: "Cập nhật tệp thất bại",
          type: "error",
          isLoading: false,
          autoClose: 3000
        })
      }
      return response || null
    } catch (error) {
      console.error("Update file error:", error)
      toast.update(toastId, {
        render: "Lỗi khi cập nhật tệp",
        type: "error",
        isLoading: false,
        autoClose: 3000
      })
      return null
    }
  }

  async getFilesByType(type: string, params?: PaginationParams): Promise<any> {
    try {
      const response = await apiClient.get<ApiResponse<MediaResponse>>(`/media/type/${type}`, params)
      return response || { files: [], total: 0, page: 1, limit: 10 }
    } catch (error) {
      console.error("Get files by type error:", error)
      return { files: [], total: 0, page: 1, limit: 10 }
    }
  }
}

export const mediaService = new MediaService()

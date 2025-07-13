import { apiClient } from "@/lib/api"
import { toast } from "react-toastify"

export class SoftwareService {
  async getSoftwares(params?: { category?: string; platform?: string; featured?: boolean }) {
    try {
      const response = await apiClient.get<any>("/software", params)
      return response || []
    } catch (error) {
      console.error("Get softwares error:", error)
      return []
    }
  }

  async getSoftware(id: string) {
    try {
      const response = await apiClient.get<any>(`/software/${id}`)
      return response || null
    } catch (error) {
      console.error("Get software error:", error)
      return null
    }
  }

  async createSoftware(data: any) {
    const toastId = toast.loading("Đang tạo phần mềm...")
    try {
      const response = await apiClient.upload<any>("/software", data)
      toast.update(toastId, { render: "Tạo phần mềm thành công!", type: "success", isLoading: false, autoClose: 3000 })
      return response || null
    } catch (error) {
      console.error("Create software error:", error)
      toast.update(toastId, { render: "Tạo phần mềm thất bại!", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }

  async updateSoftware(id: string, data: any) {
    const toastId = toast.loading("Đang cập nhật phần mềm...")
    try {
      const response = await apiClient.uploadPatch<any>(`/software/${id}`, data)
      toast.update(toastId, { render: "Cập nhật phần mềm thành công!", type: "success", isLoading: false, autoClose: 3000 })
      return response || null
    } catch (error) {
      console.error("Update software error:", error)
      toast.update(toastId, { render: "Cập nhật phần mềm thất bại!", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }

  async deleteSoftware(id: string) {
    const toastId = toast.loading("Đang xóa phần mềm...")
    try {
      const response = await apiClient.delete<any>(`/software/${id}`)
      const success = response?.statusCode === 200
      toast.update(toastId, {
        render: success ? "Xoá phần mềm thành công!" : "Xoá phần mềm thất bại!",
        type: success ? "success" : "error",
        isLoading: false,
        autoClose: 3000,
      })
      return success
    } catch (error) {
      console.error("Delete software error:", error)
      toast.update(toastId, { render: "Xoá phần mềm thất bại!", type: "error", isLoading: false, autoClose: 3000 })
      return false
    }
  }

  async incrementDownloads(id: string) {
    try {
      const formdata = new FormData()
      const response = await apiClient.uploadPatch<any>(`/software/${id}/downloads`, formdata)
      return response || null
    } catch (error) {
      console.error("Increment downloads error:", error)
      return null
    }
  }

  async getCategories() {
    try {
      const response = await apiClient.get<any>("/software/categories")
      return response || []
    } catch (error) {
      console.error("Get categories error:", error)
      return []
    }
  }

  async createCategory(data: { name: string }) {
    const toastId = toast.loading("Đang tạo danh mục phần mềm...")
    try {
      const response = await apiClient.post<any>("/software/categories", data)
      toast.update(toastId, { render: "Tạo danh mục thành công!", type: "success", isLoading: false, autoClose: 3000 })
      return response || null
    } catch (error) {
      console.error("Create category error:", error)
      toast.update(toastId, { render: "Tạo danh mục thất bại!", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }

  async updateCategory(id: string, data: { name?: string; nametag?: string }) {
    const toastId = toast.loading("Đang cập nhật danh mục phần mềm...")
    try {
      const response = await apiClient.patch<any>(`/software/categories/${id}`, data)
      toast.update(toastId, { render: "Cập nhật danh mục thành công!", type: "success", isLoading: false, autoClose: 3000 })
      return response || null
    } catch (error) {
      console.error("Update category error:", error)
      toast.update(toastId, { render: "Cập nhật danh mục thất bại!", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }

  async getPlatforms() {
    try {
      const response = await apiClient.get<any>("/software/platforms")
      return response || []
    } catch (error) {
      console.error("Get platforms error:", error)
      return []
    }
  }

  async createPlatform(data: { name: string }) {
    const toastId = toast.loading("Đang tạo nền tảng phần mềm...")
    try {
      const response = await apiClient.post<any>("/software/platforms", data)
      toast.update(toastId, { render: "Tạo nền tảng thành công!", type: "success", isLoading: false, autoClose: 3000 })
      return response || null
    } catch (error) {
      console.error("Create platform error:", error)
      toast.update(toastId, { render: "Tạo nền tảng thất bại!", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }

  async updatePlatform(id: string, data: { name?: string }) {
    const toastId = toast.loading("Đang cập nhật nền tảng phần mềm...")
    try {
      const response = await apiClient.patch<any>(`/software/platforms/${id}`, data)
      toast.update(toastId, { render: "Cập nhật nền tảng thành công!", type: "success", isLoading: false, autoClose: 3000 })
      return response || null
    } catch (error) {
      console.error("Update platform error:", error)
      toast.update(toastId, { render: "Cập nhật nền tảng thất bại!", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }
}

export const softwareService = new SoftwareService()

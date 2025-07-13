import { apiClient } from "@/lib/api"
import type { ApiResponse, PaginationParams } from "@/lib/types"
import { toast } from "react-toastify"

export class ReportService {
  async getReports() {
    try {
      const response = await apiClient.get<any>("/reports")
      return response || { posts: [], total: 0, page: 1, limit: 10 }
    } catch (error) {
      console.error("Get posts error:", error)
      return { posts: [], total: 0, page: 1, limit: 10 }
    }
  }

  async getReport(id: string) {
    try {
      const response = await apiClient.get<any>(`/reports/${id}`)
      return response || null
    } catch (error) {
      console.error("Get report error:", error)
      return null
    }
  }

  async getCategoriesReport(params?: PaginationParams) {
    try {
      const response = await apiClient.get<any>("/reports/categories", params)
      return response || { posts: [], total: 0, page: 1, limit: 10 }
    } catch (error) {
      console.error("Get categories error:", error)
      return { posts: [], total: 0, page: 1, limit: 10 }
    }
  }

  async getCategories() {
    try {
      const response = await apiClient.get<any>("/reports/categories")
      return response || { posts: [], total: 0, page: 1, limit: 10 }
    } catch (error) {
      console.error("Get categories error:", error)
      return { posts: [], total: 0, page: 1, limit: 10 }
    }
  }

  async createReport(data: any) {
    const toastId = toast.loading("Đang tạo báo cáo...")
    try {
      const response = await apiClient.post<any>("/reports", data)
      toast.update(toastId, {
        render: "Tạo báo cáo thành công!",
        type: "success",
        isLoading: false,
        autoClose: 3000
      })
      return response || null
    } catch (error) {
      console.error("Create report error:", error)
      toast.update(toastId, {
        render: "Tạo báo cáo thất bại!",
        type: "error",
        isLoading: false,
        autoClose: 3000
      })
      return null
    }
  }

  async deleteReport(id: string) {
    const toastId = toast.loading("Đang xoá báo cáo...")
    try {
      const response = await apiClient.delete<ApiResponse>(`/reports/${id}`)
      toast.update(toastId, {
        render: "Xoá thành công!",
        type: "success",
        isLoading: false,
        autoClose: 3000
      })
      return response.data
    } catch (error) {
      console.error("Delete report error:", error)
      toast.update(toastId, {
        render: "Xoá thất bại!",
        type: "error",
        isLoading: false,
        autoClose: 3000
      })
      return { statusCode: 500, message: "Delete failed" }
    }
  }
}

export const reportService = new ReportService()

import { apiClient } from "@/lib/api"
import { toast } from "react-toastify"
import type { ApiResponse } from "@/lib/types"

export class HistoryService {
  // --- History ---
  async getHistories(params?: { highlight?: boolean }) {
    try {
      const response = await apiClient.get<any>(
        "/histories",
        params ? { highlight: params.highlight ? "true" : "false" } : undefined
      )
      return response || []
    } catch (error) {
      console.error("Get histories error:", error)
      return []
    }
  }

  async getHistory(id: string) {
    try {
      const response = await apiClient.get<any>(`/histories/${id}`)
      return response || null
    } catch (error) {
      console.error("Get history error:", error)
      return null
    }
  }

  async createHistory(data: any) {
    const toastId = toast.loading("Đang tạo lịch sử...")
    try {
      const response = await apiClient.post<any>("/histories", data)
      if (response?.statusCode === 201) {
        toast.update(toastId, { render: "Tạo thành công", type: "success", isLoading: false, autoClose: 3000 })
      } else {
        toast.update(toastId, { render: "Tạo thất bại", type: "error", isLoading: false, autoClose: 3000 })
      }
      return response || null
    } catch (error) {
      console.error("Create history error:", error)
      toast.update(toastId, { render: "Lỗi khi tạo", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }

  async updateHistory(id: string, data: any) {
    const toastId = toast.loading("Đang cập nhật lịch sử...")
    try {
      const response = await apiClient.patch<any>(`/histories/${id}`, data)
      if (response?.statusCode === 200) {
        toast.update(toastId, { render: "Cập nhật thành công", type: "success", isLoading: false, autoClose: 3000 })
      } else {
        toast.update(toastId, { render: "Cập nhật thất bại", type: "error", isLoading: false, autoClose: 3000 })
      }
      return response || null
    } catch (error) {
      console.error("Update history error:", error)
      toast.update(toastId, { render: "Lỗi khi cập nhật", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }

  async deleteHistory(id: string) {
    const toastId = toast.loading("Đang xóa lịch sử...")
    try {
      const response = await apiClient.delete<any>(`/histories/${id}`)
      if (response?.statusCode === 200) {
        toast.update(toastId, { render: "Xóa thành công", type: "success", isLoading: false, autoClose: 3000 })
        return true
      } else {
        toast.update(toastId, { render: "Xóa thất bại", type: "error", isLoading: false, autoClose: 3000 })
        return false
      }
    } catch (error) {
      console.error("Delete history error:", error)
      toast.update(toastId, { render: "Lỗi khi xóa", type: "error", isLoading: false, autoClose: 3000 })
      return false
    }
  }

  // --- Leader ---
  async getLeaders() {
    try {
      const response = await apiClient.get<any>("/histories/leaders")
      return response || []
    } catch (error) {
      console.error("Get leaders error:", error)
      return []
    }
  }

  async getLeader(id: string) {
    try {
      const response = await apiClient.get<any>(`/histories/leaders/${id}`)
      return response || null
    } catch (error) {
      console.error("Get leader error:", error)
      return null
    }
  }

  async createLeader(data: any) {
    const toastId = toast.loading("Đang tạo lãnh đạo...")
    try {
      const response = await apiClient.post<any>("/histories/leaders", data)
      if (response?.statusCode === 201) {
        toast.update(toastId, { render: "Tạo thành công", type: "success", isLoading: false, autoClose: 3000 })
      } else {
        toast.update(toastId, { render: "Tạo thất bại", type: "error", isLoading: false, autoClose: 3000 })
      }
      return response || null
    } catch (error) {
      console.error("Create leader error:", error)
      toast.update(toastId, { render: "Lỗi khi tạo", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }

  async updateLeader(id: string, data: any) {
    const toastId = toast.loading("Đang cập nhật lãnh đạo...")
    try {
      const response = await apiClient.patch<any>(`/histories/leaders/${id}`, data)
      if (response?.statusCode === 200) {
        toast.update(toastId, { render: "Cập nhật thành công", type: "success", isLoading: false, autoClose: 3000 })
      } else {
        toast.update(toastId, { render: "Cập nhật thất bại", type: "error", isLoading: false, autoClose: 3000 })
      }
      return response || null
    } catch (error) {
      console.error("Update leader error:", error)
      toast.update(toastId, { render: "Lỗi khi cập nhật", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }

  async deleteLeader(id: string) {
    const toastId = toast.loading("Đang xóa lãnh đạo...")
    try {
      const response = await apiClient.delete<any>(`/histories/leaders/${id}`)
      if (response?.statusCode === 200) {
        toast.update(toastId, { render: "Xóa thành công", type: "success", isLoading: false, autoClose: 3000 })
        return true
      } else {
        toast.update(toastId, { render: "Xóa thất bại", type: "error", isLoading: false, autoClose: 3000 })
        return false
      }
    } catch (error) {
      console.error("Delete leader error:", error)
      toast.update(toastId, { render: "Lỗi khi xóa", type: "error", isLoading: false, autoClose: 3000 })
      return false
    }
  }
}

export const historyService = new HistoryService()

import { apiClient } from "@/lib/api"
import { toast } from "react-toastify"

export class AwardService {
  async getAwards(params?: { year?: string; level?: string }) {
    try {
      const response = await apiClient.get<any>("/awards", params)
      return response || []
    } catch (error) {
      console.error("Get awards error:", error)
      return []
    }
  }

  async getAward(id: string) {
    try {
      const response = await apiClient.get<any>(`/awards/${id}`)
      return response || null
    } catch (error) {
      console.error("Get award error:", error)
      return null
    }
  }

  async createAward(data: any) {
    const toastId = toast.loading("Đang tạo khen thưởng...")
    try {
      const response = await apiClient.post<any>("/awards", data)
      if (response?.statusCode === 201) {
        toast.update(toastId, { render: "Tạo thành công", type: "success", isLoading: false, autoClose: 3000 })
      } else {
        toast.update(toastId, { render: "Tạo thất bại", type: "error", isLoading: false, autoClose: 3000 })
      }
      return response || null
    } catch (error) {
      console.error("Create award error:", error)
      toast.update(toastId, { render: "Lỗi khi tạo", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }

  async updateAward(id: string, data: any) {
    const toastId = toast.loading("Đang cập nhật...")
    try {
      const response = await apiClient.patch<any>(`/awards/${id}`, data)
      if (response?.statusCode === 200) {
        toast.update(toastId, { render: "Cập nhật thành công", type: "success", isLoading: false, autoClose: 3000 })
      } else {
        toast.update(toastId, { render: "Cập nhật thất bại", type: "error", isLoading: false, autoClose: 3000 })
      }
      return response || null
    } catch (error) {
      console.error("Update award error:", error)
      toast.update(toastId, { render: "Lỗi khi cập nhật", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }

  async deleteAward(id: string) {
    const toastId = toast.loading("Đang xóa...")
    try {
      const response = await apiClient.delete<any>(`/awards/${id}`)
      if (response?.statusCode === 200) {
        toast.update(toastId, { render: "Xóa thành công", type: "success", isLoading: false, autoClose: 3000 })
      } else {
        toast.update(toastId, { render: "Xóa thất bại", type: "error", isLoading: false, autoClose: 3000 })
      }
      return response
    } catch (error) {
      console.error("Delete award error:", error)
      toast.update(toastId, { render: "Lỗi khi xóa", type: "error", isLoading: false, autoClose: 3000 })
      return false
    }
  }
}

export const awardService = new AwardService()

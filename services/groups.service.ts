import { apiClient } from "@/lib/api"
import { toast } from "react-toastify"
import type { ApiResponse } from "@/lib/types"

export class GroupService {
  async getGroups() {
    try {
      const response = await apiClient.get<any>("/groups")
      return response || []
    } catch (error) {
      console.error("Get groups error:", error)
      return []
    }
  }

  async getGroup(id: string) {
    try {
      const response = await apiClient.get<any>(`/groups/${id}`)
      return response || null
    } catch (error) {
      console.error("Get group error:", error)
      return null
    }
  }

  async createGroup(data: any) {
    const toastId = toast.loading("Đang tạo đơn vị...")
    try {
      const response = await apiClient.post<any>("/groups", data)
      if (response?.statusCode === 201) {
        toast.update(toastId, {
          render: "Tạo đơn vị thành công",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        })
      } else {
        toast.update(toastId, {
          render: "Tạo đơn vị thất bại",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        })
      }
      return response || null
    } catch (error) {
      console.error("Create group error:", error)
      toast.update(toastId, {
        render: "Lỗi khi tạo đơn vị",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      })
      return null
    }
  }

  async updateGroup(id: string, data: any) {
    const toastId = toast.loading("Đang cập nhật đơn vị...")
    try {
      const response = await apiClient.patch<any>(`/groups/${id}`, data)
      if (response?.statusCode === 200) {
        toast.update(toastId, {
          render: "Cập nhật thành công",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        })
      } else {
        toast.update(toastId, {
          render: "Cập nhật thất bại",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        })
      }
      return response || null
    } catch (error) {
      console.error("Update group error:", error)
      toast.update(toastId, {
        render: "Lỗi khi cập nhật",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      })
      return null
    }
  }

  async deleteGroup(id: string) {
    const toastId = toast.loading("Đang xóa đơn vị...")
    try {
      const response = await apiClient.delete<any>(`/groups/${id}`)
      if (response?.statusCode === 200) {
        toast.update(toastId, {
          render: "Xóa thành công",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        })
        return true
      } else {
        toast.update(toastId, {
          render: "Xóa thất bại",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        })
        return false
      }
    } catch (error) {
      console.error("Delete group error:", error)
      toast.update(toastId, {
        render: "Lỗi khi xóa đơn vị",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      })
      return false
    }
  }
}

export const groupService = new GroupService()

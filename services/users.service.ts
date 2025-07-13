import { apiClient } from "@/lib/api"
import { toast } from "react-toastify"
import type { User, PaginationParams, ApiResponse } from "@/lib/types"

export interface UsersResponse {
  users: User[]
  total: number
  page: number
  limit: number
}

export class UsersService {
  async getUsers(params?: PaginationParams) {
    try {
      const response = await apiClient.get<ApiResponse<UsersResponse>>("/users", params)
      return response || { users: [], total: 0, page: 1, limit: 10 }
    } catch (error) {
      console.error("Get users error:", error)
      return { users: [], total: 0, page: 1, limit: 10 }
    }
  }

  async getUser(id: string) {
    try {
      const response = await apiClient.get<any>(`/users/${id}`)
      return response || null
    } catch (error) {
      console.error("Get user error:", error)
      return null
    }
  }

  async loginUser(data: any) {
    try {
      const response = await apiClient.get<any>(`/users/login?username=${data?.username}&password=${data?.password}`)
      return response || null
    } catch (error) {
      console.error("Login user error:", error)
      return null
    }
  }

  async createUser(user: any) {
    const toastId = toast.loading("Đang tạo người dùng...")
    try {
      const response = await apiClient.upload<any>("/users", user)
      toast.update(toastId, { render: "Tạo người dùng thành công!", type: "success", isLoading: false, autoClose: 3000 })
      return response || null
    } catch (error) {
      console.error("Create user error:", error)
      toast.update(toastId, { render: "Tạo người dùng thất bại!", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }

  async updateUser(id: string, user: any) {
    const toastId = toast.loading("Đang cập nhật người dùng...")
    try {
      const response = await apiClient.uploadPatch<any>(`/users/${id}`, user)
      toast.update(toastId, { render: "Cập nhật thành công!", type: "success", isLoading: false, autoClose: 3000 })
      return response || null
    } catch (error) {
      console.error("Update user error:", error)
      toast.update(toastId, { render: "Cập nhật thất bại!", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }

  async deleteUser(id: string) {
    const toastId = toast.loading("Đang xoá người dùng...")
    try {
      const response = await apiClient.delete<any>(`/users/${id}`)
      if (response.success) {
        toast.update(toastId, { render: "Xoá người dùng thành công!", type: "success", isLoading: false, autoClose: 3000 })
        return true
      } else {
        toast.update(toastId, { render: "Xoá thất bại!", type: "error", isLoading: false, autoClose: 3000 })
        return false
      }
    } catch (error) {
      console.error("Delete user error:", error)
      toast.update(toastId, { render: "Xoá thất bại!", type: "error", isLoading: false, autoClose: 3000 })
      return false
    }
  }

  async changeUserStatus(id: string, status: "active" | "inactive" | "pending"): Promise<boolean> {
    const toastId = toast.loading("Đang thay đổi trạng thái...")
    try {
      const response = await apiClient.put<ApiResponse>(`/users/${id}/status`, { status })
      if (response.success) {
        toast.update(toastId, {
          render: `Đã chuyển sang trạng thái: ${status}`,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        })
        return true
      } else {
        toast.update(toastId, { render: "Thay đổi thất bại!", type: "error", isLoading: false, autoClose: 3000 })
        return false
      }
    } catch (error) {
      console.error("Change user status error:", error)
      toast.update(toastId, { render: "Thay đổi thất bại!", type: "error", isLoading: false, autoClose: 3000 })
      return false
    }
  }
}

export const usersService = new UsersService()

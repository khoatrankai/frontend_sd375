import { apiClient } from "@/lib/api"
import type { User, PaginationParams, ApiResponse } from "@/lib/types"

export interface UsersResponse {
  users: User[]
  total: number
  page: number
  limit: number
}

export class UsersService {
  async getUsers(params?: PaginationParams): Promise<UsersResponse> {
    try {
      const response = await apiClient.get<ApiResponse<UsersResponse>>("/users", params)
      return response.data || { users: [], total: 0, page: 1, limit: 10 }
    } catch (error) {
      console.error("Get users error:", error)
      return { users: [], total: 0, page: 1, limit: 10 }
    }
  }

  async getUser(id: number): Promise<User | null> {
    try {
      const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`)
      return response.data || null
    } catch (error) {
      console.error("Get user error:", error)
      return null
    }
  }

  async createUser(user: Omit<User, "id" | "lastLogin">): Promise<User | null> {
    try {
      const response = await apiClient.post<ApiResponse<User>>("/users", user)
      return response.data || null
    } catch (error) {
      console.error("Create user error:", error)
      return null
    }
  }

  async updateUser(id: number, user: Partial<User>): Promise<User | null> {
    try {
      const response = await apiClient.put<ApiResponse<User>>(`/users/${id}`, user)
      return response.data || null
    } catch (error) {
      console.error("Update user error:", error)
      return null
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      const response = await apiClient.delete<ApiResponse>(`/users/${id}`)
      return response.success
    } catch (error) {
      console.error("Delete user error:", error)
      return false
    }
  }

  async changeUserStatus(id: number, status: "active" | "inactive" | "pending"): Promise<boolean> {
    try {
      const response = await apiClient.put<ApiResponse>(`/users/${id}/status`, { status })
      return response.success
    } catch (error) {
      console.error("Change user status error:", error)
      return false
    }
  }
}

export const usersService = new UsersService()

import { apiClient } from "@/lib/api"
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
    try {
      const response = await apiClient.post<any>("/groups", data)
      return response || null
    } catch (error) {
      console.error("Create group error:", error)
      return null
    }
  }

  async updateGroup(id: string, data: any) {
    try {
      const response = await apiClient.patch<any>(`/groups/${id}`, data)
      return response || null
    } catch (error) {
      console.error("Update group error:", error)
      return null
    }
  }

  async deleteGroup(id: string) {
    try {
      const response = await apiClient.delete<ApiResponse>(`/groups/${id}`)
      return response
    } catch (error) {
      console.error("Delete group error:", error)
      return false
    }
  }
}

export const groupService = new GroupService()

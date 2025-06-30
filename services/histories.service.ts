import { apiClient } from "@/lib/api"
import type { ApiResponse, PaginationParams } from "@/lib/types"

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
    try {
      const response = await apiClient.post<any>("/histories", data)
      return response || null
    } catch (error) {
      console.error("Create history error:", error)
      return null
    }
  }

  async updateHistory(id: string, data: any) {
    try {
      const response = await apiClient.patch<any>(`/histories/${id}`, data)
      return response || null
    } catch (error) {
      console.error("Update history error:", error)
      return null
    }
  }

  async deleteHistory(id: string) {
    try {
      const response = await apiClient.delete<any>(`/histories/${id}`)
      return response
    } catch (error) {
      console.error("Delete history error:", error)
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
    try {
      const response = await apiClient.post<any>("/histories/leaders", data)
      return response || null
    } catch (error) {
      console.error("Create leader error:", error)
      return null
    }
  }

  async updateLeader(id: string, data: any) {
    try {
      const response = await apiClient.patch<any>(`/histories/leaders/${id}`, data)
      return response || null
    } catch (error) {
      console.error("Update leader error:", error)
      return null
    }
  }

  async deleteLeader(id: string) {
    try {
      const response = await apiClient.delete<ApiResponse>(`/histories/leaders/${id}`)
      return response
    } catch (error) {
      console.error("Delete leader error:", error)
      return false
    }
  }
}

export const historyService = new HistoryService()

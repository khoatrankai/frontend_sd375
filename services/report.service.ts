import { apiClient } from "@/lib/api"
import type { ApiResponse, PaginationParams } from "@/lib/types"



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
      console.error("Get Report error:", error)
      return null
    }
  }
  async getCategoriesReport(params?: PaginationParams) {
      try {
        const response = await apiClient.get<any>("/reports/categories", params)
        return response || { posts: [], total: 0, page: 1, limit: 10 }
      } catch (error) {
        console.error("Get posts error:", error)
        return { posts: [], total: 0, page: 1, limit: 10 }
      }
    }
    async getCategories() {
    try {
      const response = await apiClient.get<any>("/reports/categories")
      return response || { posts: [], total: 0, page: 1, limit: 10 }
    } catch (error) {
      console.error("Get posts error:", error)
      return { posts: [], total: 0, page: 1, limit: 10 }
    }
  }

  async createReport(data: any) {
    try {
      const response = await apiClient.post<any>("/reports", data)
      return response || null
    } catch (error) {
      console.error("Create Report error:", error)
      return null
    }
  }

  

 async deleteReport(id: string) {
  try {
    const response = await apiClient.delete<ApiResponse>(`/reports/${id}`)
    return response.data 
  } catch (error) {
    console.error("Delete user error:", error)
    return { statusCode: 500, message: "Delete failed" } 
  }
}

}

 export const reportService = new ReportService()

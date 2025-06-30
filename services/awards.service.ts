import { apiClient } from "@/lib/api"

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
    try {
      const response = await apiClient.post<any>("/awards", data)
      return response || null
    } catch (error) {
      console.error("Create award error:", error)
      return null
    }
  }

  async updateAward(id: string, data: any) {
    try {
      const response = await apiClient.patch<any>(`/awards/${id}`, data)
      return response || null
    } catch (error) {
      console.error("Update award error:", error)
      return null
    }
  }

  async deleteAward(id: string) {
    try {
      const response = await apiClient.delete<any>(`/awards/${id}`)
      return response
    } catch (error) {
      console.error("Delete award error:", error)
      return false
    }
  }
}

export const awardService = new AwardService()

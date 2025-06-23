import { apiClient } from "@/lib/api"


export class SoftwareService {
  async getSoftwares(params?: {
    category?: string
    platform?: string
    featured?: boolean
  }) {
    try {
      const response = await apiClient.get<any>("/software", params)
      return response || []
    } catch (error) {
      console.error("Get softwares error:", error)
      return []
    }
  }

  async getSoftware(id: string) {
    try {
      const response = await apiClient.get<any>(`/software/${id}`)
      return response || null
    } catch (error) {
      console.error("Get software error:", error)
      return null
    }
  }

  async createSoftware(data: any) {
    try {
      const response = await apiClient.post<any>("/software", data)
      return response || null
    } catch (error) {
      console.error("Create software error:", error)
      return null
    }
  }

  async updateSoftware(id: string, data: any) {
    try {
      const response = await apiClient.uploadPatch<any>(`/software/${id}`, data)
      return response || null
    } catch (error) {
      console.error("Update software error:", error)
      return null
    }
  }

  async deleteSoftware(id: string) {
    try {
      const response = await apiClient.delete<any>(`/software/${id}`)
      return response?.statusCode === 200
    } catch (error) {
      console.error("Delete software error:", error)
      return false
    }
  }

  async incrementDownloads(id: string) {
    try {
        const formdata= new FormData()
      const response = await apiClient.uploadPatch<any>(`/software/${id}/downloads`,formdata)
      return response || null
    } catch (error) {
      console.error("Increment downloads error:", error)
      return null
    }
  }

  async getCategories() {
    try {
      const response = await apiClient.get<any>("/software/categories")
      return response || []
    } catch (error) {
      console.error("Get categories error:", error)
      return []
    }
  }

  async createCategory(data: { name: string }) {
    try {
      const response = await apiClient.post<any>("/software/categories", data)
      return response || null
    } catch (error) {
      console.error("Create category error:", error)
      return null
    }
  }

  async updateCategory(id: string, data: { name?: string,nametag?:string }) {
    try {
        const formData = new FormData()
      const response = await apiClient.patch<any>(`/software/categories/${id}`, data)
      return response || null
    } catch (error) {
      console.error("Update category error:", error)
      return null
    }
  }

  async getPlatforms() {
    try {
      const response = await apiClient.get<any>("/software/platforms")
      return response || []
    } catch (error) {
      console.error("Get platforms error:", error)
      return []
    }
  }

  async createPlatform(data: { name: string }) {
    try {
      const response = await apiClient.post<any>("/software/platforms", data)
      return response || null
    } catch (error) {
      console.error("Create platform error:", error)
      return null
    }
  }

  async updatePlatform(id: string, data: { name?: string }) {
    try {
      const response = await apiClient.patch<any>(`/software/platforms/${id}`, data)
      return response || null
    } catch (error) {
      console.error("Update platform error:", error)
      return null
    }
  }
}

export const softwareService = new SoftwareService()

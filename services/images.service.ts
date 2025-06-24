import { apiClient } from "@/lib/api"
import type {  ApiResponse } from "@/lib/types"

export class ImagesService {
  async getImages(category?: string) {
    try {
      const url = category ? `/images?category=${encodeURIComponent(category)}` : "/images"
      const response = await apiClient.get<any>(url)
      return response || []
    } catch (error) {
      console.error("Get images error:", error)
      return []
    }
  }

  async getImage(id: string) {
    try {
      const response = await apiClient.get<any>(`/images/${id}`)
      return response || null
    } catch (error) {
      console.error("Get image error:", error)
      return null
    }
  }

  async createImage(formData: FormData) {
    try {
      const response = await apiClient.post<any>("/images", formData)
      return response || null
    } catch (error) {
      console.error("Create image error:", error)
      return null
    }
  }

  async updateImage(id: string, formData: FormData) {
    try {
      const response = await apiClient.uploadPatch<any>(`/images/${id}`, formData)
      return response || null
    } catch (error) {
      console.error("Update image error:", error)
      return null
    }
  }

  async deleteImage(id: string) {
    try {
      const response = await apiClient.delete<ApiResponse>(`/images/${id}`)
      return response.success
    } catch (error) {
      console.error("Delete image error:", error)
      return false
    }
  }

  async incrementViews(id: string) {
    try {
        const formData = new FormData()
      const response = await apiClient.uploadPatch<any>(`/images/${id}/views`,formData)
      return response || null
    } catch (error) {
      console.error("Increment views error:", error)
      return null
    }
  }

  async getCategories() {
    try {
      const response = await apiClient.get<any>("/images/categories")
      return response || []
    } catch (error) {
      console.error("Get categories error:", error)
      return []
    }
  }

  async createCategory(data: { name: string }) {
    try {
      const response = await apiClient.post<any>("/images/categories", data)
      return response || null
    } catch (error) {
      console.error("Create category error:", error)
      return null
    }
  }
}

export const imagesService = new ImagesService()

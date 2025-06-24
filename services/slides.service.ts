
import { apiClient } from "@/lib/api"
import type { AxiosResponse } from "axios"

export interface Slide {
  id: string
  title?: string
  description?: string
  image?: string
  news?: string
  created_at: string
  updated_at: string
}

export interface CreateSlidePayload {
  title?: string
  description?: string
  news?: string
  coverImage?: File
}

export interface UpdateSlidePayload extends Partial<CreateSlidePayload> {}

export const slideService = {
  // GET /slides?news=...
  async getSlides(news?: string) {
    try {
      const response: AxiosResponse<Slide[]> = await apiClient.get("/slides", {
        params: news ? { news } : undefined,
      })
      return response
    } catch (error) {
      console.error("Get slides error:", error)
      return []
    }
  },

  // GET /slides/:id
  async getSlideById(id: string) {
    try {
      const response: AxiosResponse<Slide> = await apiClient.get(`/slides/${id}`)
      return response
    } catch (error) {
      console.error("Get slide error:", error)
      return null
    }
  },

  // POST /slides
  async createSlide(data: CreateSlidePayload) {
    try {
      const formData = new FormData()
      if (data.title) formData.append("title", data.title)
      if (data.description) formData.append("description", data.description)
      if (data.news) formData.append("news", data.news)
      if (data.coverImage) formData.append("coverImage", data.coverImage)

      const response: AxiosResponse<Slide> = await apiClient.upload("/slides", formData)
      return response
    } catch (error) {
      console.error("Create slide error:", error)
      return null
    }
  },

  // PATCH /slides/:id
  async updateSlide(id: string, data: UpdateSlidePayload) {
    try {
      const formData = new FormData()
      if (data.title) formData.append("title", data.title)
      if (data.description) formData.append("description", data.description)
      if (data.news) formData.append("news", data.news)
      if (data.coverImage) formData.append("coverImage", data.coverImage)

      const response: AxiosResponse<Slide> = await apiClient.uploadPatch(`/slides/${id}`, formData)
      return response
    } catch (error) {
      console.error("Update slide error:", error)
      return null
    }
  },

  // DELETE /slides/:id
  async deleteSlide(id: string): Promise<boolean> {
    try {
      await apiClient.delete(`/slides/${id}`)
      return true
    } catch (error) {
      console.error("Delete slide error:", error)
      return false
    }
  }
}

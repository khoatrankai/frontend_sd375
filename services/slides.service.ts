import { apiClient } from "@/lib/api"
import { toast } from "react-toastify"
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

  async getSlideById(id: string) {
    try {
      const response: AxiosResponse<Slide> = await apiClient.get(`/slides/${id}`)
      return response
    } catch (error) {
      console.error("Get slide error:", error)
      return null
    }
  },

  async createSlide(data: CreateSlidePayload) {
    const toastId = toast.loading("Đang tạo slide...")
    try {
      const formData = new FormData()
      if (data.title) formData.append("title", data.title)
      if (data.description) formData.append("description", data.description)
      if (data.news) formData.append("news", data.news)
      if (data.coverImage) formData.append("coverImage", data.coverImage)

      const response: AxiosResponse<Slide> = await apiClient.upload("/slides", formData)
      toast.update(toastId, {
        render: "Tạo slide thành công!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      })
      return response
    } catch (error) {
      console.error("Create slide error:", error)
      toast.update(toastId, {
        render: "Tạo slide thất bại!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      })
      return null
    }
  },

  async updateSlide(id: string, data: UpdateSlidePayload) {
    const toastId = toast.loading("Đang cập nhật slide...")
    try {
      const formData = new FormData()
      if (data.title) formData.append("title", data.title)
      if (data.description) formData.append("description", data.description)
      if (data.news) formData.append("news", data.news)
      if (data.coverImage) formData.append("coverImage", data.coverImage)

      const response: AxiosResponse<Slide> = await apiClient.uploadPatch(`/slides/${id}`, formData)
      toast.update(toastId, {
        render: "Cập nhật slide thành công!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      })
      return response
    } catch (error) {
      console.error("Update slide error:", error)
      toast.update(toastId, {
        render: "Cập nhật slide thất bại!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      })
      return null
    }
  },

  async deleteSlide(id: string): Promise<boolean> {
    const toastId = toast.loading("Đang xoá slide...")
    try {
      await apiClient.delete(`/slides/${id}`)
      toast.update(toastId, {
        render: "Xoá slide thành công!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      })
      return true
    } catch (error) {
      console.error("Delete slide error:", error)
      toast.update(toastId, {
        render: "Xoá slide thất bại!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      })
      return false
    }
  }
}

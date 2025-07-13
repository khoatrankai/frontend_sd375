import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { toast } from "react-toastify"
const API_BASE_URL = process.env.NEXT_PUBLIC_API_CLIENT || "/api"

class ApiClient {
  private axiosInstance: AxiosInstance
  private token: string | null = null

  constructor(baseURL: string) {
    this.token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null

    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    })

    this.axiosInstance.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`
      }
      return config
    })
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token)
    }
  }

  removeToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
    }
  }

  private async handleRequest<T>(request: Promise<AxiosResponse<T>>): Promise<T> {
    try {
      const response = await request
      return response.data
    } catch (error: any) {
      console.error("API request failed:", error)
      throw error.response?.data || error
    }
  }

  get<T>(endpoint: string, params?: Record<string, any>) {
    return this.handleRequest<T>(
      this.axiosInstance.get<T>(endpoint, { params })
    )
  }

  post<T>(endpoint: string, data?: any) {
    return this.handleRequest<T>(
      this.axiosInstance.post<T>(endpoint, data)
    )
  }

  put<T>(endpoint: string, data?: any) {
    return this.handleRequest<T>(
      this.axiosInstance.put<T>(endpoint, data)
    )
  }

   patch<T>(endpoint: string, data?: any) {
    return this.handleRequest<T>(
      this.axiosInstance.patch<T>(endpoint, data)
    )
  }

  delete<T>(endpoint: string) {
    return this.handleRequest<T>(
      this.axiosInstance.delete<T>(endpoint)
    )
  }

  async upload<T>(endpoint: string, formData: FormData) {
    const toastId = toast.loading("Đang tạo ...")
    const res = await this.handleRequest<T>(
      this.axiosInstance.post<T>(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ) as any
    console.log(res)
    if(res.statusCode === 201 || res.statusCode === 200){
      toast.update(toastId, { render: "Tạo thành công!", type: "success", isLoading: false, autoClose: 3000 })
    }else{
      toast.update(toastId, { render: "Tạo thất bại!", type: "error", isLoading: false, autoClose: 3000 })
    }
    return res
  }

  async uploadPatch<T>(endpoint: string, formData: FormData) {
    const toastId = toast.loading("Đang tạo ...")
    const res = await this.handleRequest<T>(
      this.axiosInstance.patch<T>(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ) as any
    if(res.statusCode === 200){
      toast.update(toastId, { render: "Cập nhật thành công!", type: "success", isLoading: false, autoClose: 3000 })
    }else{
      toast.update(toastId, { render: "Cập nhật thất bại!", type: "error", isLoading: false, autoClose: 3000 })
    }
    return res
  }

  async uploadPut<T>(endpoint: string, formData: FormData) {
    const toastId = toast.loading("Đang tạo ...")
    const res = await this.handleRequest<T>(
      this.axiosInstance.put<T>(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ) as any
    if(res.statusCode === 200){
      toast.update(toastId, { render: "Cập nhật thành công!", type: "success", isLoading: false, autoClose: 3000 })
    }else{
      toast.update(toastId, { render: "Cập nhật thất bại!", type: "error", isLoading: false, autoClose: 3000 })
    }
    return res
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
import { apiClient } from "@/lib/api"
import { toast } from "react-toastify"
import type {
  Document,
  DocumentsResponse,
  PaginationParams,
  ApiResponse
} from "@/lib/types"

export class DocumentService {
  async getDocuments(params?: PaginationParams & { category?: string; type?: string }) {
    try {
      const response = await apiClient.get<any>("/documents", params)
      return response || { documents: [], total: 0, page: 1, limit: 10 }
    } catch (error) {
      console.error("Get documents error:", error)
      return { documents: [], total: 0, page: 1, limit: 10 }
    }
  }

  async getDocument(id: string) {
    try {
      const response = await apiClient.get<any>(`/documents/${id}`)
      return response || null
    } catch (error) {
      console.error("Get document error:", error)
      return null
    }
  }

  async createDocument(document: any) {
    const toastId = toast.loading("Đang tạo tài liệu...")
    try {
      const response = await apiClient.upload<any>("/documents", document)
      if (response?.statusCode === 201) {
        toast.update(toastId, { render: "Tạo thành công", type: "success", isLoading: false, autoClose: 3000 })
      } else {
        toast.update(toastId, { render: "Tạo thất bại", type: "error", isLoading: false, autoClose: 3000 })
      }
      return response || null
    } catch (error) {
      console.error("Create document error:", error)
      toast.update(toastId, { render: "Lỗi khi tạo tài liệu", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }

  async updateDocument(id: string, data: any) {
    const toastId = toast.loading("Đang cập nhật tài liệu...")
    try {
      const response = await apiClient.uploadPatch<any>(`/documents/${id}`, data)
      if (response?.statusCode === 200) {
        toast.update(toastId, { render: "Cập nhật thành công", type: "success", isLoading: false, autoClose: 3000 })
      } else {
        toast.update(toastId, { render: "Cập nhật thất bại", type: "error", isLoading: false, autoClose: 3000 })
      }
      return response || null
    } catch (error) {
      console.error("Update document error:", error)
      toast.update(toastId, { render: "Lỗi khi cập nhật", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }

  async deleteDocument(id: string) {
    const toastId = toast.loading("Đang xóa tài liệu...")
    try {
      const response = await apiClient.delete<any>(`/documents/${id}`)
      if (response?.statusCode === 200) {
        toast.update(toastId, { render: "Xóa thành công", type: "success", isLoading: false, autoClose: 3000 })
        return true
      } else {
        toast.update(toastId, { render: "Xóa thất bại", type: "error", isLoading: false, autoClose: 3000 })
        return false
      }
    } catch (error) {
      console.error("Delete document error:", error)
      toast.update(toastId, { render: "Lỗi khi xóa", type: "error", isLoading: false, autoClose: 3000 })
      return false
    }
  }

  async incrementDownloads(id: string) {
    try {
      const response = await apiClient.patch<any>(`/documents/${id}/downloads`)
      return response || null
    } catch (error) {
      console.error("Increment downloads error:", error)
      return null
    }
  }

  async getCategories() {
    try {
      const response = await apiClient.get<any>("/documents/categories")
      return response || []
    } catch (error) {
      console.error("Get categories error:", error)
      return []
    }
  }

  async createCategory(data: { name: string; description?: string }) {
    const toastId = toast.loading("Đang tạo danh mục...")
    try {
      const response = await apiClient.post<any>("/documents/categories", data)
      if (response?.statusCode === 201) {
        toast.update(toastId, { render: "Tạo danh mục thành công", type: "success", isLoading: false, autoClose: 3000 })
      } else {
        toast.update(toastId, { render: "Tạo danh mục thất bại", type: "error", isLoading: false, autoClose: 3000 })
      }
      return response || null
    } catch (error) {
      console.error("Create category error:", error)
      toast.update(toastId, { render: "Lỗi khi tạo danh mục", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }

  async getAgency() {
    try {
      const response = await apiClient.get<any>(`/documents/agency`)
      return response || []
    } catch (error) {
      console.error("Get agency error:", error)
      return []
    }
  }

  async createAgency(agency: { name: string; nametag: string }) {
    const toastId = toast.loading("Đang tạo cơ quan ban hành...")
    try {
      const response = await apiClient.post<any>(`/documents/agency`, agency)
      if (response?.statusCode === 201) {
        toast.update(toastId, { render: "Tạo thành công", type: "success", isLoading: false, autoClose: 3000 })
      } else {
        toast.update(toastId, { render: "Tạo thất bại", type: "error", isLoading: false, autoClose: 3000 })
      }
      return response || null
    } catch (error) {
      console.error("Create agency error:", error)
      toast.update(toastId, { render: "Lỗi khi tạo cơ quan", type: "error", isLoading: false, autoClose: 3000 })
      return null
    }
  }
}

export const documentService = new DocumentService()

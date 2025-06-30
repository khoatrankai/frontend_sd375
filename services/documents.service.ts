import { apiClient } from "@/lib/api"
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
    try {
      const response = await apiClient.upload<any>("/documents", document)
      return response || null
    } catch (error) {
      console.error("Create document error:", error)
      return null
    }
  }

  async updateDocument(id: string, data: any) {
    try {
      const response = await apiClient.uploadPatch<any>(`/documents/${id}`, data)
      return response || null
    } catch (error) {
      console.error("Update document error:", error)
      return null
    }
  }

  async deleteDocument(id: string) {
    try {
      const response = await apiClient.delete<any>(`/documents/${id}`)
      return response?.success ?? false
    } catch (error) {
      console.error("Delete document error:", error)
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
    try {
      const response = await apiClient.post<any>("/documents/categories", data)
      return response || null
    } catch (error) {
      console.error("Create category error:", error)
      return null
    }
  }
}

export const documentService = new DocumentService()

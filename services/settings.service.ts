import { apiClient } from "@/lib/api"
import type { SiteSettings, ApiResponse } from "@/lib/types"

export class SettingsService {
  async getSettings(): Promise<SiteSettings | null> {
    try {
      const response = await apiClient.get<ApiResponse<SiteSettings>>("/settings")
      return response || null
    } catch (error) {
      console.error("Get settings error:", error)
      return null
    }
  }

  async updateSettings(settings: Partial<SiteSettings>): Promise<boolean> {
    try {
      const response = await apiClient.put<ApiResponse>("/settings", settings)
      return response.success
    } catch (error) {
      console.error("Update settings error:", error)
      return false
    }
  }

  async createBackup(): Promise<boolean> {
    try {
      const response = await apiClient.post<ApiResponse>("/settings/backup")
      return response.success
    } catch (error) {
      console.error("Create backup error:", error)
      return false
    }
  }

  async restoreBackup(backupId: string): Promise<boolean> {
    try {
      const response = await apiClient.post<ApiResponse>("/settings/restore", { backupId })
      return response.success
    } catch (error) {
      console.error("Restore backup error:", error)
      return false
    }
  }

  async getBackupHistory(): Promise<any[]> {
    try {
      const response = await apiClient.get<ApiResponse<any[]>>("/settings/backups")
      return response || []
    } catch (error) {
      console.error("Get backup history error:", error)
      return []
    }
  }
}

export const settingsService = new SettingsService()

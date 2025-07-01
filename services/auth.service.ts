
import { apiLogin } from "@/lib/apiLogin"
import type { LoginCredentials, AuthResponse, User } from "@/lib/types"

export class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiLogin.post<AuthResponse>("/auth/login", credentials)

      if (response.success && response.token) {
        apiLogin.setToken(response.token)
      }

      return response
    } catch (error) {
      return {
        success: false,
        message: "Đăng nhập thất bại. Vui lòng thử lại.",
      }
    }
  }

  async logout(): Promise<void> {
    try {
      return await apiLogin.post("/auth/logout")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      // apiLogin.removeToken()
      // window.location.href = "/admin/login"
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await apiLogin.get<{ success: boolean; data: User }>("/auth/me")
      return response.success ? response.data : null
    } catch (error) {
      console.error("Get current user error:", error)
      return null
    }
  }

  async refreshToken(): Promise<boolean> {
    try {
      const response = await apiLogin.post<{ success: boolean; token: string }>("/auth/refresh")

      if (response.success && response.token) {
        apiLogin.setToken(response.token)
        return true
      }

      return false
    } catch (error) {
      console.error("Refresh token error:", error)
      return false
    }
  }

  isAuthenticated(): boolean {
    return typeof window !== "undefined" && !!localStorage.getItem("auth_token")
  }
}

export const authService = new AuthService()

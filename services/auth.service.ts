import { apiLogin } from "@/lib/apiLogin"
import type { LoginCredentials, AuthResponse, User } from "@/lib/types"
import { toast } from "react-toastify"

export class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const toastId = toast.loading("Đang đăng nhập...")

    try {
      const data = await apiLogin.post<AuthResponse>("/auth/login", credentials)

      if (data.success && data.token) {
        apiLogin.setToken(data.token)
        toast.update(toastId, {
          render: "Đăng nhập thành công",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        })
      } else {
        toast.update(toastId, {
          render: data.message || "Đăng nhập thất bại",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        })
      }

      return data
    } catch (error) {
      console.error("Login error:", error)
      toast.update(toastId, {
        render: "Đăng nhập thất bại. Vui lòng thử lại.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      })
      return {
        success: false,
        message: "Đăng nhập thất bại. Vui lòng thử lại.",
      }
    }
  }

  async logout(): Promise<void> {
    const toastId = toast.loading("Đang đăng xuất...")
    try {
      await apiLogin.post("/auth/logout")
      toast.update(toastId, {
        render: "Đăng xuất thành công",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      })
    } catch (error) {
      console.error("Logout error:", error)
      toast.update(toastId, {
        render: "Lỗi khi đăng xuất",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      })
    } finally {
      apiLogin.removeToken()
      window.location.href = "/admin/login"
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

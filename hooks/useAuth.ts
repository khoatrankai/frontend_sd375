"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { authService } from "@/services/auth.service"
import type { User } from "@/lib/types"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated on mount
    const initAuth = async () => {
      if (authService.isAuthenticated()) {
        const currentUser = await authService.getCurrentUser()
        setUser(currentUser)
      }
      setIsLoading(false)
    }

    initAuth()
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await authService.login({ username, password })

      if (response.success && response.user) {
        setUser(response.user)
        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await authService.logout()
      setUser(null)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const refreshUser = async (): Promise<void> => {
    try {
      const currentUser = await authService.getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      console.error("Refresh user error:", error)
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

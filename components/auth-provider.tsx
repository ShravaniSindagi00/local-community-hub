"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  bookmarks: string[]
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAdmin: boolean
  addBookmark: (placeId: string) => void
  removeBookmark: (placeId: string) => void
  isBookmarked: (placeId: string) => boolean
  syncGuestBookmarks: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Load user bookmarks from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("Error parsing saved user:", error)
      }
    }
  }, [])

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate authentication
    if (email === "admin@example.com" && password === "admin123") {
      const newUser = {
        id: "1",
        name: "Admin User",
        email: "admin@example.com",
        role: "admin" as const,
        bookmarks: [],
      }
      setUser(newUser)
      return true
    } else if (email && password) {
      const newUser = {
        id: "2",
        name: "Regular User",
        email: email,
        role: "user" as const,
        bookmarks: [],
      }
      setUser(newUser)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const addBookmark = (placeId: string) => {
    if (user) {
      // For logged-in users, update user bookmarks
      setUser((prev) =>
        prev
          ? {
              ...prev,
              bookmarks: [...prev.bookmarks.filter((id) => id !== placeId), placeId],
            }
          : null,
      )
    } else {
      // For guests, use localStorage
      const guestBookmarks = JSON.parse(localStorage.getItem("guestBookmarks") || "[]")
      const updatedBookmarks = [...guestBookmarks.filter((id: string) => id !== placeId), placeId]
      localStorage.setItem("guestBookmarks", JSON.stringify(updatedBookmarks))
    }
  }

  const removeBookmark = (placeId: string) => {
    if (user) {
      // For logged-in users, update user bookmarks
      setUser((prev) =>
        prev
          ? {
              ...prev,
              bookmarks: prev.bookmarks.filter((id) => id !== placeId),
            }
          : null,
      )
    } else {
      // For guests, use localStorage
      const guestBookmarks = JSON.parse(localStorage.getItem("guestBookmarks") || "[]")
      const updatedBookmarks = guestBookmarks.filter((id: string) => id !== placeId)
      localStorage.setItem("guestBookmarks", JSON.stringify(updatedBookmarks))
    }
  }

  const isBookmarked = (placeId: string): boolean => {
    if (user) {
      return user.bookmarks.includes(placeId)
    } else {
      const guestBookmarks = JSON.parse(localStorage.getItem("guestBookmarks") || "[]")
      return guestBookmarks.includes(placeId)
    }
  }

  const syncGuestBookmarks = () => {
    if (user) {
      const guestBookmarks = JSON.parse(localStorage.getItem("guestBookmarks") || "[]")
      if (guestBookmarks.length > 0) {
        // Merge guest bookmarks with user bookmarks
        const mergedBookmarks = [...new Set([...user.bookmarks, ...guestBookmarks])]
        setUser((prev) => (prev ? { ...prev, bookmarks: mergedBookmarks } : null))
        // Clear guest bookmarks after sync
        localStorage.removeItem("guestBookmarks")
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAdmin: user?.role === "admin",
        addBookmark,
        removeBookmark,
        isBookmarked,
        syncGuestBookmarks,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

"use client"

import { useState, useEffect } from "react"
import { apiClient, type User } from "@/lib/api"
import Header from "@/components/layout/Header"
import LoginForm from "@/components/auth/LoginForm"
import RegisterForm from "@/components/auth/RegisterForm"
import Dashboard from "@/components/dashboard/Dashboard"
import { Building2, Shield, FileText, Clock } from "lucide-react"

type AuthMode = "login" | "register"

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [authMode, setAuthMode] = useState<AuthMode>("login")
  const [authError, setAuthError] = useState<string>("")
  const [authLoading, setAuthLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    // Check for existing token on page load
    const token = localStorage.getItem("token")
    if (token) {
      apiClient.setToken(token)
      // You could verify the token here by making an API call
    }
    setInitialLoading(false)
  }, [])

  const handleLogin = async (data: { email: string; password: string }) => {
    // Bypass authentication and set a dummy user
    const dummyUser = {
      id: 1,
      name: "Test User",
      email: data.email || "test@example.com",
      createdAt: new Date().toISOString(),
    }
    setUser(dummyUser)
  }

  const handleRegister = async (data: { name: string; email: string; password: string }) => {
    try {
      setAuthLoading(true)
      setAuthError("")
      await apiClient.register(data)
      // After successful registration, automatically log in
      await handleLogin({ email: data.email, password: data.password })
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Registration failed")
      setAuthLoading(false)
    }
  }

  const handleLogout = () => {
    apiClient.clearToken()
    setUser(null)
  }

  const toggleAuthMode = () => {
    setAuthMode(authMode === "login" ? "register" : "login")
    setAuthError("")
  }

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--nav-bg)]"></div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={user} onLogout={handleLogout} />
        <Dashboard user={user} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[var(--bg-primary)] to-[var(--nav-bg)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Department of Land Registration</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Streamlined government land registration and services portal for citizens
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Digital Applications</h3>
              <p className="text-white/80">Submit and track your land service requests online</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure & Compliant</h3>
              <p className="text-white/80">Government-grade security and data protection</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Processing</h3>
              <p className="text-white/80">Reduced processing times and instant updates</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Comprehensive Services</h3>
              <p className="text-white/80">All land-related services in one platform</p>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            {authMode === "login" ? (
              <LoginForm
                onSubmit={handleLogin}
                onToggleMode={toggleAuthMode}
                isLoading={authLoading}
                error={authError}
              />
            ) : (
              <RegisterForm
                onSubmit={handleRegister}
                onToggleMode={toggleAuthMode}
                isLoading={authLoading}
                error={authError}
              />
            )}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* New Services */}
            <div className="surface-card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Land Transfer</h3>
              <p className="text-gray-600 mb-4">
                Register the transfer of land ownership from the seller to the buyer with full legal documentation and verification.
              </p>
            </div>

            <div className="surface-card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Application for Copy of Land Registers</h3>
              <p className="text-gray-600 mb-4">
                Request an officially certified copy of land records for legal, administrative, or personal reference purposes.
              </p>
            </div>

            <div className="surface-card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Application for Search of Land Registers</h3>
              <p className="text-gray-600 mb-4">
                Conduct a search in the official land registry to verify ownership details, boundaries, and encumbrances.
              </p>
            </div>

            <div className="surface-card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Application for Search Duplicate of Deeds</h3>
              <p className="text-gray-600 mb-4">
                Locate and review registered land records to confirm property history and registration details.
              </p>
            </div>

            <div className="surface-card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Application for Copy</h3>
              <p className="text-gray-600 mb-4">
                Request a duplicate copy of a registered deed when the original document has been lost or damaged.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg">
                <Building2 className="w-7 h-7" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold">Department of Land Registration</h3>
                <p className="text-sm text-gray-300">Land Services</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">Serving citizens with efficient and transparent land services</p>
            <p className="text-sm text-gray-400">© 2024 Department of Land Registration Land Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

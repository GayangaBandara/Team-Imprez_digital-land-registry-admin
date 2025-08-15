"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface DashboardProps {
  user: any
}

export default function Dashboard({ user }: DashboardProps) {
  const router = useRouter()

  useEffect(() => {
    // Redirect to admin dashboard
    router.push("/admin")
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to dashboard...</p>
      </div>
    </div>
  )
}

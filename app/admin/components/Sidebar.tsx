"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, Users, BarChart3, Shield, Bell, Calendar, Eye } from "lucide-react"
import Image from "next/image"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Applications", href: "/admin/applications", icon: FileText },
  { name: "Documents", href: "/admin/documents", icon: Eye },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Audit Logs", href: "/admin/audit", icon: Shield },
  { name: "Notifications", href: "/admin/notifications", icon: Bell },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 shadow-lg">
      {/* Header */}
      <div className="h-28 px-6 py-4 border-b border-gray-100 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center">
            <Image
              src="/sri-lanka-logo.png"
              alt="Sri Lanka Government"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold font-cabinet text-black">Department of Land Registration</h1>
            <p className="text-sm text-gray-600 font-inter capitalize">Government Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8 px-6">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-6 py-2 rounded-lg transition-colors ${
                    isActive ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-inter">{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

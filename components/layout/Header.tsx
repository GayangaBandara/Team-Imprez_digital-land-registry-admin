"use client"

import { User } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Building2 } from "lucide-react"
import Image from "next/image"

interface HeaderProps {
  user?: User | null
  onLogout?: () => void
}

export default function Header({ user, onLogout }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10">
              <Image
                src="/sri-lanka-logo.png"
                alt="Department of Land Registration Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="text-xl font-bold text-gray-900">Department of Land Registration</div>
              <div className="text-sm text-gray-500">Digital Services Hub Admin</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <span className="text-sm text-gray-700">Welcome, {user.name}</span>
                <Button
                  variant="outline"
                  onClick={onLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

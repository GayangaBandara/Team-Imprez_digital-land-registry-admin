"use client"

import { useState } from "react"
import {
  Bell,
  Search,
  Settings,
  User,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  LogOut,
  UserCog,
  KeyRound,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: "success",
    title: "Application Approved",
    message: "Land registration APP-00123 has been approved successfully",
    time: "2 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "warning",
    title: "Document Review Required",
    message: "Document DOC-00456 requires manual verification",
    time: "15 minutes ago",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "System Maintenance",
    message: "Scheduled maintenance will occur tonight at 2:00 AM",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 4,
    type: "success",
    title: "Payment Processed",
    message: "Payment for application APP-00789 has been processed",
    time: "2 hours ago",
    read: true,
  },
]

const notificationIcons = {
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
}

const notificationColors = {
  success: "text-green-600",
  warning: "text-yellow-600",
  info: "text-blue-600",
}

export default function Header() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const router = useRouter()

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleNotificationClick = () => {
    console.log("[Admin] Notification icon clicked")
    setIsNotificationOpen(!isNotificationOpen)
  }

  const markAsRead = (notificationId: number) => {
    console.log("[Admin] Marking notification as read:", notificationId)
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    console.log("[Admin] Marking all notifications as read")
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (notificationId: number) => {
    console.log("[Admin] Removing notification:", notificationId)
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
  }

  const handleProfileSettings = () => {
    console.log("[Admin] Opening profile settings")
    router.push("/admin/profile/settings")
  }

  const handleChangePassword = () => {
    console.log("[Admin] Opening change password")
    router.push("/admin/profile/change-password")
  }

  const handleActivityLog = () => {
    console.log("[Admin] Opening activity log")
    router.push("/admin/profile/activity-log")
  }

  const handleSignOut = () => {
    console.log("[Admin] Signing out user")
    // Clear any stored tokens/session data
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    // Redirect to login page
    router.push("/")
  }

  return (
    <header className="h-20 px-6 py-4 border-b border-gray-100 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search applications, users, documents..." className="pl-10 w-80" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative" onClick={handleNotificationClick}>
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-medium">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-blue-600 hover:text-blue-700"
                      onClick={markAllAsRead}
                    >
                      Mark all as read
                    </Button>
                  )}
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No notifications</p>
                  </div>
                ) : (
                  notifications.map((notification) => {
                    const IconComponent = notificationIcons[notification.type as keyof typeof notificationIcons]
                    return (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                          !notification.read ? "bg-blue-50/50" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex-shrink-0 ${notificationColors[notification.type as keyof typeof notificationColors]}`}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 mb-1">{notification.title}</p>
                                <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                                <p className="text-xs text-gray-500">{notification.time}</p>
                              </div>
                              <div className="flex items-center gap-1 ml-2">
                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 text-blue-600 hover:text-blue-700"
                                    onClick={() => markAsRead(notification.id)}
                                  >
                                    <CheckCircle className="w-3 h-3" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                                  onClick={() => removeNotification(notification.id)}
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full absolute left-2 top-4"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              {notifications.length > 0 && (
                <div className="p-3 border-t border-gray-100">
                  <Button variant="ghost" className="w-full text-sm text-blue-600 hover:text-blue-700">
                    View all notifications
                  </Button>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>System Settings</DropdownMenuItem>
              <DropdownMenuItem>User Management</DropdownMenuItem>
              <DropdownMenuItem>Security Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                <User className="w-5 h-5 text-white" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@landregistry.gov.lk</p>
              </div>

              <DropdownMenuItem onClick={handleProfileSettings} className="cursor-pointer">
                <UserCog className="w-4 h-4 mr-2" />
                Profile Settings
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleChangePassword} className="cursor-pointer">
                <KeyRound className="w-4 h-4 mr-2" />
                Change Password
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleActivityLog} className="cursor-pointer">
                <Activity className="w-4 h-4 mr-2" />
                Activity Log
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600 focus:text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

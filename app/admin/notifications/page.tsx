"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Bell, Plus, AlertTriangle, Info, CheckCircle, XCircle, Send, Eye, Trash2, Users, Clock } from "lucide-react"

// Mock notifications data
const mockNotifications = [
  {
    id: "NOT001",
    title: "System Maintenance Scheduled",
    message:
      "Scheduled maintenance will occur on January 20th from 2:00 AM to 4:00 AM. All services will be temporarily unavailable.",
    type: "warning",
    priority: "high",
    status: "active",
    createdAt: "2024-01-15 10:00:00",
    expiresAt: "2024-01-20 04:00:00",
    targetAudience: "all_users",
    createdBy: "admin@landregistry.gov.lk",
    readCount: 45,
    totalUsers: 120,
  },
  {
    id: "NOT002",
    title: "New Document Verification Feature",
    message:
      "We've introduced AI-powered document verification to improve processing speed and accuracy. Check out the new features in the document verification section.",
    type: "info",
    priority: "medium",
    status: "active",
    createdAt: "2024-01-14 14:30:00",
    expiresAt: "2024-01-30 23:59:59",
    targetAudience: "reviewers",
    createdBy: "admin@landregistry.gov.lk",
    readCount: 28,
    totalUsers: 35,
  },
  {
    id: "NOT003",
    title: "Security Alert: Unusual Login Activity",
    message:
      "Multiple failed login attempts detected from suspicious IP addresses. Please ensure your passwords are secure and report any unauthorized access.",
    type: "error",
    priority: "high",
    status: "active",
    createdAt: "2024-01-15 09:15:00",
    expiresAt: "2024-01-16 23:59:59",
    targetAudience: "all_users",
    createdBy: "system",
    readCount: 67,
    totalUsers: 120,
  },
  {
    id: "NOT004",
    title: "Application Processing Milestone",
    message:
      "Congratulations! We've successfully processed over 10,000 applications this month, achieving a 94% completion rate.",
    type: "success",
    priority: "low",
    status: "active",
    createdAt: "2024-01-13 16:45:00",
    expiresAt: "2024-01-25 23:59:59",
    targetAudience: "all_users",
    createdBy: "admin@landregistry.gov.lk",
    readCount: 89,
    totalUsers: 120,
  },
  {
    id: "NOT005",
    title: "Training Session: New Workflow",
    message:
      "Mandatory training session on the new application workflow will be held on January 18th at 2:00 PM. Please confirm your attendance.",
    type: "info",
    priority: "medium",
    status: "expired",
    createdAt: "2024-01-10 11:00:00",
    expiresAt: "2024-01-18 14:00:00",
    targetAudience: "staff",
    createdBy: "hr@landregistry.gov.lk",
    readCount: 42,
    totalUsers: 85,
  },
]

const typeColors = {
  info: "bg-blue-100 text-blue-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
  success: "bg-green-100 text-green-800",
}

const priorityColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
}

const typeIcons = {
  info: Info,
  warning: AlertTriangle,
  error: XCircle,
  success: CheckCircle,
}

export default function NotificationsPage() {
  const [notifications] = useState(mockNotifications)
  const [filteredNotifications, setFilteredNotifications] = useState(mockNotifications)
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isNewNotificationOpen, setIsNewNotificationOpen] = useState(false)

  // Filter notifications
  React.useEffect(() => {
    const filtered = notifications.filter((notification) => {
      const matchesType = typeFilter === "all" || notification.type === typeFilter
      const matchesStatus = statusFilter === "all" || notification.status === statusFilter
      return matchesType && matchesStatus
    })

    setFilteredNotifications(filtered)
  }, [typeFilter, statusFilter, notifications])

  const handleCreateNotification = (notificationData: any) => {
    console.log("[Admin] Creating notification:", notificationData)
    setIsNewNotificationOpen(false)
  }

  const handleDeleteNotification = (notificationId: string) => {
    console.log("[Admin] Deleting notification:", notificationId)
  }

  const getReadPercentage = (readCount: number, totalUsers: number) => {
    return Math.round((readCount / totalUsers) * 100)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">Manage system notifications and announcements</p>
        </div>
        <div className="flex gap-3">
          <Dialog open={isNewNotificationOpen} onOpenChange={setIsNewNotificationOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Notification
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Notification</DialogTitle>
              </DialogHeader>
              <NewNotificationForm onSubmit={handleCreateNotification} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.filter((n) => n.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Currently visible</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notifications.filter((n) => n.priority === "high" && n.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.reduce((sum, n) => sum + n.readCount, 0)}</div>
            <p className="text-xs text-muted-foreground">Total reads</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Read Rate</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                notifications.reduce((sum, n) => sum + getReadPercentage(n.readCount, n.totalUsers), 0) /
                  notifications.length,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">Average engagement</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="success">Success</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => {
          const TypeIcon = typeIcons[notification.type as keyof typeof typeIcons]
          const readPercentage = getReadPercentage(notification.readCount, notification.totalUsers)

          return (
            <Card key={notification.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${typeColors[notification.type as keyof typeof typeColors]}`}>
                      <TypeIcon className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{notification.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge className={typeColors[notification.type as keyof typeof typeColors]}>
                          {notification.type}
                        </Badge>
                        <Badge className={priorityColors[notification.priority as keyof typeof priorityColors]}>
                          {notification.priority} priority
                        </Badge>
                        <Badge variant={notification.status === "active" ? "default" : "secondary"}>
                          {notification.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteNotification(notification.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{notification.message}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Created: {notification.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Expires: {notification.expiresAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Target: {notification.targetAudience.replace("_", " ")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">
                      Read: {notification.readCount}/{notification.totalUsers} ({readPercentage}%)
                    </span>
                  </div>
                </div>

                {/* Read Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Read Progress</span>
                    <span className="font-medium">{readPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        readPercentage >= 80 ? "bg-green-500" : readPercentage >= 50 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${readPercentage}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

// New Notification Form Component
function NewNotificationForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "info",
    priority: "medium",
    targetAudience: "all_users",
    expiresAt: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter notification title"
          required
        />
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Enter notification message"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="success">Success</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="priority">Priority</Label>
          <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="targetAudience">Target Audience</Label>
          <Select
            value={formData.targetAudience}
            onValueChange={(value) => setFormData({ ...formData, targetAudience: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_users">All Users</SelectItem>
              <SelectItem value="reviewers">Reviewers</SelectItem>
              <SelectItem value="staff">Staff</SelectItem>
              <SelectItem value="admins">Admins</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="expiresAt">Expires At</Label>
          <Input
            id="expiresAt"
            type="datetime-local"
            value={formData.expiresAt}
            onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
        <Send className="w-4 h-4 mr-2" />
        Create Notification
      </Button>
    </form>
  )
}

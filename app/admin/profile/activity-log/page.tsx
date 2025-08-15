"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Activity, Download, Filter, Calendar, MapPin, Monitor, Globe } from "lucide-react"
import Link from "next/link"

// Mock activity data
const mockActivities = [
  {
    id: 1,
    action: "Login",
    description: "Successful login to admin dashboard",
    timestamp: "2024-01-15 09:30:45",
    ipAddress: "192.168.1.100",
    device: "Chrome on Windows",
    location: "Colombo, Sri Lanka",
    status: "success",
  },
  {
    id: 2,
    action: "Document Review",
    description: "Reviewed and approved document DOC-00123",
    timestamp: "2024-01-15 10:15:22",
    ipAddress: "192.168.1.100",
    device: "Chrome on Windows",
    location: "Colombo, Sri Lanka",
    status: "success",
  },
  {
    id: 3,
    action: "Application Update",
    description: "Updated status of application APP-00456 to 'Under Review'",
    timestamp: "2024-01-15 11:45:10",
    ipAddress: "192.168.1.100",
    device: "Chrome on Windows",
    location: "Colombo, Sri Lanka",
    status: "success",
  },
  {
    id: 4,
    action: "Failed Login",
    description: "Failed login attempt with incorrect password",
    timestamp: "2024-01-14 16:20:33",
    ipAddress: "203.94.94.123",
    device: "Firefox on Android",
    location: "Kandy, Sri Lanka",
    status: "warning",
  },
  {
    id: 5,
    action: "Profile Update",
    description: "Updated profile information and contact details",
    timestamp: "2024-01-14 14:30:15",
    ipAddress: "192.168.1.100",
    device: "Chrome on Windows",
    location: "Colombo, Sri Lanka",
    status: "success",
  },
]

const statusColors = {
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
}

const actionIcons = {
  Login: Globe,
  "Document Review": Activity,
  "Application Update": Activity,
  "Failed Login": Globe,
  "Profile Update": Activity,
}

export default function ActivityLogPage() {
  const [activities] = useState(mockActivities)
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterAction, setFilterAction] = useState("all")

  const filteredActivities = activities.filter((activity) => {
    const statusMatch = filterStatus === "all" || activity.status === filterStatus
    const actionMatch = filterAction === "all" || activity.action === filterAction
    return statusMatch && actionMatch
  })

  const handleExport = () => {
    console.log("[Admin] Exporting activity log")
    // Here you would typically generate and download a CSV/PDF report
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">Activity Log</h1>
          <p className="text-gray-600 mt-1">Track your account activity and security events</p>
        </div>
        <Button onClick={handleExport} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Log
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="Login">Login</SelectItem>
                  <SelectItem value="Document Review">Document Review</SelectItem>
                  <SelectItem value="Application Update">Application Update</SelectItem>
                  <SelectItem value="Profile Update">Profile Update</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Activity ({filteredActivities.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredActivities.map((activity) => {
              const IconComponent = actionIcons[activity.action as keyof typeof actionIcons] || Activity
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">{activity.action}</h3>
                          <Badge className={statusColors[activity.status as keyof typeof statusColors]}>
                            {activity.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{activity.description}</p>

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {activity.timestamp}
                          </div>
                          <div className="flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {activity.ipAddress}
                          </div>
                          <div className="flex items-center gap-1">
                            <Monitor className="w-3 h-3" />
                            {activity.device}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {activity.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Users, Clock, CheckCircle, TrendingUp, Eye, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock data for dashboard overview
const dashboardStats = {
  totalApplications: 1380,
  pendingReview: 245,
  completedToday: 67,
  activeUsers: 89,
  avgProcessingTime: "3.2 days",
  completionRate: "94.2%",
}

const recentApplications = [
  {
    id: "APP-00123",
    applicant: "Ayesha Perera",
    nic: "902345678V",
    type: "Land Registration",
    status: "pending",
    submittedAt: "2024-01-15 14:30",
  },
  {
    id: "APP-00124",
    applicant: "Saman Peris",
    nic: "435345678V",
    type: "Title Transfer",
    status: "under_review",
    submittedAt: "2024-01-15 13:45",
  },
  {
    id: "APP-00125",
    applicant: "Kamal Silva",
    nic: "234345678V",
    type: "Subdivision",
    status: "approved",
    submittedAt: "2024-01-15 12:20",
  },
]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  under_review: "bg-blue-100 text-blue-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
}

export default function AdminDashboard() {
  const router = useRouter()

  const handleReviewApplication = (applicationId: string) => {
    console.log("[Admin] Navigating to review application:", applicationId)
    router.push(`/admin/applications/${applicationId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-cabinet">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2 font-inter">Government of Sri Lanka - Department of Land Registration</p>
        </div>
        <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalApplications.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.pendingReview}</div>
            <p className="text-xs text-muted-foreground">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.completedToday}</div>
            <p className="text-xs text-muted-foreground">{dashboardStats.completionRate} completion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">Online in last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent Applications</span>
            <Link href="/admin/applications">
              <Button variant="outline" size="sm" className="bg-transparent">
                View All
              </Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentApplications.map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{app.applicant}</div>
                    <div className="text-sm text-gray-600">
                      {app.id} • {app.type}
                    </div>
                    <div className="text-xs text-gray-500">{app.submittedAt}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={statusColors[app.status as keyof typeof statusColors]}>
                    {app.status.replace("_", " ")}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                    onClick={() => handleReviewApplication(app.id)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

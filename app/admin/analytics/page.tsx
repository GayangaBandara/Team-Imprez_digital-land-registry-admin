"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { TrendingUp, TrendingDown, FileText, Clock, AlertTriangle, Download } from "lucide-react"
import { useState } from "react"

// Mock data for analytics
const volumeByOfficeData = [
  { office: "Colombo", applications: 450, completed: 380, pending: 70 },
  { office: "Kandy", applications: 320, completed: 280, pending: 40 },
  { office: "Galle", applications: 280, completed: 240, pending: 40 },
  { office: "Matara", applications: 180, completed: 160, pending: 20 },
  { office: "Jaffna", applications: 150, completed: 130, pending: 20 },
]

const slaMetricsData = [
  { month: "Jan", target: 95, actual: 92, applications: 1200 },
  { month: "Feb", target: 95, actual: 94, applications: 1100 },
  { month: "Mar", target: 95, actual: 89, applications: 1350 },
  { month: "Apr", target: 95, actual: 96, applications: 1250 },
  { month: "May", target: 95, actual: 93, applications: 1400 },
  { month: "Jun", target: 95, actual: 97, applications: 1300 },
]

const rejectionReasonsData = [
  { reason: "Incomplete Documents", count: 45, percentage: 35 },
  { reason: "Invalid Signatures", count: 32, percentage: 25 },
  { reason: "Poor Image Quality", count: 25, percentage: 19 },
  { reason: "Missing Information", count: 18, percentage: 14 },
  { reason: "Technical Issues", count: 9, percentage: 7 },
]

const peakHoursData = [
  { hour: "08:00", applications: 12 },
  { hour: "09:00", applications: 28 },
  { hour: "10:00", applications: 45 },
  { hour: "11:00", applications: 52 },
  { hour: "12:00", applications: 38 },
  { hour: "13:00", applications: 25 },
  { hour: "14:00", applications: 42 },
  { hour: "15:00", applications: 48 },
  { hour: "16:00", applications: 35 },
  { hour: "17:00", applications: 18 },
]

const applicationTrendsData = [
  { month: "Jan", landReg: 320, titleTransfer: 280, subdivision: 150 },
  { month: "Feb", landReg: 290, titleTransfer: 310, subdivision: 140 },
  { month: "Mar", landReg: 380, titleTransfer: 290, subdivision: 180 },
  { month: "Apr", landReg: 350, titleTransfer: 320, subdivision: 160 },
  { month: "May", landReg: 420, titleTransfer: 340, subdivision: 190 },
  { month: "Jun", landReg: 390, titleTransfer: 360, subdivision: 170 },
]

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

const chartConfig = {
  applications: {
    label: "Applications",
    color: "hsl(var(--chart-1))",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-2))",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-3))",
  },
  target: {
    label: "Target",
    color: "hsl(var(--chart-4))",
  },
  actual: {
    label: "Actual",
    color: "hsl(var(--chart-5))",
  },
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months")

  const handleExport = () => {
    console.log("[Admin] Exporting analytics data")
    // Implement export functionality
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Performance metrics and insights</p>
        </div>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExport} className="bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,380</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Processing Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2 days</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="w-3 h-3 mr-1 text-green-500" />
              -0.5 days from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejection Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.5%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="w-3 h-3 mr-1 text-green-500" />
              -1.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Volume by Office */}
        <Card>
          <CardHeader>
            <CardTitle>Application Volume by Office</CardTitle>
            <CardDescription>Total applications processed by each office</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeByOfficeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="office" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="completed" fill="var(--color-completed)" name="Completed" />
                  <Bar dataKey="pending" fill="var(--color-pending)" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* SLA Performance */}
        <Card>
          <CardHeader>
            <CardTitle>SLA Performance</CardTitle>
            <CardDescription>Target vs actual completion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={slaMetricsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[85, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="var(--color-target)"
                    strokeDasharray="5 5"
                    name="Target"
                  />
                  <Line type="monotone" dataKey="actual" stroke="var(--color-actual)" name="Actual" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Rejection Reasons */}
        <Card>
          <CardHeader>
            <CardTitle>Rejection Reasons</CardTitle>
            <CardDescription>Common reasons for application rejection</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={rejectionReasonsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percentage }) => `${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {rejectionReasonsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {rejectionReasonsData.map((item, index) => (
                <div key={item.reason} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span>{item.reason}</span>
                  </div>
                  <Badge variant="secondary">{item.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Peak Hours */}
        <Card>
          <CardHeader>
            <CardTitle>Peak Application Hours</CardTitle>
            <CardDescription>Application submission patterns throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peakHoursData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="applications" fill="var(--color-applications)" name="Applications" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Application Types Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Application Types Trend</CardTitle>
          <CardDescription>Monthly breakdown of different application types</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={applicationTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="landReg" stroke="#3b82f6" strokeWidth={2} name="Land Registration" />
                <Line type="monotone" dataKey="titleTransfer" stroke="#10b981" strokeWidth={2} name="Title Transfer" />
                <Line type="monotone" dataKey="subdivision" stroke="#f59e0b" strokeWidth={2} name="Subdivision" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Performing Office</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-green-600">Colombo Main</div>
              <div className="text-sm text-gray-600">380 applications completed</div>
              <div className="text-sm text-gray-600">97.2% completion rate</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Most Common Application</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-blue-600">Land Registration</div>
              <div className="text-sm text-gray-600">42% of total applications</div>
              <div className="text-sm text-gray-600">Average 3.1 days processing</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Peak Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-orange-600">11:00 AM</div>
              <div className="text-sm text-gray-600">52 applications per hour</div>
              <div className="text-sm text-gray-600">Highest submission rate</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

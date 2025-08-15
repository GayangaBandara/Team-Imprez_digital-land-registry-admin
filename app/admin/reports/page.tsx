"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const metrics = [
  { title: "Total Applications", value: "1,234", icon: "📄" },
  { title: "Approved Applications", value: "856", icon: "✅" },
  { title: "Pending Applications", value: "234", icon: "⏳" },
  { title: "Total Revenue", value: "$45,678", icon: "💰" },
]

const chartData = [
  { month: "Jan", applications: 65 },
  { month: "Feb", applications: 78 },
  { month: "Mar", applications: 90 },
  { month: "Apr", applications: 81 },
  { month: "May", applications: 95 },
  { month: "Jun", applications: 102 },
]

const pieData = [
  { name: "Approved", value: 856, color: "#10B981" },
  { name: "Pending", value: 234, color: "#F59E0B" },
  { name: "Rejected", value: 144, color: "#EF4444" },
]

export default function AnalyticsReports() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800">Analytics & Reports</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <span className="text-2xl">{metric.icon}</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Application Trends Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

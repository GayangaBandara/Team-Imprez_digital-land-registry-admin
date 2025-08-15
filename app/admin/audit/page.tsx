"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Filter,
  Download,
  Eye,
  User,
  FileText,
  Settings,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

// Mock audit log data
const mockAuditLogs = [
  {
    id: "AUD001",
    timestamp: "2024-01-15 14:30:25",
    user: "admin@landregistry.gov.lk",
    action: "APPLICATION_APPROVED",
    resource: "Application APP001",
    details: "Approved land registration application for John Doe",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    severity: "info",
    category: "application",
  },
  {
    id: "AUD002",
    timestamp: "2024-01-15 14:25:12",
    user: "reviewer@landregistry.gov.lk",
    action: "DOCUMENT_VERIFIED",
    resource: "Document DOC001",
    details: "Verified title deed document with AI score 92%",
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    severity: "info",
    category: "document",
  },
  {
    id: "AUD003",
    timestamp: "2024-01-15 14:20:45",
    user: "system",
    action: "LOGIN_FAILED",
    resource: "User Authentication",
    details: "Failed login attempt for user: test@example.com",
    ipAddress: "203.94.123.45",
    userAgent: "Mozilla/5.0 (Linux; Android 10)",
    severity: "warning",
    category: "security",
  },
  {
    id: "AUD004",
    timestamp: "2024-01-15 14:15:30",
    user: "admin@landregistry.gov.lk",
    action: "USER_CREATED",
    resource: "User newuser@landregistry.gov.lk",
    details: "Created new user account with reviewer role",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    severity: "info",
    category: "user",
  },
  {
    id: "AUD005",
    timestamp: "2024-01-15 14:10:15",
    user: "system",
    action: "BACKUP_COMPLETED",
    resource: "Database Backup",
    details: "Daily database backup completed successfully",
    ipAddress: "127.0.0.1",
    userAgent: "System Process",
    severity: "info",
    category: "system",
  },
  {
    id: "AUD006",
    timestamp: "2024-01-15 14:05:22",
    user: "reviewer@landregistry.gov.lk",
    action: "APPLICATION_REJECTED",
    resource: "Application APP003",
    details: "Rejected application due to incomplete documents",
    ipAddress: "192.168.1.102",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    severity: "warning",
    category: "application",
  },
  {
    id: "AUD007",
    timestamp: "2024-01-15 13:58:10",
    user: "system",
    action: "SECURITY_ALERT",
    resource: "System Security",
    details: "Multiple failed login attempts detected from IP 203.94.123.45",
    ipAddress: "203.94.123.45",
    userAgent: "Various",
    severity: "error",
    category: "security",
  },
]

const severityColors = {
  info: "bg-blue-100 text-blue-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
  success: "bg-green-100 text-green-800",
}

const categoryIcons = {
  application: FileText,
  document: FileText,
  user: User,
  security: Shield,
  system: Settings,
}

export default function AuditLogsPage() {
  const [auditLogs] = useState(mockAuditLogs)
  const [filteredLogs, setFilteredLogs] = useState(mockAuditLogs)
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Filter logs based on search and filters
  const applyFilters = () => {
    const filtered = auditLogs.filter((log) => {
      const matchesSearch =
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.resource.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesSeverity = severityFilter === "all" || log.severity === severityFilter
      const matchesCategory = categoryFilter === "all" || log.category === categoryFilter

      return matchesSearch && matchesSeverity && matchesCategory
    })

    setFilteredLogs(filtered)
    setCurrentPage(1)
  }

  // Apply filters when search or filter values change
  React.useEffect(() => {
    applyFilters()
  }, [searchTerm, severityFilter, categoryFilter])

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentLogs = filteredLogs.slice(startIndex, endIndex)

  const handleExport = () => {
    console.log("[Admin] Exporting audit logs")
    // Implement CSV export functionality
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "error":
        return <AlertTriangle className="w-4 h-4" />
      case "warning":
        return <AlertTriangle className="w-4 h-4" />
      case "success":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-600 mt-1">System activity and security monitoring</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleExport} className="bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditLogs.length}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Events</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditLogs.filter((log) => log.category === "security").length}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Actions</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {auditLogs.filter((log) => log.severity === "error" || log.severity === "warning").length}
            </div>
            <p className="text-xs text-muted-foreground">Error & warning events</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(auditLogs.filter((log) => log.user !== "system").map((log) => log.user)).size}
            </div>
            <p className="text-xs text-muted-foreground">Unique users today</p>
          </CardContent>
        </Card>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="success">Success</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="application">Application</SelectItem>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentLogs.map((log) => {
                const CategoryIcon = categoryIcons[log.category as keyof typeof categoryIcons] || FileText

                return (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{log.user}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getSeverityIcon(log.severity)}
                        <span className="font-medium">{log.action}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CategoryIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{log.resource}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={severityColors[log.severity as keyof typeof severityColors]}>
                        {log.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.category}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredLogs.length)} of {filteredLogs.length} logs
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-8 h-8"
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

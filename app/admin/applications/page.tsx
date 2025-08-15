"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

// Mock data for applications
const mockApplications = [
  {
    id: "APP001",
    applicantName: "John Doe",
    nic: "123456789V",
    type: "Land Registration",
    district: "Colombo",
    status: "pending",
    submittedDate: "2024-01-15",
    aiScore: 85,
    priority: "high",
  },
  {
    id: "APP002",
    applicantName: "Jane Smith",
    nic: "987654321V",
    type: "Title Transfer",
    district: "Kandy",
    status: "approved",
    submittedDate: "2024-01-14",
    aiScore: 92,
    priority: "medium",
  },
  {
    id: "APP003",
    applicantName: "Mike Johnson",
    nic: "456789123V",
    type: "Subdivision",
    district: "Galle",
    status: "rejected",
    submittedDate: "2024-01-13",
    aiScore: 45,
    priority: "low",
  },
  {
    id: "APP004",
    applicantName: "Sarah Wilson",
    nic: "789123456V",
    type: "Land Registration",
    district: "Colombo",
    status: "under_review",
    submittedDate: "2024-01-12",
    aiScore: 78,
    priority: "high",
  },
  {
    id: "APP005",
    applicantName: "David Brown",
    nic: "321654987V",
    type: "Title Transfer",
    district: "Matara",
    status: "pending",
    submittedDate: "2024-01-11",
    aiScore: 88,
    priority: "medium",
  },
]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  under_review: "bg-blue-100 text-blue-800",
}

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-gray-100 text-gray-800",
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState(mockApplications)
  const [filteredApplications, setFilteredApplications] = useState(mockApplications)
  const [selectedApplications, setSelectedApplications] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [districtFilter, setDistrictFilter] = useState("all")

  // Filter applications based on search and filters
  useEffect(() => {
    const filtered = applications.filter((app) => {
      const matchesSearch =
        app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.nic.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || app.status === statusFilter
      const matchesType = typeFilter === "all" || app.type === typeFilter
      const matchesDistrict = districtFilter === "all" || app.district === districtFilter

      return matchesSearch && matchesStatus && matchesType && matchesDistrict
    })

    setFilteredApplications(filtered)
    setCurrentPage(1)
  }, [searchTerm, statusFilter, typeFilter, districtFilter, applications])

  // Pagination
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentApplications = filteredApplications.slice(startIndex, endIndex)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedApplications(currentApplications.map((app) => app.id))
    } else {
      setSelectedApplications([])
    }
  }

  const handleSelectApplication = (appId: string, checked: boolean) => {
    if (checked) {
      setSelectedApplications([...selectedApplications, appId])
    } else {
      setSelectedApplications(selectedApplications.filter((id) => id !== appId))
    }
  }

  const handleBulkAction = (action: string) => {
    console.log(`[Admin] Bulk action ${action} on applications:`, selectedApplications)
    // Implement bulk actions here
    setSelectedApplications([])
  }

  const handleRowAction = (appId: string, action: string) => {
    console.log(`[Admin] ${action} action on application:`, appId)
    // Implement individual row actions here
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600 mt-1">Manage Department of Land Registration applications</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export
          </Button>
          {selectedApplications.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">Bulk Actions ({selectedApplications.length})</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleBulkAction("approve")}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Selected
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkAction("reject")}>
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject Selected
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkAction("request_info")}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Request Info
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Form Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Land Registration">Land Registration</SelectItem>
                <SelectItem value="Title Transfer">Title Transfer</SelectItem>
                <SelectItem value="Subdivision">Subdivision</SelectItem>
              </SelectContent>
            </Select>

            <Select value={districtFilter} onValueChange={setDistrictFilter}>
              <SelectTrigger>
                <SelectValue placeholder="District" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                <SelectItem value="Colombo">Colombo</SelectItem>
                <SelectItem value="Kandy">Kandy</SelectItem>
                <SelectItem value="Galle">Galle</SelectItem>
                <SelectItem value="Matara">Matara</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      selectedApplications.length === currentApplications.length && currentApplications.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Application ID</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>NIC</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>AI Score</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedApplications.includes(app.id)}
                      onCheckedChange={(checked) => handleSelectApplication(app.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{app.id}</TableCell>
                  <TableCell>{app.applicantName}</TableCell>
                  <TableCell>{app.nic}</TableCell>
                  <TableCell>{app.type}</TableCell>
                  <TableCell>{app.district}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[app.status as keyof typeof statusColors]}>
                      {app.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={priorityColors[app.priority as keyof typeof priorityColors]}>
                      {app.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${app.aiScore >= 80 ? "bg-green-500" : app.aiScore >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                          style={{ width: `${app.aiScore}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{app.aiScore}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{app.submittedDate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleRowAction(app.id, "view")}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRowAction(app.id, "approve")}>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRowAction(app.id, "reject")}>
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRowAction(app.id, "request_info")}>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Request Info
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredApplications.length)} of {filteredApplications.length}{" "}
          applications
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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

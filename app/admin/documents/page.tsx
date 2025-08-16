"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ZoomIn,
  ZoomOut,
  Download,
  CheckCircle,
  XCircle,
  Upload,
  AlertTriangle,
  Eye,
  FileText,
} from "lucide-react"

const mockDocuments = [
  {
    id: "DOC001",
    applicationId: "APP001",
    applicantName: "John Doe",
    documentType: "Title Deed",
    uploadDate: "2024-01-15",
    aiScore: 85,
    status: "pending",
    issues: [
      { type: "warning", message: "Signature clarity could be improved" },
      { type: "info", message: "Document appears authentic" },
    ],
    imageUrl: "/placeholder-5rq7a.png",
  },
  {
    id: "DOC002",
    applicationId: "APP002",
    applicantName: "Jane Smith",
    documentType: "Survey Plan",
    uploadDate: "2024-01-14",
    aiScore: 92,
    status: "verified",
    issues: [{ type: "success", message: "All verification checks passed" }],
    imageUrl: "/placeholder-rd6ps.png",
  },
  {
    id: "DOC003",
    applicationId: "APP003",
    applicantName: "Mike Johnson",
    documentType: "Identity Card",
    uploadDate: "2024-01-13",
    aiScore: 45,
    status: "rejected",
    issues: [
      { type: "error", message: "Document appears to be tampered" },
      { type: "error", message: "Poor image quality" },
    ],
    imageUrl: "/generic-identity-card.png",
  },
  {
    id: "DOC004",
    applicationId: "APP004",
    applicantName: "Sarah Wilson",
    documentType: "Property Certificate",
    uploadDate: "2024-01-12",
    aiScore: 78,
    status: "pending",
    issues: [
      { type: "warning", message: "Minor inconsistencies detected" },
      { type: "info", message: "Requires manual review" },
    ],
    imageUrl: "/placeholder-odp6n.png",
  },
]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  verified: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
}

const issueColors = {
  error: "bg-red-100 text-red-800",
  warning: "bg-yellow-100 text-yellow-800",
  info: "bg-blue-100 text-blue-800",
  success: "bg-green-100 text-green-800",
}

export default function DocumentVerificationPage() {
  const [documents] = useState(mockDocuments)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [zoom, setZoom] = useState(100)
  const [filterStatus, setFilterStatus] = useState("all")
  const [rejectionReason, setRejectionReason] = useState("")

  const filteredDocuments = documents.filter((doc) => filterStatus === "all" || doc.status === filterStatus)

  const openModal = (document: any) => {
    console.log("[v0] Opening modal for document:", document.id)
    setSelectedDocument(document)
    setIsModalOpen(true)
    setZoom(100)
  }

  const closeModal = () => {
    console.log("[v0] Closing modal")
    setIsModalOpen(false)
    setSelectedDocument(null)
    setRejectionReason("")
  }

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50))

  const handleApprove = (docId: string) => {
    console.log(`[v0] Approving document:`, docId)
    closeModal()
  }

  const handleReject = (docId: string) => {
    console.log(`[v0] Rejecting document:`, docId, "Reason:", rejectionReason)
    closeModal()
  }

  const handleRequestReupload = (docId: string) => {
    console.log(`[v0] Requesting re-upload for document:`, docId, "Reason:", rejectionReason)
    closeModal()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Document Verification</h1>
          <p className="text-gray-600 mt-1">Review and verify submitted documents</p>
        </div>
        <div className="flex gap-3">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48 text-[#00508E]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Documents</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base font-semibold">{document.documentType}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">{document.applicantName}</p>
                </div>
                <Badge className={`${statusColors[document.status as keyof typeof statusColors]} text-xs px-2 py-1`}>
                  {document.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              {/* Document Thumbnail */}
              <div
                className="relative aspect-[4/3] bg-gray-100 rounded-md overflow-hidden group transition-all duration-200"
                onClick={() => openModal(document)}
              >
                <img
                  src={document.imageUrl || "/placeholder.svg"}
                  alt={document.documentType}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-all duration-200" />
                </div>
              </div>

              {/* AI Score */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">AI Score</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        document.aiScore >= 80
                          ? "bg-green-500"
                          : document.aiScore >= 60
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${document.aiScore}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold">{document.aiScore}%</span>
                </div>
              </div>

              {/* Issues */}
              <div className="space-y-1.5">
                <span className="text-sm font-medium text-gray-600">Issues ({document.issues.length})</span>
                <div className="space-y-1">
                  {document.issues.slice(0, 2).map((issue, index) => (
                    <div key={index} className="flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 mt-0.5 text-gray-400 flex-shrink-0" />
                      <span className="text-xs text-gray-600 line-clamp-2">{issue.message}</span>
                    </div>
                  ))}
                  {document.issues.length > 2 && (
                    <span className="text-xs text-blue-600">+{document.issues.length - 2} more</span>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-1.5">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-[var(--btn-bg)] hover:bg-[#002540] text-white text-xs py-1.5 px-2 border-none"
                  onClick={(e) => {
                    e.stopPropagation()
                    console.log("[v0] Review button clicked for document:", document.id)
                    openModal(document)
                  }}
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Review
                </Button>
                {document.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-xs py-1.5 px-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        console.log("[v0] Quick approve button clicked for document:", document.id)
                        handleApprove(document.id)
                      }}
                    >
                      <CheckCircle className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="text-xs py-1.5 px-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        console.log("[v0] Quick reject button clicked for document:", document.id)
                        openModal(document)
                      }}
                    >
                      <XCircle className="w-3 h-3" />
                    </Button>
                  </>
                )}
              </div>

              {/* Document Info */}
              <div className="text-xs text-gray-500 space-y-1 pt-1 border-t border-gray-100">
                <div className="flex justify-between">
                  <span>App ID:</span>
                  <span className="font-medium">{document.applicationId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Uploaded:</span>
                  <span className="font-medium">{document.uploadDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Document Preview Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-6xl h-[90vh] p-0 flex flex-col rounded-lg overflow-hidden shadow-xl">
          <DialogHeader className="px-5 py-4 border-b bg-white flex-shrink-0">
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <span className="text-lg font-semibold text-gray-900">{selectedDocument?.documentType}</span>
                  <p className="text-sm font-normal text-gray-600 mt-0.5">{selectedDocument?.applicantName}</p>
                </div>
              </div>
              <Badge className={`${statusColors[selectedDocument?.status as keyof typeof statusColors]} text-xs px-2.5 py-1`}>
                {selectedDocument?.status}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-1 min-h-0">
            {/* Document Preview Section - 60% width */}
            <div className="w-[60%] flex flex-col bg-white border-r border-gray-200">
              {/* Image Controls */}
              <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={handleZoomOut} className="h-8 w-8 p-0 bg-[var(--btn-bg)] hover:bg-[#003560] text-white">
                    <ZoomOut className="w-3.5 h-3.5" />
                  </Button>
                  <span className="text-sm font-medium min-w-[40px] text-center text-gray-700">{zoom}%</span>
                  <Button size="sm" variant="outline" onClick={handleZoomIn} className="h-8 w-8 p-0 bg-[var(--btn-bg)] hover:bg-[#003560] text-white">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <Button size="sm" variant="outline" className="bg-[var(--btn-bg)] hover:bg-[#003560] text-white text-xs py-1.5 px-3">
                  <Download className="w-3.5 h-3.5 mr-1" />
                  Download
                </Button>
              </div>

              {/* Document Image Container */}
              <div className="flex-1 flex items-center justify-center p-4 bg-gray-50">
                <div className="relative flex items-center justify-center w-full h-full">
                  <img
                    src={selectedDocument?.imageUrl || "/placeholder.svg"}
                    alt={selectedDocument?.documentType}
                    className="max-w-full max-h-full object-contain transition-all duration-200 bg-white"
                    style={{
                      transform: `scale(${zoom / 100})`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right Sidebar - 40% width */}
            <div className="w-[40%] flex flex-col" style={{ backgroundColor: "#F4FAFF" }}>
              <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {/* AI Analysis */}
              <div className="space-y-3" style={{ backgroundColor: "#F4FAFF" }}>
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <h3 className="font-medium text-gray-900">AI Analysis</h3>
                </div>

                <div className="space-y-4" style={{ backgroundColor: "#F4FAFF" }}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Confidence Score</span>
                  <span className="text-base font-semibold text-gray-900">{selectedDocument?.aiScore}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                    selectedDocument?.aiScore >= 80
                      ? "bg-green-500"
                      : selectedDocument?.aiScore >= 60
                      ? "bg-yellow-500"
                      : "bg-red-500"
                    }`}
                    style={{ width: `${selectedDocument?.aiScore}%` }}
                  />
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-sm font-medium text-gray-700">
                  Detected Issues ({selectedDocument?.issues.length})
                  </span>
                  <div className="space-y-2">
                  {selectedDocument?.issues.map((issue: any, index: number) => (
                    <div
                    key={index}
                    className={`p-3 rounded text-xs ${
                      issue.type === "error"
                      ? "bg-red-50 text-red-800"
                      : issue.type === "warning"
                        ? "bg-yellow-50 text-yellow-800"
                        : issue.type === "success"
                        ? "bg-green-50 text-green-800"
                        : "bg-blue-50 text-blue-800"
                    }`}
                    >
                    {issue.message}
                    </div>
                  ))}
                  </div>
                </div>
                </div>
              </div>

              {/* Review Actions */}
              {selectedDocument?.status === "pending" && (
                <div className="space-y-3" style={{ backgroundColor: "#F4FAFF" }}>
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <h3 className="font-medium text-gray-900">Review Actions</h3>
                </div>

                <div className="space-y-4">
                  <Textarea
                  placeholder="Add comments or rejection reason..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={3}
                  className="resize-none text-sm"
                  />

                  <div className="space-y-2">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 h-9 text-sm"
                    onClick={() => handleApprove(selectedDocument.id)}
                  >
                    <CheckCircle className="w-4 h-4 mr-1.5" />
                    Mark as Verified
                  </Button>

                  <Button
                    variant="destructive"
                    className="w-full h-9 text-sm"
                    onClick={() => handleReject(selectedDocument.id)}
                  >
                    <XCircle className="w-4 h-4 mr-1.5" />
                    Reject Document
                  </Button>
                  </div>
                </div>
                </div>
              )}

              {/* Document Metadata */}
              <div className="space-y-3" style={{ backgroundColor: "#F4FAFF" }}>
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <h3 className="font-medium text-gray-900">Document Details</h3>
                </div>

                <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-gray-600">Document ID:</span>
                  <span className="font-medium text-gray-900">{selectedDocument?.id}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-gray-600">Application ID:</span>
                  <span className="font-medium text-gray-900">{selectedDocument?.applicationId}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-gray-600">Upload Date:</span>
                  <span className="font-medium text-gray-900">{selectedDocument?.uploadDate}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-600">Document Type:</span>
                  <span className="font-medium text-gray-900">{selectedDocument?.documentType}</span>
                </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

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
  RotateCw,
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
  const [rotation, setRotation] = useState(0)
  const [filterStatus, setFilterStatus] = useState("all")
  const [rejectionReason, setRejectionReason] = useState("")

  const filteredDocuments = documents.filter((doc) => filterStatus === "all" || doc.status === filterStatus)

  const openModal = (document: any) => {
    console.log("[v0] Opening modal for document:", document.id)
    setSelectedDocument(document)
    setIsModalOpen(true)
    setZoom(100)
    setRotation(0)
  }

  const closeModal = () => {
    console.log("[v0] Closing modal")
    setIsModalOpen(false)
    setSelectedDocument(null)
    setRejectionReason("")
  }

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50))
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360)

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
            <SelectTrigger className="w-48">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-sm font-medium">{document.documentType}</CardTitle>
                  <p className="text-xs text-gray-500 mt-1">{document.applicantName}</p>
                </div>
                <Badge className={statusColors[document.status as keyof typeof statusColors]}>{document.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Document Thumbnail */}
              <div
                className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden group"
                onClick={() => openModal(document)}
              >
                <img
                  src={document.imageUrl || "/placeholder.svg"}
                  alt={document.documentType}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* AI Score */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">AI Score</span>
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
                  <span className="text-sm font-medium">{document.aiScore}%</span>
                </div>
              </div>

              {/* Issues */}
              <div className="space-y-2">
                <span className="text-sm font-medium">Issues ({document.issues.length})</span>
                <div className="space-y-1">
                  {document.issues.slice(0, 2).map((issue, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <AlertTriangle className="w-3 h-3 mt-0.5 text-gray-400" />
                      <span className="text-xs text-gray-600 line-clamp-2">{issue.message}</span>
                    </div>
                  ))}
                  {document.issues.length > 2 && (
                    <span className="text-xs text-blue-600">+{document.issues.length - 2} more</span>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
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
                      className="bg-green-600 hover:bg-green-700"
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
              <div className="text-xs text-gray-500 space-y-1">
                <div className="flex justify-between">
                  <span>App ID:</span>
                  <span>{document.applicationId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Uploaded:</span>
                  <span>{document.uploadDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Document Preview Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-7xl h-[95vh] p-0 flex flex-col">
          <DialogHeader className="px-6 py-4 border-b bg-white flex-shrink-0">
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5" />
                <div>
                  <span className="text-lg font-semibold">{selectedDocument?.documentType}</span>
                  <p className="text-sm font-normal text-gray-600 mt-1">{selectedDocument?.applicantName}</p>
                </div>
              </div>
              <Badge className={statusColors[selectedDocument?.status as keyof typeof statusColors]}>
                {selectedDocument?.status}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-1 min-h-0">
            {/* Document Preview Section - 55% width */}
            <div className="w-[55%] flex flex-col bg-gray-50 border-r">
              {/* Image Controls */}
              <div className="flex items-center justify-between bg-white border-b px-4 py-3">
                <div className="flex items-center gap-3">
                  <Button size="sm" variant="outline" onClick={handleZoomOut} className="h-8 w-8 p-0 bg-transparent">
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium min-w-[50px] text-center">{zoom}%</span>
                  <Button size="sm" variant="outline" onClick={handleZoomIn} className="h-8 w-8 p-0 bg-transparent">
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-6 bg-gray-300 mx-2" />
                  <Button size="sm" variant="outline" onClick={handleRotate} className="h-8 w-8 p-0 bg-transparent">
                    <RotateCw className="w-4 h-4" />
                  </Button>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>

              {/* Document Image Container */}
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="relative flex items-center justify-center w-full h-full">
                  <img
                    src={selectedDocument?.imageUrl || "/placeholder.svg"}
                    alt={selectedDocument?.documentType}
                    className="max-w-full max-h-full object-contain transition-transform duration-200 shadow-lg rounded border bg-white"
                    style={{
                      transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right Sidebar - 45% width */}
            <div className="w-[45%] flex flex-col bg-white">
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                {/* AI Analysis */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <h3 className="font-semibold text-gray-900">AI Analysis</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Confidence Score</span>
                        <span className="text-xl font-bold text-gray-900">{selectedDocument?.aiScore}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
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
                            className={`p-3 rounded-md text-sm border-l-3 ${
                              issue.type === "error"
                                ? "bg-red-50 border-red-400 text-red-800"
                                : issue.type === "warning"
                                  ? "bg-yellow-50 border-yellow-400 text-yellow-800"
                                  : issue.type === "success"
                                    ? "bg-green-50 border-green-400 text-green-800"
                                    : "bg-blue-50 border-blue-400 text-blue-800"
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
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <h3 className="font-semibold text-gray-900">Review Actions</h3>
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
                          className="w-full bg-green-600 hover:bg-green-700 h-10"
                          onClick={() => handleApprove(selectedDocument.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark as Verified
                        </Button>

                        <Button
                          variant="destructive"
                          className="w-full h-10"
                          onClick={() => handleReject(selectedDocument.id)}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject Document
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full h-10 bg-transparent"
                          onClick={() => handleRequestReupload(selectedDocument.id)}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Request Re-upload
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Document Metadata */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <h3 className="font-semibold text-gray-900">Document Details</h3>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Document ID:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedDocument?.id}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Application ID:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedDocument?.applicationId}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Upload Date:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedDocument?.uploadDate}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span className="text-sm text-gray-600">Document Type:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedDocument?.documentType}</span>
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

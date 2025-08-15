"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DocumentVerification({ params }: { params: { id: string } }) {
  const router = useRouter()

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-800 font-inter">Document Verification Manual Review</h1>
        <p className="text-gray-600 mt-2 font-inter">
          Review and verify submitted documents for application {params.id}
        </p>
      </div>

      {/* Main Form */}
      <div className="bg-white rounded-2xl border-2 border-blue-900 p-8 space-y-8">
        {/* Form Header */}
        <div>
          <h2 className="text-xl font-bold text-black mb-2">Applicant Information</h2>
          <p className="text-gray-600">Please fill all the required fields.</p>
        </div>

        {/* First Applicant Details */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-black">Applicant Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-black">Full Name</label>
              <div className="bg-gray-200 rounded-md px-3 py-2">
                <span className="text-gray-600 text-sm">Ayesha Perera</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-black">Address</label>
              <div className="bg-gray-200 rounded-md px-3 py-2">
                <span className="text-gray-600 text-sm">123 Galle Road, Colombo 4</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-black">National Identity Card Number</label>
              <div className="bg-gray-200 rounded-md px-3 py-2">
                <span className="text-black text-sm font-mono">902345678V</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-black">Date</label>
              <div className="bg-gray-200 rounded-md px-3 py-2">
                <span className="text-gray-600 text-sm">August 9, 2025</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-black">Signature</label>
            <div className="bg-gray-200 rounded-md h-32"></div>
          </div>
        </div>

        <hr className="border-blue-900" />

        {/* Second Applicant Details */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-black">Applicant Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-black">Full Name</label>
              <div className="bg-gray-200 rounded-md px-3 py-2">
                <span className="text-gray-600 text-sm">Nimal Silva</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-black">Address</label>
              <div className="bg-gray-200 rounded-md px-3 py-2">
                <span className="text-gray-600 text-sm">456, High Level Rd. Nugegoda</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-black">National Identity Card Number</label>
              <div className="bg-gray-200 rounded-md px-3 py-2">
                <span className="text-gray-600 text-sm">8512304567v</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-black">Date</label>
              <div className="bg-gray-200 rounded-md px-3 py-2">
                <span className="text-gray-600 text-sm">August 9, 2025</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-black">Signature</label>
            <div className="bg-gray-200 rounded-md h-32"></div>
          </div>
        </div>

        {/* Reason Section */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-black">Reason for the request</label>
          <div className="bg-gray-200 rounded-md px-3 py-2 h-32">
            <span className="text-black text-sm">To transfer the ownership of a land.</span>
          </div>
        </div>

        <hr className="border-blue-900" />

        {/* Document Verification */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-black">Document Verification</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((doc) => (
              <div key={doc} className="relative border border-gray-400 rounded-md overflow-hidden">
                <img
                  src={`/document-stack.png?height=200&width=300&query=document-${doc}`}
                  alt={`Document ${doc}`}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center">
                  <Button className="bg-black text-white hover:bg-gray-800 gap-2">
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-4">
          <Button variant="outline" onClick={() => router.back()} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <Button className="bg-red-600 text-white hover:bg-red-700">Reject</Button>

          <Button className="bg-blue-900 text-white hover:bg-blue-800">Mark as Verified</Button>
        </div>
      </div>
    </div>
  )
}

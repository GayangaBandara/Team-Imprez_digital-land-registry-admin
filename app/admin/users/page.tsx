"use client"
import { Button } from "@/components/ui/button"
import { Plus, Edit, UserX } from "lucide-react"

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Reviewer", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Manager", status: "Active" },
  { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "Super Admin", status: "Inactive" },
]

export default function UserManagement() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-800">User Management</h1>
        <Button className="bg-blue-600 text-white hover:bg-blue-700 gap-2">
          <Plus className="w-4 h-4" />
          Add User
        </Button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="font-medium text-gray-900">Name</div>
          <div className="font-medium text-gray-900">Email</div>
          <div className="font-medium text-gray-900">Role</div>
          <div className="font-medium text-gray-900">Status</div>
          <div className="font-medium text-gray-900">Actions</div>
        </div>

        {users.map((user, index) => (
          <div
            key={user.id}
            className={`grid grid-cols-5 gap-4 px-6 py-4 border-b border-gray-100 ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
          >
            <div className="text-sm text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-900">{user.email}</div>
            <div className="text-sm text-gray-900">{user.role}</div>
            <div className={`text-sm font-medium ${user.status === "Active" ? "text-green-600" : "text-red-600"}`}>
              {user.status}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                <Edit className="w-3 h-3" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="gap-1 text-red-600 hover:text-red-700 bg-transparent">
                <UserX className="w-3 h-3" />
                Deactivate
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

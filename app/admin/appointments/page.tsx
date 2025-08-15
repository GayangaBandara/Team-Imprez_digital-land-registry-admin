"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Plus,
  PrinterIcon as Print,
  User,
  MapPin,
  FileText,
} from "lucide-react"

// Mock data for appointments
const mockAppointments = [
  {
    id: "APT001",
    applicantName: "John Doe",
    applicationId: "APP001",
    date: "2024-01-15",
    time: "09:00",
    duration: 60,
    type: "Document Review",
    status: "confirmed",
    office: "Colombo Main Office",
    notes: "Bring original documents",
  },
  {
    id: "APT002",
    applicantName: "Jane Smith",
    applicationId: "APP002",
    date: "2024-01-15",
    time: "10:30",
    duration: 45,
    type: "Survey Verification",
    status: "pending",
    office: "Colombo Main Office",
    notes: "",
  },
  {
    id: "APT003",
    applicantName: "Mike Johnson",
    applicationId: "APP003",
    date: "2024-01-16",
    time: "14:00",
    duration: 30,
    type: "Title Transfer",
    status: "completed",
    office: "Kandy Branch",
    notes: "Completed successfully",
  },
  {
    id: "APT004",
    applicantName: "Sarah Wilson",
    applicationId: "APP004",
    date: "2024-01-17",
    time: "11:00",
    duration: 90,
    type: "Land Registration",
    status: "confirmed",
    office: "Galle Branch",
    notes: "Complex case - allow extra time",
  },
]

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
]

const statusColors = {
  confirmed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800",
}

export default function AppointmentsPage() {
  const [appointments] = useState(mockAppointments)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false)

  // Get appointments for a specific date
  const getAppointmentsForDate = (date: string) => {
    return appointments.filter((apt) => apt.date === date)
  }

  // Generate calendar days for month view
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const current = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      const dateStr = current.toISOString().split("T")[0]
      const dayAppointments = getAppointmentsForDate(dateStr)

      days.push({
        date: new Date(current),
        dateStr,
        isCurrentMonth: current.getMonth() === month,
        appointments: dayAppointments,
      })

      current.setDate(current.getDate() + 1)
    }

    return days
  }

  // Generate week days for week view
  const generateWeekDays = () => {
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

    const days = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      const dateStr = date.toISOString().split("T")[0]

      days.push({
        date,
        dateStr,
        appointments: getAppointmentsForDate(dateStr),
      })
    }

    return days
  }

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)

    if (viewMode === "month") {
      newDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1))
    } else if (viewMode === "week") {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7))
    } else {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1))
    }

    setCurrentDate(newDate)
  }

  const handleExportCSV = () => {
    console.log("[Admin] Exporting appointments to CSV")
    // Implement CSV export logic
  }

  const handlePrint = () => {
    console.log("[Admin] Printing appointment schedule")
    window.print()
  }

  const handleNewAppointment = (appointmentData: any) => {
    console.log("[Admin] Creating new appointment:", appointmentData)
    setIsNewAppointmentOpen(false)
  }

  const formatDateHeader = () => {
    if (viewMode === "month") {
      return currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })
    } else if (viewMode === "week") {
      const startOfWeek = new Date(currentDate)
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)

      return `${startOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
    } else {
      return currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-1">Manage appointment scheduling</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleExportCSV} className="bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={handlePrint} className="bg-transparent">
            <Print className="w-4 h-4 mr-2" />
            Print Schedule
          </Button>
          <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule New Appointment</DialogTitle>
              </DialogHeader>
              <NewAppointmentForm onSubmit={handleNewAppointment} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Calendar Controls */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigateDate("prev")} size="sm">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-xl font-semibold">{formatDateHeader()}</h2>
              <Button variant="outline" onClick={() => navigateDate("next")} size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              {(["month", "week", "day"] as const).map((mode) => (
                <Button
                  key={mode}
                  variant={viewMode === mode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode(mode)}
                  className={viewMode !== mode ? "bg-transparent" : ""}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === "month" && <MonthView days={generateCalendarDays()} />}
          {viewMode === "week" && <WeekView days={generateWeekDays()} />}
          {viewMode === "day" && (
            <DayView
              date={currentDate}
              appointments={getAppointmentsForDate(currentDate.toISOString().split("T")[0])}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Month View Component
function MonthView({ days }: { days: any[] }) {
  return (
    <div className="grid grid-cols-7 gap-1">
      {/* Day headers */}
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day} className="p-2 text-center font-medium text-gray-600 bg-gray-50">
          {day}
        </div>
      ))}

      {/* Calendar days */}
      {days.map((day, index) => (
        <div
          key={index}
          className={`min-h-24 p-2 border border-gray-200 ${
            day.isCurrentMonth ? "bg-white" : "bg-gray-50"
          } hover:bg-gray-50 transition-colors`}
        >
          <div className={`text-sm ${day.isCurrentMonth ? "text-gray-900" : "text-gray-400"}`}>
            {day.date.getDate()}
          </div>
          <div className="space-y-1 mt-1">
            {day.appointments.slice(0, 2).map((apt: any) => (
              <div
                key={apt.id}
                className={`text-xs p-1 rounded truncate ${statusColors[apt.status as keyof typeof statusColors]}`}
              >
                {apt.time} - {apt.applicantName}
              </div>
            ))}
            {day.appointments.length > 2 && (
              <div className="text-xs text-gray-500">+{day.appointments.length - 2} more</div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// Week View Component
function WeekView({ days }: { days: any[] }) {
  return (
    <div className="grid grid-cols-7 gap-4">
      {days.map((day, index) => (
        <div key={index} className="space-y-2">
          <div className="text-center">
            <div className="text-sm font-medium text-gray-600">
              {day.date.toLocaleDateString("en-US", { weekday: "short" })}
            </div>
            <div className="text-lg font-semibold">{day.date.getDate()}</div>
          </div>
          <div className="space-y-2">
            {day.appointments.map((apt: any) => (
              <Card key={apt.id} className="p-2">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{apt.time}</span>
                    <Badge className={statusColors[apt.status as keyof typeof statusColors]} size="sm">
                      {apt.status}
                    </Badge>
                  </div>
                  <div className="text-sm font-medium">{apt.applicantName}</div>
                  <div className="text-xs text-gray-600">{apt.type}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// Day View Component
function DayView({ date, appointments }: { date: Date; appointments: any[] }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-2">
        {timeSlots.map((time) => {
          const slotAppointments = appointments.filter((apt) => apt.time === time)

          return (
            <div key={time} className="flex border-b border-gray-200 pb-2">
              <div className="w-20 text-sm font-medium text-gray-600 py-2">{time}</div>
              <div className="flex-1 space-y-2">
                {slotAppointments.length > 0 ? (
                  slotAppointments.map((apt) => (
                    <Card key={apt.id} className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{apt.applicantName}</span>
                            <Badge className={statusColors[apt.status as keyof typeof statusColors]}>
                              {apt.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FileText className="w-3 h-3" />
                            <span>{apt.type}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-3 h-3" />
                            <span>{apt.office}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-3 h-3" />
                            <span>{apt.duration} minutes</span>
                          </div>
                          {apt.notes && (
                            <div className="text-sm text-gray-600 mt-2 p-2 bg-gray-50 rounded">{apt.notes}</div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-sm text-gray-400 py-2">Available</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// New Appointment Form Component
function NewAppointmentForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    applicantName: "",
    applicationId: "",
    date: "",
    time: "",
    duration: "60",
    type: "",
    office: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="applicantName">Applicant Name</Label>
          <Input
            id="applicantName"
            value={formData.applicantName}
            onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="applicationId">Application ID</Label>
          <Input
            id="applicationId"
            value={formData.applicationId}
            onChange={(e) => setFormData({ ...formData, applicationId: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="time">Time</Label>
          <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Appointment Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Document Review">Document Review</SelectItem>
              <SelectItem value="Survey Verification">Survey Verification</SelectItem>
              <SelectItem value="Title Transfer">Title Transfer</SelectItem>
              <SelectItem value="Land Registration">Land Registration</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="45">45 minutes</SelectItem>
              <SelectItem value="60">60 minutes</SelectItem>
              <SelectItem value="90">90 minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="office">Office Location</Label>
        <Select value={formData.office} onValueChange={(value) => setFormData({ ...formData, office: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select office" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Colombo Main Office">Colombo Main Office</SelectItem>
            <SelectItem value="Kandy Branch">Kandy Branch</SelectItem>
            <SelectItem value="Galle Branch">Galle Branch</SelectItem>
            <SelectItem value="Matara Branch">Matara Branch</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
        Schedule Appointment
      </Button>
    </form>
  )
}

import type React from "react"
import { Inter, Familjen_Grotesk as Cabinet_Grotesk } from "next/font/google"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const cabinetGrotesk = Cabinet_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cabinet",
})

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${inter.variable} ${cabinetGrotesk.variable} min-h-screen bg-white`}>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-80">
          <Header />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}

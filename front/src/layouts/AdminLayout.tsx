"use client"

import { Outlet } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import AdminSidebar from "@/components/AdminSidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/useAuth"
import { Navigate } from "react-router-dom"

export default function AdminLayout() {
  const { user } = useAuth()

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-14 md:h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 md:w-6 md:h-6 bg-primary rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">NFC</span>
            </div>
            <span className="font-semibold text-sm md:text-base">근태관리 시스템 - 관리자</span>
          </div>
        </header>
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

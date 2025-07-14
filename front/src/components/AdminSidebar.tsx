"use client";

import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Calendar,
  Home,
  Settings,
  Users,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";

const menuItems = [
  {
    title: "대시보드",
    url: "/admin",
    icon: Home,
  },
  {
    title: "실시간 출입 현황",
    url: "/admin",
    icon: Calendar,
  },
  {
    title: "근태 내역",
    url: "/admin/attendance",
    icon: Calendar,
  },
  {
    title: "직원 관리",
    url: "/admin/employees",
    icon: Users,
  },
  {
    title: "통계/리포트",
    url: "/admin/stats",
    icon: BarChart3,
  },
  {
    title: "시스템 설정",
    url: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <Sidebar>
      <SidebarContent>
        {/* 사용자 이름 + 로그아웃 */}
        <div className="px-4 py-3 flex items-center justify-between text-base border-bold">
          <span className="font-medium text-gray-700">관리자</span>
          <button
            onClick={logout}
            className="text-sm text-red-500 hover:underline"
          >
            로그아웃
          </button>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>관리자 메뉴</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout}>
              <LogOut className="w-4 h-4" />
              <span>로그아웃</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

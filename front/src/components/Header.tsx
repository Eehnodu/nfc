"use client";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogIn, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"; // shadcn/ui 기반

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-y-2">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-white font-semibold text-sm sm:text-base">
              NFC
            </span>
          </div>
          <span className="text-sm sm:text-xl font-bold text-gray-900 tracking-tight">
            근태관리 시스템
          </span>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-5">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 text-xs sm:text-sm px-2"
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  <span>{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={() =>
                    navigate(user.role === "admin" ? "/admin" : "/employee")
                  }
                >
                  내 정보
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600">
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              variant="default"
              size="sm"
              className="text-xs sm:text-sm font-medium"
            >
              <Link to="/login">
                <LogIn className="w-4 h-4 mr-1" />
                로그인
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}

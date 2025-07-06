"use client";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogIn, LogOut, User } from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">NFC</span>
          </div>
          <span className="text-xl font-bold text-gray-900">
            근태관리 시스템
          </span>
        </Link>

        <nav className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-gray-500">
                  ({user.role === "admin" ? "관리자" : "직원"})
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                로그아웃
              </Button>
            </div>
          ) : (
            <Button asChild>
              <Link to="/login">
                <LogIn className="w-4 h-4 mr-2" />
                로그인
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}

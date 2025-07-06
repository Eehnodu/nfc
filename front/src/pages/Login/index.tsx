"use client";

import type React from "react";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, LogIn } from "lucide-react";

export default function Login() {
  const [credentials, setCredentials] = useState({ id: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await login(credentials);
    if (success) {
      toast({
        title: "로그인 성공",
        description: "환영합니다!",
      });

      // Redirect based on role
      if (credentials.id === "admin") {
        navigate("/admin");
      } else {
        navigate("/employee");
      }
    } else {
      toast({
        title: "로그인 실패",
        description: "아이디 또는 비밀번호를 확인해주세요.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">메인으로 돌아가기</span>
          </Link>
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">NFC</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              근태관리 시스템
            </span>
          </Link>
          <div></div>
        </div>
      </header>

      {/* Login Form */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">로그인</CardTitle>
            <CardDescription>
              직원 또는 관리자 계정으로 로그인하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="id">아이디</Label>
                <Input
                  id="id"
                  type="text"
                  placeholder="아이디를 입력하세요"
                  value={credentials.id}
                  onChange={(e) =>
                    setCredentials((prev) => ({ ...prev, id: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                />
                <Label htmlFor="remember" className="text-sm">
                  로그인 상태 유지
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                <LogIn className="w-4 h-4 mr-2" />
                {isLoading ? "로그인 중..." : "로그인"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-4">또는</p>
              <Button variant="outline" className="w-full bg-transparent">
                NFC 태그로 로그인
              </Button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>테스트 계정:</p>
              <p>직원: employee / password</p>
              <p>관리자: admin / password</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

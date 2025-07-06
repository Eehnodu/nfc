"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  role: "employee" | "admin";
  nfcId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { id: string; password: string }) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem("auth-token");
    if (token) {
      // Validate token and set user
      // This would typically involve an API call
      setUser({
        id: "user1",
        name: "홍길동",
        role: "employee",
      });
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: { id: string; password: string }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: credentials.id,
        name: credentials.id === "admin" ? "관리자" : "홍길동",
        role: credentials.id === "admin" ? "admin" : "employee",
      };

      setUser(mockUser);
      localStorage.setItem("auth-token", "mock-token");
      return true;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth-token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import AttendanceCard from "@/components/AttendanceCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, TrendingUp, AlertCircle } from "lucide-react";

interface AttendanceRecord {
  id: string;
  userName: string;
  status: "present" | "out" | "break" | "absent";
  checkInTime?: string;
  checkOutTime?: string;
  lastActivity: string;
}

export default function MainDashboard() {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    present: 0,
    out: 0,
    absent: 0,
  });

  useEffect(() => {
    // Mock data - replace with real API call
    const mockData: AttendanceRecord[] = [
      {
        id: "1",
        userName: "홍길동",
        status: "present",
        checkInTime: "09:01",
        lastActivity: "2분 전",
      },
      {
        id: "2",
        userName: "김영희",
        status: "out",
        checkInTime: "08:55",
        lastActivity: "11:55 외출",
      },
      {
        id: "3",
        userName: "박철수",
        status: "break",
        checkInTime: "09:10",
        lastActivity: "12:10 점심",
      },
      {
        id: "4",
        userName: "이민수",
        status: "absent",
        lastActivity: "미출근",
      },
    ];

    setAttendanceData(mockData);
    setStats({
      totalEmployees: mockData.length,
      present: mockData.filter((r) => r.status === "present").length,
      out: mockData.filter((r) => r.status === "out").length,
      absent: mockData.filter((r) => r.status === "absent").length,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            실시간 근태 현황
          </h1>
          <p className="text-gray-600">
            직원들의 현재 출퇴근 상태를 실시간으로 확인하세요
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">전체 직원</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEmployees}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">근무중</CardTitle>
              <Clock className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.present}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">외출중</CardTitle>
              <TrendingUp className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {stats.out}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">부재중</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {stats.absent}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {attendanceData.map((record) => (
            <AttendanceCard key={record.id} record={record} />
          ))}
        </div>

        {/* Real-time indicator */}
        <div className="mt-8 text-center">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></div>
            실시간 업데이트 중
          </Badge>
        </div>
      </main>
    </div>
  );
}

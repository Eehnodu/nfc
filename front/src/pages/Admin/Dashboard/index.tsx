"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Clock, TrendingUp, AlertCircle, RefreshCw } from "lucide-react"
import AttendanceCard from "@/components/AttendanceCard"

interface RealtimeEvent {
  id: string
  userName: string
  action: string
  timestamp: string
  type: "checkin" | "checkout" | "break_out" | "break_in"
}

export default function AdminDashboard() {
  const [realtimeEvents, setRealtimeEvents] = useState<RealtimeEvent[]>([])
  const [stats, setStats] = useState({
    totalEmployees: 25,
    present: 18,
    out: 4,
    absent: 3,
    lateToday: 2,
  })

  const [attendanceData] = useState([
    {
      id: "1",
      userName: "홍길동",
      status: "present" as const,
      checkInTime: "09:01",
      lastActivity: "2분 전",
    },
    {
      id: "2",
      userName: "김영희",
      status: "out" as const,
      checkInTime: "08:55",
      lastActivity: "11:55 외출",
    },
    {
      id: "3",
      userName: "박철수",
      status: "break" as const,
      checkInTime: "09:10",
      lastActivity: "12:10 점심",
    },
    {
      id: "4",
      userName: "이민수",
      status: "absent" as const,
      lastActivity: "미출근",
    },
  ])

  useEffect(() => {
    // Mock realtime events
    const mockEvents: RealtimeEvent[] = [
      {
        id: "1",
        userName: "홍길동",
        action: "출근",
        timestamp: "09:01",
        type: "checkin",
      },
      {
        id: "2",
        userName: "김영희",
        action: "외출",
        timestamp: "11:55",
        type: "break_out",
      },
      {
        id: "3",
        userName: "박철수",
        action: "점심",
        timestamp: "12:10",
        type: "break_out",
      },
    ]
    setRealtimeEvents(mockEvents)
  }, [])

  const getEventBadgeColor = (type: RealtimeEvent["type"]) => {
    const colors = {
      checkin: "bg-green-500",
      checkout: "bg-red-500",
      break_out: "bg-yellow-500",
      break_in: "bg-blue-500",
    }
    return colors[type]
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">관리자 대시보드</h1>
          <p className="text-sm md:text-base text-gray-600">실시간 근태 현황을 모니터링하세요</p>
        </div>
        <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
          <RefreshCw className="w-4 h-4 mr-2" />
          새로고침
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">전체 직원</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{stats.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">명</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">근무중</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-green-600">{stats.present}</div>
            <p className="text-xs text-muted-foreground">명</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">외출중</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-yellow-600">{stats.out}</div>
            <p className="text-xs text-muted-foreground">명</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">부재중</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-red-600">{stats.absent}</div>
            <p className="text-xs text-muted-foreground">명</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow col-span-2 md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">오늘 지각</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-orange-600">{stats.lateToday}</div>
            <p className="text-xs text-muted-foreground">회</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Real-time Events */}
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base md:text-lg">
              <span>실시간 이벤트</span>
              <Badge variant="outline" className="text-green-600 border-green-600">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></div>
                LIVE
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 md:max-h-96 overflow-y-auto">
              {realtimeEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{event.userName}</div>
                    <div className="text-xs text-gray-600">{event.action}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{event.timestamp}</div>
                    <Badge className={`${getEventBadgeColor(event.type)} text-white text-xs`}>{event.action}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Attendance Status */}
        <div className="xl:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg">현재 출근 현황</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {attendanceData.map((record) => (
                  <AttendanceCard key={record.id} record={record} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

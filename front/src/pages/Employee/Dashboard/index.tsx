"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useNfc } from "@/hooks/useNfc"
import { Navigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import NfcFeedback from "@/components/NfcFeedback"
import { Clock, Calendar, TrendingUp, AlertTriangle, Smartphone } from "lucide-react"
import Header from "@/components/Header"

interface TodayRecord {
  checkIn?: string
  checkOut?: string
  breakOut?: string
  breakIn?: string
  status: "not_started" | "working" | "break" | "finished"
  totalHours: string
  isLate: boolean
  isEarlyLeave: boolean
}

export default function EmployeeDashboard() {
  const { user } = useAuth()
  const { processNfcTag, isProcessing } = useNfc()
  const [todayRecord, setTodayRecord] = useState<TodayRecord>({
    checkIn: "09:02",
    status: "working",
    totalHours: "7시간 30분",
    isLate: true,
    isEarlyLeave: false,
  })
  const [showNfcFeedback, setShowNfcFeedback] = useState(false)
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | "processing">("success")
  const [feedbackMessage, setFeedbackMessage] = useState("")

  if (!user || user.role !== "employee") {
    return <Navigate to="/login" replace />
  }

  const handleNfcTag = async () => {
    setFeedbackType("processing")
    setFeedbackMessage("NFC 태그 처리 중...")
    setShowNfcFeedback(true)

    try {
      await processNfcTag("mock-nfc-id")
      setFeedbackType("success")
      setFeedbackMessage("출근 처리가 완료되었습니다!")
    } catch (error) {
      setFeedbackType("error")
      setFeedbackMessage("처리 중 오류가 발생했습니다.")
    }
  }

  const getStatusBadge = () => {
    const statusConfig = {
      not_started: { label: "출근 전", variant: "secondary" as const },
      working: { label: "근무중", variant: "default" as const },
      break: { label: "휴게중", variant: "outline" as const },
      finished: { label: "퇴근", variant: "destructive" as const },
    }

    const config = statusConfig[todayRecord.status]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
        {/* Welcome Message */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">안녕하세요, {user.name}님</h1>
            <p className="text-sm text-gray-600">
              {new Date().toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </p>
          </div>
          {getStatusBadge()}
        </div>

        {/* NFC Tagging Section */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
              <Smartphone className="w-5 h-5" />
              <span>NFC 태깅</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-100 mb-4 text-sm md:text-base">NFC 리더기에 태그하여 출퇴근을 기록하세요</p>
            <Button
              onClick={handleNfcTag}
              disabled={isProcessing}
              className="w-full bg-white text-blue-600 hover:bg-blue-50 h-12 text-base font-medium"
            >
              {isProcessing ? "처리 중..." : "NFC 태그 시뮬레이션"}
            </Button>
          </CardContent>
        </Card>

        {/* Today's Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
              <Calendar className="w-5 h-5" />
              <span>오늘의 근무 현황</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">출근 시간</div>
                <div className="text-xl md:text-2xl font-semibold text-green-700">{todayRecord.checkIn || "--:--"}</div>
                {todayRecord.isLate && (
                  <Badge variant="destructive" className="text-xs mt-2">
                    지각
                  </Badge>
                )}
              </div>

              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">퇴근 시간</div>
                <div className="text-xl md:text-2xl font-semibold text-blue-700">{todayRecord.checkOut || "--:--"}</div>
              </div>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">총 근무 시간</div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">{todayRecord.totalHours}</div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>이번 주</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold">38시간</div>
              <div className="text-sm text-gray-600 mt-1">근무 시간</div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>이번 달</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold text-red-600">2회</div>
              <div className="text-sm text-gray-600 mt-1">지각 횟수</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
              <Clock className="w-5 h-5" />
              <span>최근 활동</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: "09:02", action: "출근", status: "late" },
                { time: "12:00", action: "점심 외출", status: "normal" },
                { time: "13:00", action: "점심 복귀", status: "normal" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium min-w-[50px]">{activity.time}</div>
                    <div className="text-sm text-gray-600">{activity.action}</div>
                  </div>
                  {activity.status === "late" && (
                    <Badge variant="destructive" className="text-xs">
                      지각
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <NfcFeedback
        isVisible={showNfcFeedback}
        type={feedbackType}
        message={feedbackMessage}
        onClose={() => setShowNfcFeedback(false)}
      />
    </div>
  )
}

"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import AttendanceCard from "@/components/AttendanceCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, TrendingUp, AlertCircle, Coffee } from "lucide-react";
import Modal from "@/components/ui/modal";

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
    break: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(attendanceData.length / itemsPerPage);

  const paginatedData = attendanceData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<{
    title: string;
    members: { id: string; userName: string }[];
  } | null>(null);

  const openStatusModal = (
    status: "present" | "out" | "absent" | "break",
    title: string
  ) => {
    const members = attendanceData
      .filter((r) => r.status === status)
      .map((r) => ({ id: r.id, userName: r.userName }));

    setSelectedStatus({ title, members });
    setModalOpen(true);
  };

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
      {
        id: "5",
        userName: "정수진",
        status: "present",
        checkInTime: "08:45",
        lastActivity: "5분 전",
      },
      {
        id: "6",
        userName: "최민호",
        status: "out",
        checkInTime: "09:15",
        lastActivity: "14:20 외출",
      },
    ];

    setAttendanceData(mockData);
    setStats({
      totalEmployees: mockData.length,
      present: mockData.filter((r) => r.status === "present").length,
      out: mockData.filter((r) => r.status === "out").length,
      absent: mockData.filter((r) => r.status === "absent").length,
      break: mockData.filter((r) => r.status === "break").length,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            실시간 현황
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            직원들의 현재 출퇴근 상태를 실시간으로 확인하세요
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-6 md:mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">
                전체 직원
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-1">
                <span className="text-xl md:text-2xl font-bold text-green-600">
                  {stats.totalEmployees}
                </span>
                <span className="text-xs text-muted-foreground">명</span>
              </div>
            </CardContent>
          </Card>

          <Card
            onClick={() => openStatusModal("present", "근무중")}
            className="hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">
                근무중
              </CardTitle>
              <Clock className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-1">
                <span className="text-xl md:text-2xl font-bold text-green-600">
                  {stats.present}
                </span>
                <span className="text-xs text-muted-foreground">명</span>
              </div>
            </CardContent>
          </Card>

          <Card
            onClick={() => openStatusModal("out", "외출중")}
            className="hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">
                외출중
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-1">
                <span className="text-xl md:text-2xl font-bold text-yellow-600">
                  {stats.out}
                </span>
                <span className="text-xs text-muted-foreground">명</span>
              </div>
            </CardContent>
          </Card>
          <Card
            onClick={() => openStatusModal("break", "휴게중")}
            className="hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">
                휴게중
              </CardTitle>
              <Coffee className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-1">
                <span className="text-xl md:text-2xl font-bold text-blue-600">
                  {stats.break}
                </span>
                <span className="text-xs text-muted-foreground">명</span>
              </div>
            </CardContent>
          </Card>
          <Card
            onClick={() => openStatusModal("absent", "부재중")}
            className="hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">
                부재중
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-1">
                <span className="text-xl md:text-2xl font-bold text-red-600">
                  {stats.absent}
                </span>
                <span className="text-xs text-muted-foreground">명</span>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Real-time indicator */}
        <div className="flex justify-start mb-8">
          <Badge
            variant="outline"
            className="text-green-600 border-green-600 px-3 py-1"
          >
            <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></div>
            실시간 업데이트 중
          </Badge>
        </div>
        {/* Attendance Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
          {paginatedData.map((record) => (
            <AttendanceCard key={record.id} record={record} />
          ))}
        </div>

        <div className="mt-6 flex justify-center items-center space-x-1">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 text-sm text-gray-900 disabled:text-gray-300"
          >
            ◀
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded border text-sm ${
                currentPage === page
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-sm text-gray-900 disabled:text-gray-300"
          >
            ▶
          </button>
        </div>
      </main>
      {selectedStatus && (
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={`${selectedStatus.title} 명단`}
          className="w-[90vw] sm:w-[500px] max-w-full"
        >
          {selectedStatus.members.length > 0 ? (
            <div className="max-h-[60vh] overflow-y-auto divide-y">
              {selectedStatus.members.map((m) => {
                const user = attendanceData.find((u) => u.id === m.id);
                return (
                  <div
                    key={m.id}
                    className="flex justify-between items-center px-3 py-2"
                  >
                    <div className="truncate font-medium text-xs sm:text-sm md:text-base text-gray-800">
                      {m.userName}
                    </div>
                    <div className="ml-4 whitespace-nowrap text-[11px] sm:text-xs md:text-sm text-gray-500">
                      {user?.lastActivity || "정보 없음"}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center py-4 text-xs sm:text-sm md:text-base text-gray-500">
              해당 인원이 없습니다.
            </p>
          )}
        </Modal>
      )}
    </div>
  );
}

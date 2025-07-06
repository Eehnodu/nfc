"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Search, Filter } from "lucide-react";

interface AttendanceRecord {
  id: string;
  employeeName: string;
  department: string;
  date: string;
  checkIn: string;
  checkOut: string;
  workHours: string;
  status: "normal" | "late" | "early_leave" | "absent";
  overtime: string;
}

export default function AttendanceHistory() {
  const [records] = useState<AttendanceRecord[]>([
    {
      id: "1",
      employeeName: "홍길동",
      department: "개발팀",
      date: "2024-01-15",
      checkIn: "09:02",
      checkOut: "18:30",
      workHours: "8시간 28분",
      status: "late",
      overtime: "30분",
    },
    {
      id: "2",
      employeeName: "김영희",
      department: "디자인팀",
      date: "2024-01-15",
      checkIn: "08:55",
      checkOut: "18:00",
      workHours: "8시간 5분",
      status: "normal",
      overtime: "0분",
    },
    {
      id: "3",
      employeeName: "박철수",
      department: "마케팅팀",
      date: "2024-01-15",
      checkIn: "09:00",
      checkOut: "17:30",
      workHours: "7시간 30분",
      status: "early_leave",
      overtime: "0분",
    },
  ]);

  const [filters, setFilters] = useState({
    department: "",
    employee: "",
    status: "",
    dateFrom: "",
    dateTo: "",
  });

  const getStatusBadge = (status: AttendanceRecord["status"]) => {
    const statusConfig = {
      normal: { label: "정상", variant: "default" as const },
      late: { label: "지각", variant: "destructive" as const },
      early_leave: { label: "조퇴", variant: "secondary" as const },
      absent: { label: "결근", variant: "outline" as const },
    };

    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">근태 내역 관리</h1>
          <p className="text-gray-600">
            직원들의 출퇴근 기록을 조회하고 관리하세요
          </p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          엑셀 다운로드
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>필터</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Select
              value={filters.department}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, department: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="부서 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dev">개발팀</SelectItem>
                <SelectItem value="design">디자인팀</SelectItem>
                <SelectItem value="marketing">마케팅팀</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="직원명 검색"
              value={filters.employee}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, employee: e.target.value }))
              }
            />

            <Select
              value={filters.status}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="상태 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">정상</SelectItem>
                <SelectItem value="late">지각</SelectItem>
                <SelectItem value="early_leave">조퇴</SelectItem>
                <SelectItem value="absent">결근</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="date"
              value={filters.dateFrom}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, dateFrom: e.target.value }))
              }
            />

            <Input
              type="date"
              value={filters.dateTo}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, dateTo: e.target.value }))
              }
            />
          </div>

          <div className="flex justify-end mt-4 space-x-2">
            <Button
              variant="outline"
              onClick={() =>
                setFilters({
                  department: "",
                  employee: "",
                  status: "",
                  dateFrom: "",
                  dateTo: "",
                })
              }
            >
              초기화
            </Button>
            <Button>
              <Search className="w-4 h-4 mr-2" />
              검색
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>근태 기록</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>직원명</TableHead>
                <TableHead>부서</TableHead>
                <TableHead>날짜</TableHead>
                <TableHead>출근시간</TableHead>
                <TableHead>퇴근시간</TableHead>
                <TableHead>근무시간</TableHead>
                <TableHead>초과근무</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">
                    {record.employeeName}
                  </TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.checkIn}</TableCell>
                  <TableCell>{record.checkOut}</TableCell>
                  <TableCell>{record.workHours}</TableCell>
                  <TableCell>{record.overtime}</TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      수정
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

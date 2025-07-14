"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Search, Smartphone } from "lucide-react"

interface Employee {
  id: string
  name: string
  department: string
  position: string
  email: string
  nfcId?: string
  status: "active" | "inactive"
  joinDate: string
}

export default function EmployeeManage() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      name: "홍길동",
      department: "개발팀",
      position: "시니어 개발자",
      email: "hong@company.com",
      nfcId: "NFC001",
      status: "active",
      joinDate: "2023-01-15",
    },
    {
      id: "2",
      name: "김영희",
      department: "디자인팀",
      position: "디자이너",
      email: "kim@company.com",
      nfcId: "NFC002",
      status: "active",
      joinDate: "2023-03-20",
    },
    {
      id: "3",
      name: "박철수",
      department: "마케팅팀",
      position: "마케팅 매니저",
      email: "park@company.com",
      status: "inactive",
      joinDate: "2022-11-10",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddEmployee = () => {
    setEditingEmployee(null)
    setIsDialogOpen(true)
  }

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee)
    setIsDialogOpen(true)
  }

  const handleDeleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id))
  }

  const getStatusBadge = (status: Employee["status"]) => {
    return status === "active" ? <Badge variant="default">활성</Badge> : <Badge variant="secondary">비활성</Badge>
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">직원 관리</h1>
          <p className="text-sm md:text-base text-gray-600">직원 정보와 NFC 태그를 관리하세요</p>
        </div>
        <Button onClick={handleAddEmployee} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          직원 추가
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-500" />
            <Input
              placeholder="직원명, 부서, 이메일로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Employees Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-lg">직원 목록 ({filteredEmployees.length}명)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[80px]">이름</TableHead>
                  <TableHead className="min-w-[80px]">부서</TableHead>
                  <TableHead className="min-w-[100px]">직책</TableHead>
                  <TableHead className="min-w-[150px]">이메일</TableHead>
                  <TableHead className="min-w-[100px]">NFC ID</TableHead>
                  <TableHead className="min-w-[80px]">상태</TableHead>
                  <TableHead className="min-w-[100px]">입사일</TableHead>
                  <TableHead className="min-w-[100px]">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell className="max-w-[150px] truncate">{employee.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Smartphone className="w-4 h-4 text-gray-500" />
                        <span className="font-mono text-sm">{employee.nfcId || "미등록"}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(employee.status)}</TableCell>
                    <TableCell>{employee.joinDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditEmployee(employee)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteEmployee(employee.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Employee Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] mx-4">
          <DialogHeader>
            <DialogTitle>{editingEmployee ? "직원 정보 수정" : "새 직원 추가"}</DialogTitle>
            <DialogDescription>직원의 기본 정보와 NFC 태그를 설정하세요.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                이름
              </Label>
              <Input id="name" defaultValue={editingEmployee?.name || ""} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                부서
              </Label>
              <Input id="department" defaultValue={editingEmployee?.department || ""} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                직책
              </Label>
              <Input id="position" defaultValue={editingEmployee?.position || ""} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                이메일
              </Label>
              <Input id="email" type="email" defaultValue={editingEmployee?.email || ""} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nfcId" className="text-right">
                NFC ID
              </Label>
              <Input
                id="nfcId"
                defaultValue={editingEmployee?.nfcId || ""}
                className="col-span-3"
                placeholder="NFC 태그를 스캔하세요"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full sm:w-auto">
              {editingEmployee ? "수정" : "추가"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

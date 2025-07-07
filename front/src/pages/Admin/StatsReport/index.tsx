import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Download, Calendar, TrendingUp, Users, Clock } from "lucide-react";

const monthlyData = [
  { month: "1월", attendance: 95, late: 5, absent: 2 },
  { month: "2월", attendance: 92, late: 8, absent: 3 },
  { month: "3월", attendance: 97, late: 3, absent: 1 },
  { month: "4월", attendance: 94, late: 6, absent: 2 },
  { month: "5월", attendance: 96, late: 4, absent: 1 },
  { month: "6월", attendance: 93, late: 7, absent: 3 },
];

const departmentData = [
  { name: "개발팀", value: 12, color: "#8884d8" },
  { name: "디자인팀", value: 8, color: "#82ca9d" },
  { name: "마케팅팀", value: 6, color: "#ffc658" },
  { name: "영업팀", value: 4, color: "#ff7300" },
];

const weeklyHours = [
  { week: "1주", hours: 42 },
  { week: "2주", hours: 38 },
  { week: "3주", hours: 45 },
  { week: "4주", hours: 40 },
];

export default function StatsReport() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">통계 및 리포트</h1>
          <p className="text-gray-600">
            근태 데이터를 분석하고 인사이트를 확인하세요
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="2024">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024년</SelectItem>
              <SelectItem value="2023">2023년</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            리포트 다운로드
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">평균 출근율</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94.5%</div>
            <p className="text-xs text-muted-foreground">전월 대비 +2.1%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">평균 근무시간</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">8.2시간</div>
            <p className="text-xs text-muted-foreground">일일 평균</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">지각 횟수</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">33회</div>
            <p className="text-xs text-muted-foreground">이번 달</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">결근 횟수</CardTitle>
            <Users className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">12회</div>
            <p className="text-xs text-muted-foreground">이번 달</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Attendance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>월별 출근 현황</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="attendance" fill="#8884d8" name="출근" />
                <Bar dataKey="late" fill="#82ca9d" name="지각" />
                <Bar dataKey="absent" fill="#ffc658" name="결근" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>부서별 인원 분포</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${percent !== undefined ? (percent * 100).toFixed(0) : "0"}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Hours Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>주간 근무시간 추이</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyHours}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

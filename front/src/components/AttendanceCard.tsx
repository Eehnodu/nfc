import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";

interface AttendanceRecord {
  id: string;
  userName: string;
  status: "present" | "out" | "break" | "absent";
  checkInTime?: string;
  checkOutTime?: string;
  lastActivity: string;
}

interface AttendanceCardProps {
  record: AttendanceRecord;
}

const statusConfig = {
  present: {
    label: "근무중",
    color: "bg-green-500",
    textColor: "text-green-700",
  },
  out: {
    label: "외출중",
    color: "bg-yellow-500",
    textColor: "text-yellow-700",
  },
  break: { label: "휴게중", color: "bg-blue-500", textColor: "text-blue-700" },
  absent: { label: "부재중", color: "bg-gray-500", textColor: "text-gray-700" },
};

export default function AttendanceCard({ record }: AttendanceCardProps) {
  const config = statusConfig[record.status];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>{record.userName}</span>
          </div>
          <Badge className={`${config.color} text-white`}>{config.label}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 text-sm">
          {record.checkInTime && (
            <div className="flex items-center space-x-2">
              <Clock className="w-3 h-3 text-gray-500" />
              <span className="text-gray-600">출근: {record.checkInTime}</span>
            </div>
          )}
          {record.checkOutTime && (
            <div className="flex items-center space-x-2">
              <Clock className="w-3 h-3 text-gray-500" />
              <span className="text-gray-600">퇴근: {record.checkOutTime}</span>
            </div>
          )}
          <div className="text-xs text-gray-500">
            최근 활동: {record.lastActivity}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

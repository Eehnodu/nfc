"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Save, Clock, Bell, Shield, Database } from "lucide-react";

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    workStartTime: "09:00",
    workEndTime: "18:00",
    lateThreshold: "10",
    breakDuration: "60",
    overtimeThreshold: "8",
    enableNotifications: true,
    enableAutoCheckout: false,
    requireNfcForAll: true,
    backupFrequency: "daily",
  });

  const handleSave = () => {
    toast({
      title: "설정 저장 완료",
      description: "시스템 설정이 성공적으로 저장되었습니다.",
    });
  };

  const handleInputChange = (key: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">시스템 설정</h1>
          <p className="text-gray-600">
            근태 관리 시스템의 정책과 설정을 관리하세요
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          설정 저장
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Work Time Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>근무 시간 설정</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="workStart">출근 시간</Label>
                <Input
                  id="workStart"
                  type="time"
                  value={settings.workStartTime}
                  onChange={(e) =>
                    handleInputChange("workStartTime", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workEnd">퇴근 시간</Label>
                <Input
                  id="workEnd"
                  type="time"
                  value={settings.workEndTime}
                  onChange={(e) =>
                    handleInputChange("workEndTime", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lateThreshold">지각 기준 (분)</Label>
              <Input
                id="lateThreshold"
                type="number"
                value={settings.lateThreshold}
                onChange={(e) =>
                  handleInputChange("lateThreshold", e.target.value)
                }
              />
              <p className="text-sm text-gray-600">
                출근 시간 이후 몇 분까지 지각으로 처리할지 설정
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="breakDuration">점심시간 (분)</Label>
              <Input
                id="breakDuration"
                type="number"
                value={settings.breakDuration}
                onChange={(e) =>
                  handleInputChange("breakDuration", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="overtimeThreshold">초과근무 기준 (시간)</Label>
              <Input
                id="overtimeThreshold"
                type="number"
                value={settings.overtimeThreshold}
                onChange={(e) =>
                  handleInputChange("overtimeThreshold", e.target.value)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>알림 설정</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>실시간 알림</Label>
                <p className="text-sm text-gray-600">
                  출퇴근 시 실시간 알림 받기
                </p>
              </div>
              <Switch
                checked={settings.enableNotifications}
                onCheckedChange={(checked) =>
                  handleInputChange("enableNotifications", checked)
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>자동 퇴근 처리</Label>
                <p className="text-sm text-gray-600">
                  설정된 시간에 자동으로 퇴근 처리
                </p>
              </div>
              <Switch
                checked={settings.enableAutoCheckout}
                onCheckedChange={(checked) =>
                  handleInputChange("enableAutoCheckout", checked)
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>NFC 필수 사용</Label>
                <p className="text-sm text-gray-600">
                  모든 출퇴근에 NFC 태그 필수
                </p>
              </div>
              <Switch
                checked={settings.requireNfcForAll}
                onCheckedChange={(checked) =>
                  handleInputChange("requireNfcForAll", checked)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>보안 설정</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>관리자 비밀번호 변경</Label>
              <Input type="password" placeholder="새 비밀번호" />
            </div>
            <div className="space-y-2">
              <Input type="password" placeholder="비밀번호 확인" />
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              비밀번호 변경
            </Button>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <span>데이터 관리</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>데이터 백업 주기</Label>
              <select
                className="w-full p-2 border rounded-md"
                value={settings.backupFrequency}
                onChange={(e) =>
                  handleInputChange("backupFrequency", e.target.value)
                }
              >
                <option value="daily">매일</option>
                <option value="weekly">매주</option>
                <option value="monthly">매월</option>
              </select>
            </div>

            <div className="space-y-2">
              <Button variant="outline" className="w-full bg-transparent">
                수동 백업 실행
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                데이터 내보내기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

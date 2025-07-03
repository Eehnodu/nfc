# app/schemas/attendance.py

from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# ✅ Attendance 기록 생성 요청용
class AttendanceCreate(BaseModel):
    uid: str
    device: Optional[str] = None

# ✅ Attendance 응답용
class AttendanceOut(BaseModel):
    id: int
    uid: str
    device: Optional[str]
    timestamp: datetime

    class Config:
        from_attributes = True  # SQLAlchemy 모델 → Pydantic 변환 허용

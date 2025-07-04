"""
attendance.py
---------------

이 모듈은 출결(Attendance) API에서 사용하는 데이터 스키마(Pydantic 모델)를 정의합니다.

📌 주요 목적:
    - API 요청 시 들어오는 데이터를 검증 및 구조화 (입력 스키마)
    - API 응답 데이터를 직렬화하여 클라이언트에 반환 (출력 스키마)
    - SQLAlchemy 모델과 연동되어 데이터베이스 객체를 안전하게 변환 가능

⚙️ FastAPI에서는 모든 요청/응답 데이터를 Pydantic 모델로 관리함으로써:
    - 타입 검증이 자동으로 이루어지고
    - Swagger 문서도 자동 생성되며
    - 데이터 흐름이 명확해집니다
"""

from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# ✅ 출결 로그 생성 요청 시 사용할 입력 스키마
class AttendanceCreate(BaseModel):
    uid: str                      # 사용자 고유 ID
    device: Optional[str] = None  # 기록 장치 (예: 'nfc', 'web', 'admin 입력')

# ✅ 출결 로그 조회/응답 시 사용할 출력 스키마
class AttendanceOut(BaseModel):
    id: int                       # 출결 기록 고유 ID
    uid: str                      # 사용자 ID
    device: Optional[str]         # 출결 기록 장치
    timestamp: datetime           # 기록된 시간

    class Config:
        from_attributes = True   # SQLAlchemy 모델 인스턴스를 자동 변환 허용
                                 # (ex: return model → response_model=Pydantic)

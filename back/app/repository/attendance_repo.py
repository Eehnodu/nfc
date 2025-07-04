"""
attendance_repo.py
-------------------

이 모듈은 출결(근태) 관련 DB 조작 로직을 담당하는 '레포지토리(Repository)' 계층입니다.

📌 Repository란?
    - 데이터베이스에 직접 접근하는 함수를 모아둔 계층입니다.
    - API 라우터나 서비스 계층에서 직접 SQLAlchemy 세션을 다루지 않고,
      이 repository를 통해 간접적으로 데이터베이스를 조작합니다.
    - 유지보수성과 테스트 효율성을 높여줍니다.

이 파일에서는 출결 로그(`AttendanceLog`)를 생성하는 기능을 제공합니다.
"""

from sqlalchemy.orm import Session
from app.models import AttendanceLog

def create_attendance_log(db: Session, uid: str, device: str) -> AttendanceLog:
    """
    출결 로그를 생성하고 DB에 저장하는 함수.

    Args:
        db (Session): SQLAlchemy DB 세션 (의존성 주입됨)
        uid (str): 사용자 고유 ID
        device (str): 출결 기록을 남긴 장치 또는 방식 (예: 'nfc', 'web')

    Returns:
        AttendanceLog: 새로 생성된 출결 로그 객체
    """
    # AttendanceLog 인스턴스 생성
    new_log = AttendanceLog(uid=uid, device=device)

    # DB에 추가 및 커밋
    db.add(new_log)
    db.commit()

    # 새로 생성된 객체를 최신 상태로 갱신
    db.refresh(new_log)

    return new_log

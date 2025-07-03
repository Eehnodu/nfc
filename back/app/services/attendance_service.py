# app/services/attendance_service.py

from sqlalchemy.orm import Session
from app.repository import attendance_repo
from app.models import AttendanceLog

def create_attendance(db: Session, uid: str, device: str) -> AttendanceLog:
    return attendance_repo.create_attendance_log(db, uid, device)

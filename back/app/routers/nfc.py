# app/routers/nfc.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.attendance import AttendanceCreate, AttendanceOut
from app.services import attendance_service
from app.database import get_db

router = APIRouter()

@router.post("/attendance", response_model=AttendanceOut)
def create_attendance_endpoint(
    data: AttendanceCreate,
    db: Session = Depends(get_db)
):
    return attendance_service.create_attendance(db, uid=data.uid, device=data.device)

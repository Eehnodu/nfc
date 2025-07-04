"""
models.py
----------

이 파일은 SQLAlchemy의 ORM(Object-Relational Mapping)을 활용해
데이터베이스 테이블 구조를 정의하는 파일입니다.

모든 테이블 모델 클래스는 공통적으로 Base 클래스를 상속받습니다.
Base는 app/database.py 에서 선언되며, 이는 SQLAlchemy의 declarative_base()를 기반으로 합니다.

Base를 상속받는 모든 클래스는 실제 DB 테이블로 매핑되며,
Alembic 등의 마이그레이션 도구에서도 자동으로 인식됩니다.

예: User, AttendanceLog 등 여러 모델 정의는 여기서 시작됩니다.
"""

from app.database import Base
from sqlalchemy import Column, Integer, String, DateTime
import datetime

# 출결 로그를 저장하는 테이블
class AttendanceLog(Base):
    __tablename__ = "attendance_logs"  # 실제 DB에 생성될 테이블 이름

    id = Column(Integer, primary_key=True, index=True)  # 고유 ID
    user_id = Column(Integer, nullable=False)           # 출결 대상 사용자 ID
    status = Column(String(50), nullable=False)         # 출근/퇴근 상태값
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)  # 기록 시각

# 사용자 정보를 저장하는 테이블
class User(Base):
    __tablename__ = "users"  # 실제 DB에 생성될 테이블 이름

    id = Column(Integer, primary_key=True, index=True)           # 사용자 고유 ID
    username = Column(String(100), unique=True, nullable=False)  # 사용자 이름
    email = Column(String(100), unique=True, nullable=False)     # 이메일 주소
    phone = Column(String(100), unique=True, nullable=False)     # 전화번호

# app/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config.settings import settings

# settings.get_db_url() 에서 로컬/운영 자동 판단
SQLALCHEMY_DATABASE_URL = settings.get_db_url()

# DB 엔진 생성
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_pre_ping=True,
    echo=settings.env == "local",  # 로컬이면 SQL 쿼리 출력
    future=True
)

# 세션 팩토리
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 모델 베이스 클래스
Base = declarative_base()

# FastAPI 종속성 주입용 세션 생성기
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

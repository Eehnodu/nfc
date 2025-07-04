"""
앱 생성 엔트리 포인트
----------------------

이 모듈은 FastAPI 애플리케이션을 생성하는 진입점입니다.

📌 주요 역할:
    - 앱 인스턴스 생성
    - CORS 설정 미들웨어 등록
    - 데이터베이스 테이블 생성 (로컬 환경에 한정)
    - 라우터(nfc 출결용) 등록

이 구조를 사용하면 `create_app()`을 활용한 테스트, 분리 실행, 다양한 구성 추가가 용이합니다.
"""

from fastapi import FastAPI
from app.routers import nfc
from app.config.settings import settings
from app.middlewares.cors import add_cors
from app.database import engine, Base
import app.models  # 모델 import (자동 테이블 생성 시 필요)

def create_app() -> FastAPI:
    """
    FastAPI 앱 인스턴스를 생성하고 구성 요소(CORS, DB, 라우터 등)를 등록하는 함수.
    """
    app = FastAPI(title=settings.PROJECT_NAME)

    # CORS 미들웨어 등록
    add_cors(app)
    
    # 로컬 환경에서만 자동 테이블 생성
    if settings.env == "local":
        Base.metadata.create_all(bind=engine)

    # 출결 관련 라우터 등록
    app.include_router(nfc.router, prefix=settings.API_PREFIX)

    return app

# FastAPI 애플리케이션 인스턴스
app = create_app()

from fastapi import FastAPI
from app.routers import nfc
from app.config.settings import settings
from app.middlewares.cors import add_cors
from app.database import engine, Base
import app.models 

def create_app() -> FastAPI:
    app = FastAPI(title=settings.PROJECT_NAME)

    # 미들웨어 등록
    add_cors(app)
    
    # 로컬 환경에서만 테이블 자동 생성
    if settings.env == "local":
        Base.metadata.create_all(bind=engine)

    # 라우터 등록
    app.include_router(nfc.router, prefix=settings.API_PREFIX)

    return app

app = create_app()

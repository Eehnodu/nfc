# app/middlewares/cors.py
from fastapi.middleware.cors import CORSMiddleware

def add_cors(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # 배포 시 도메인 제한 권장
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

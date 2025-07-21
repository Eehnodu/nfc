from starlette.middleware.sessions import SessionMiddleware
from app.config import settings

def add_session_middleware(app):
    app.add_middleware(
        SessionMiddleware,
        secret_key=settings.settings.secret_key,  # 필요 시 settings.SECRET_KEY로 치환
        https_only=(settings.settings.env == "prod"),
        same_site="none" if settings.settings.env == "prod" else "lax",
    )

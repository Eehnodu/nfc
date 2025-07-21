from starlette.middleware.httpsredirect import HTTPSRedirectMiddleware
from app.config import settings

def add_https_redirect(app):
    if settings.settings.env == "prod":
        app.add_middleware(HTTPSRedirectMiddleware)

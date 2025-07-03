from pydantic_settings import BaseSettings
import os
import socket

class Settings(BaseSettings):
    # 프로젝트 메타정보
    PROJECT_NAME: str = "FastAPI App"
    API_PREFIX: str = "/api"

    # 공통
    mysql_port: int = 3306

    # 로컬
    local_mysql_user: str
    local_mysql_password: str
    local_mysql_host: str
    local_mysql_db: str

    # 운영
    prod_mysql_user: str
    prod_mysql_password: str
    prod_mysql_host: str
    prod_mysql_db: str

    class Config:
        env_file = ".env"

    @property
    def env(self) -> str:
        hostname = socket.gethostname()
        return "local" if "DESKTOP" in hostname or "raspberry" in hostname else "prod"

    def get_db_url(self) -> str:
        if self.env == "prod":
            return (
                f"mysql+pymysql://{self.prod_mysql_user}:{self.prod_mysql_password}"
                f"@{self.prod_mysql_host}:{self.mysql_port}/{self.prod_mysql_db}"
            )
        return (
            f"mysql+pymysql://{self.local_mysql_user}:{self.local_mysql_password}"
            f"@{self.local_mysql_host}:{self.mysql_port}/{self.local_mysql_db}"
        )

settings = Settings()

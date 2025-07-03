from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context

import os
import sys

# 프로젝트 루트 경로 추가 (app 폴더 기준으로 설정)
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.config.settings import settings             # settings.py 위치에 맞게 import
from app.models.models import Base           # Base가 선언된 파일에서 import

# Alembic Config 객체
config = context.config

# SQLAlchemy URL을 settings에서 동적으로 주입
config.set_main_option("sqlalchemy.url", settings.get_db_url())

# 로깅 설정
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# models에서 정의한 Base.metadata를 사용
target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Offline 모드: Engine 없이 SQL문만 출력"""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Online 모드: DB에 직접 반영"""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True  # 컬럼 타입 변경까지 감지
        )

        with context.begin_transaction():
            context.run_migrations()


# 실행
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()

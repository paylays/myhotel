import os

class Config:
    # Ambil URL database dari environment variable yang didefinisikan di docker-compose.yml
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/myhotel")

    # Optional: Menonaktifkan warning dari SQLAlchemy
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Secret key untuk JWT dan Flask session
    SECRET_KEY = os.environ.get("SECRET_KEY", "super-secret-key")

import os

class Config:
    SQLALCHEMY_DATABASE_URI = (
        f"postgresql://{os.getenv('DB_USER', 'payylayss')}:"
        f"{os.getenv('DB_PASSWORD', 'payylayss')}@"
        f"{os.getenv('DB_HOST', 'localhost')}/"
        f"{os.getenv('DB_NAME', 'myhotel')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

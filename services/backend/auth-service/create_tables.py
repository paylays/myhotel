from flask import Flask
from config import Config
from database.db import db
from models.user import Room 

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

with app.app_context():
    db.create_all()
    print("✅ Tables users created successfully.")

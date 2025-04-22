from flask import Flask
from config import Config
from database.db import db
from models.booking import Booking

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

with app.app_context():
    db.create_all()
    print("✅ Tables bookings created successfully.")

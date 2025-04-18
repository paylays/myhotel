from database.db import db
from datetime import datetime

class Room(db.Model):
    __tablename__ = 'rooms'

    id = db.Column(db.Integer, primary_key=True)
    room_number = db.Column(db.String(20), unique=True, nullable=False)
    type = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    status = db.Column(db.Enum('available', 'occupied', 'maintenance', name='room_status'), default='available')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

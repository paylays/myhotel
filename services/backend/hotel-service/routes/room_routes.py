from flask import Blueprint, request, jsonify
from models.room import Room
from database.db import db

room_bp = Blueprint("room_bp", __name__)

@room_bp.route("/rooms", methods=["GET"])
def get_rooms():
    rooms = Room.query.all()
    return jsonify([{
        "id": r.id,
        "room_number": r.room_number,
        "type": r.type,
        "price": float(r.price),
        "status": r.status
    } for r in rooms])

@room_bp.route("/rooms/<int:room_id>", methods=["GET"])
def get_room_by_id(room_id):
    room = Room.query.get(room_id)
    if not room:
        return jsonify({"error": "Room not found"}), 404
    
    room_data = {
        "id": room.id,
        "room_number": room.room_number,
        "type": room.type,
        "price": float(room.price),
        "status": room.status
    }

    return jsonify(room_data), 200

@room_bp.route("/rooms", methods=["POST"])
def create_room():
    data = request.get_json()
    room = Room(
        room_number=data["room_number"],
        type=data["type"],
        price=data["price"],
        status=data.get("status", "available")
    )
    db.session.add(room)
    db.session.commit()
    return jsonify({"message": "Room created successfully"}), 201

@room_bp.route("/rooms/<int:room_id>", methods=["PUT"])
def update_room(room_id):
    data = request.get_json()
    room = Room.query.get_or_404(room_id)

    room.room_number = data.get("room_number", room.room_number)
    room.type = data.get("type", room.type)
    room.price = data.get("price", room.price)
    room.status = data.get("status", room.status)

    db.session.commit()
    return jsonify({"message": "Room updated successfully"})

@room_bp.route("/rooms/<int:room_id>", methods=["DELETE"])
def delete_room(room_id):
    room = Room.query.get_or_404(room_id)
    db.session.delete(room)
    db.session.commit()
    return jsonify({"message": "Room deleted successfully"})

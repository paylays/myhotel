from flask import Blueprint, request, jsonify, current_app
from models.booking import Booking
from database.db import db
import requests
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity

booking_bp = Blueprint("booking_bp", __name__)

AUTH_SERVICE_URL = "http://auth-service:5001"
HOTEL_SERVICE_URL = "http://hotel-service:5002"

@booking_bp.route("/booking", methods=["GET"])
def get_all_bookings():
    bookings = Booking.query.all()
    booking_list = []

    for b in bookings:
        try:
            user_res = requests.get(f"{AUTH_SERVICE_URL}/api/auth/user/{b.user_id}")
            user_data = user_res.json() if user_res.status_code == 200 else {}
        except Exception as e:
            user_data = {}

        try:
            room_res = requests.get(f"{HOTEL_SERVICE_URL}/rooms/{b.room_id}")
            room_data = room_res.json() if room_res.status_code == 200 else {}
        except Exception as e:
            room_data = {}

        booking_list.append({
            "id": b.id,
            "user_id": b.user_id,
            "user_name": user_data.get("name", "Unknown"),
            "room_id": b.room_id,
            "room_number": room_data.get("room_number", "Unknown"),
            "check_in_date": b.check_in_date.strftime("%Y-%m-%d"),
            "check_out_date": b.check_out_date.strftime("%Y-%m-%d"),
            "status": b.status,
            "created_at": b.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "updated_at": b.updated_at.strftime("%Y-%m-%d %H:%M:%S")
        })

    return jsonify(booking_list), 200

@booking_bp.route("/booking", methods=["POST"])
@jwt_required()
def book_room():
    try:
        user_id = get_jwt_identity()  # langsung ambil dari JWT

        data = request.get_json()
        room_id = data.get("room_id")
        check_in_date = datetime.strptime(data.get("check_in_date"), "%Y-%m-%d").date()
        check_out_date = datetime.strptime(data.get("check_out_date"), "%Y-%m-%d").date()

        room_response = requests.get(f"{HOTEL_SERVICE_URL}/rooms/{room_id}")
        if room_response.status_code != 200:
            return jsonify({"error": "Room not found"}), 404

        room = room_response.json()
        if room["status"] != 'available':
            return jsonify({"error": "Room not available"}), 400

        if check_in_date >= check_out_date:
            return jsonify({"error": "Check-out date must be later than check-in date"}), 400

        check_in_data = {"room_id": room_id}
        check_in_response = requests.post(f"{HOTEL_SERVICE_URL}/check-in", json=check_in_data)

        if check_in_response.status_code != 200:
            return jsonify({"error": "Failed to check-in room"}), 500

        booking = Booking(
            user_id=user_id,
            room_id=room_id,
            check_in_date=check_in_date,
            check_out_date=check_out_date
        )

        db.session.add(booking)
        db.session.commit()

        return jsonify({"message": "Room booked successfully", "booking_id": booking.id}), 201

    except Exception as e:
        return jsonify({"error": "Unexpected error", "details": str(e)}), 500

@booking_bp.route("/availability", methods=["GET"])
def check_availability():
    room_id = request.args.get('room_id', type=int)
    check_in_date = request.args.get('check_in_date', type=str)
    check_out_date = request.args.get('check_out_date', type=str)

    if not room_id or not check_in_date or not check_out_date:
        return jsonify({"error": "Missing parameters"}), 400

    check_in_date = datetime.strptime(check_in_date, "%Y-%m-%d").date()
    check_out_date = datetime.strptime(check_out_date, "%Y-%m-%d").date()

    if check_in_date >= check_out_date:
        return jsonify({"error": "Check-out date must be later than check-in date"}), 400

    room_response = requests.get(f"{HOTEL_SERVICE_URL}/rooms/{room_id}")
    if room_response.status_code != 200:
        return jsonify({"error": "Room not found"}), 404
    
    room_data = room_response.json()
    if room_data.get("status") != "available":
        return jsonify({"available": False}), 200

    bookings = Booking.query.filter(
        Booking.room_id == room_id,
        Booking.check_in_date < check_out_date,
        Booking.check_out_date > check_in_date,
        Booking.status == 'confirmed'
    ).all()

    if bookings:
        return jsonify({"available": False}), 200
    
    return jsonify({"available": True}), 200

@booking_bp.route("/available-rooms", methods=["GET"])
def get_available_rooms():
    check_in_date = request.args.get('check_in_date')
    check_out_date = request.args.get('check_out_date')

    if not check_in_date or not check_out_date:
        return jsonify({"error": "Missing parameters"}), 400

    check_in_date = datetime.strptime(check_in_date, "%Y-%m-%d").date()
    check_out_date = datetime.strptime(check_out_date, "%Y-%m-%d").date()

    all_rooms = requests.get(f"{HOTEL_SERVICE_URL}/rooms").json()
    available_rooms = []

    for room in all_rooms:
        if room['status'] != 'available':
            continue
        
        bookings = Booking.query.filter(
            Booking.room_id == room['id'],
            Booking.check_in_date < check_out_date,
            Booking.check_out_date > check_in_date,
            Booking.status == 'confirmed'
        ).all()

        if not bookings:
            available_rooms.append(room)

    return jsonify(available_rooms)


@booking_bp.route("/booking/cancel/<int:id>", methods=["DELETE"])
def cancel_booking(id):
    booking = Booking.query.get(id)
    if not booking:
        return jsonify({"error": "Booking not found"}), 404

    booking.status = 'canceled'

    check_out_data = {"room_id": booking.room_id}
    check_out_response = requests.post(f"{HOTEL_SERVICE_URL}/check-out", json=check_out_data)

    if check_out_response.status_code != 200:
        return jsonify({"error": "Failed to check-out room"}), 500

    db.session.commit()
    return jsonify({"message": "Booking canceled successfully"}), 200

@booking_bp.route("/booking/history/<int:user_id>", methods=["GET"])
def get_booking_history(user_id):
    bookings = Booking.query.filter_by(user_id=user_id).all()
    if not bookings:
        return jsonify({"message": "No bookings found"}), 404

    booking_history = []

    for b in bookings:
        try:
            room_res = requests.get(f"{HOTEL_SERVICE_URL}/rooms/{b.room_id}")
            room_data = room_res.json() if room_res.status_code == 200 else {}
        except Exception as e:
            room_data = {}

        booking_history.append({
            "id": b.id,
            "room_id": b.room_id,
            "room_number": room_data.get("room_number", "Unknown"),
            "type": room_data.get("type", "Unknown"),
            "check_in_date": b.check_in_date.strftime("%Y-%m-%d"),
            "check_out_date": b.check_out_date.strftime("%Y-%m-%d"),
            "status": b.status,
            "created_at": b.created_at.strftime("%Y-%m-%d %H:%M:%S")
        })

    return jsonify(booking_history), 200

@booking_bp.route("/booking/confirm/<int:booking_id>", methods=["PUT"])
def confirm_booking(booking_id):
    booking = Booking.query.get_or_404(booking_id)

    if booking.status != "pending":
        return jsonify({"error": "Booking is not in pending status"}), 400

    booking.status = "confirmed"
    db.session.commit()

    return jsonify({"message": "Booking confirmed successfully", "booking_id": booking.id}), 200

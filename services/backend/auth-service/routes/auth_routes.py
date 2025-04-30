from flask import Blueprint, request, jsonify
from models.user import User
from database.db import db
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity
)

auth_bp = Blueprint('auth', __name__)
bcrypt = Bcrypt()

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(name=data['name'], email=data['email'], password_hash=hashed_pw, role=data.get('role', 'user'))
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "User registered"}), 201

@auth_bp.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    user = User.query.filter_by(email=data['email'], role='admin').first()
    if not user or not bcrypt.check_password_hash(user.password_hash, data['password']):
        return jsonify({"msg": "Invalid Username or Password"}), 401
    token = create_access_token(identity={"id": user.id, "role": "admin"})
    return jsonify(access_token=token), 200

@auth_bp.route('/user/login', methods=['POST'])
def user_login():
    data = request.json
    user = User.query.filter_by(email=data['email'], role='user').first()
    if not user or not bcrypt.check_password_hash(user.password_hash, data['password']):
        return jsonify({"msg": "Invalid user credentials"}), 401
    token = create_access_token(identity={"id": user.id, "role": "user"})
    return jsonify(access_token=token), 200


@auth_bp.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    current_user = get_jwt_identity()
    return jsonify(message=f"Welcome to the admin dashboard, User ID: {current_user['id']}")


@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    return jsonify(current_user), 200

@auth_bp.route('/user/<int:id>', methods=['GET'])
def get_user_by_id(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role
    }), 200

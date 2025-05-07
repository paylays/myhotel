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
    token = create_access_token(identity=str(user.id))
    return jsonify(access_token=token), 200

@auth_bp.route('/user/login', methods=['POST'])
def user_login():
    data = request.json
    user = User.query.filter_by(email=data['email'], role='user').first()
    if not user or not bcrypt.check_password_hash(user.password_hash, data['password']):
        return jsonify({"msg": "Invalid user credentials"}), 401
    token = create_access_token(identity=str(user.id))
    return jsonify(access_token=token), 200

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()  # {'id': 1, 'role': 'user'}
    user = User.query.get(int(user_id))

    if not user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role
    }), 200

@auth_bp.route('/users', methods=['GET'])
@jwt_required()
def list_users():
    user_id = get_jwt_identity()
    current_user = User.query.get(int(user_id))

    if current_user is None or current_user.role != 'admin':
        return jsonify({"msg": "Unauthorized"}), 403

    users = User.query.filter_by(role='user').order_by(User.name.asc()).all()
    return jsonify([
        {
            "id": u.id,
            "name": u.name,
            "email": u.email,
            "role": u.role
        } for u in users
    ]), 200

@auth_bp.route('/user/<int:id>', methods=['PUT'])
@jwt_required()
def update_user(id):
    user_id = get_jwt_identity() 
    current_user = User.query.get(int(user_id))

    if current_user is None or (current_user.role != 'admin' and current_user.id != id):
        return jsonify({"msg": "Unauthorized"}), 403

    user = User.query.get(id)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    data = request.json
    user.name = data.get('name', user.name)
    user.email = data.get('email', user.email)
    if data.get('password'):
        user.password_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    db.session.commit()
    return jsonify({"msg": "User updated successfully"}), 200

@auth_bp.route('/user/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    user_id = get_jwt_identity()  
    current_user = User.query.get(int(user_id))

    if current_user is None or current_user.role != 'admin':
        return jsonify({"msg": "Unauthorized"}), 403

    user = User.query.get(id)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"msg": "User deleted"}), 200


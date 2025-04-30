from flask import Flask
from config import Config
from database.db import db
from routes.booking_routes import booking_bp
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

with app.app_context():
    db.create_all()

app.register_blueprint(booking_bp)

if __name__ == '__main__':
    app.run(port=5003, debug=True, host='0.0.0.0')

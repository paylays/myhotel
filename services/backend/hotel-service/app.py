from flask import Flask
from config import Config
from database.db import db
from routes.room_routes import room_bp

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

with app.app_context():
    db.create_all()

app.register_blueprint(room_bp)

if __name__ == "__main__":
    app.run(port=5002, debug=True)

from flask import Flask
from config import Config
from database.db import db
from routes.booking_routes import booking_bp

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
app.register_blueprint(booking_bp, url_prefix='/booking')

if __name__ == '__main__':
    app.run(port=5003, debug=True, host='0.0.0.0')

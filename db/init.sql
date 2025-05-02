-- ENUM TYPES
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled');
CREATE TYPE room_status AS ENUM ('available', 'occupied', 'maintenance');

-- TABLE: users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role VARCHAR(10) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABLE: rooms
CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    room_number VARCHAR(20) NOT NULL UNIQUE,
    type VARCHAR(50) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    status room_status,
    created_at TIMESTAMP
);

-- TABLE: bookings
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    room_id INTEGER NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    status booking_status,
    created_at TIMESTAMP,
    updated_at TIME,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_room FOREIGN KEY(room_id) REFERENCES rooms(id)
);

-- FUNCTION: update_updated_at_column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now()::time;
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER: set_updated_at on bookings
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON bookings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


-- DATA DUMMY

-- Users
INSERT INTO users (name, email, password_hash, role)
VALUES 
('user', 'user@example.com', '$2b$12$zL58JMxXQyYV/QhzBQvt7uz8Y8CnO.2GWL2rOwdcQAZRV4SY.4sEG', 'user'),
('admin', 'admin@example.com', '$2b$12$VX/y45Vmh8OGBD4K14P5FeNLUD4FkfgOi3x1y5Nxz9i1aBzZ2IrMa', 'admin');

-- Rooms
INSERT INTO rooms (room_number, type, price, status, created_at)
VALUES
('101', 'Single', 50, 'available', CURRENT_TIMESTAMP),
('102', 'Double', 100, 'available', CURRENT_TIMESTAMP);

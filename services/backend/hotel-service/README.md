# 🔐 Hotel Service Documentation

## 📄 Deskripsi Layanan

Hotel Service adalah service yang menangani manajemen kamar hotel, termasuk penambahan, pembaruan, penghapusan, dan pengecekan ketersediaan kamar. Service ini merupakan bagian dari arsitektur microservices dan berinteraksi langsung dengan Booking Service melalui API. Dibangun menggunakan Flask dan PostgreSQL.

----

## 🧾 Konfigurasi (config.py)

File konfigurasi memuat variabel penting seperti:

- SQLALCHEMY_DATABASE_URI: URI koneksi PostgreSQL yang dikonstruksi dari variabel lingkungan (DB_USER, DB_PASSWORD, DB_HOST, DB_NAME).
- JWT_SECRET_KEY: Kunci rahasia yang digunakan untuk menandatangani JWT.
- SQLALCHEMY_TRACK_MODIFICATIONS: Diatur ke False untuk menonaktifkan notifikasi perubahan objek.

----

## 📁 Struktur Direktori
```
hotel-service/
├── app.py                    # Entry point aplikasi Flask
├── config.py                 # Konfigurasi aplikasi dan database
├── routes/
│   └── room_routes.py        # Endpoint API hotel
├── models/
│   └── room.py               # Model room
├── database/
│   └── db.py                 # Inisialisasi database SQLAlchemy
├── create_tables.py          # Script untuk membuat tabel
├── test_connection.py        # Script untuk menguji koneksi ke DB
├── requirements.txt          # Daftar dependensi Python
```

----

## 🚀 Endpoint API (hotel_routes.py)

### 📝 GET /rooms

Mengambil seluruh data kamar.

### 📍 GET /rooms/

Mengambil data detail kamar berdasarkan ID.

### ➕ POST /rooms

Menambahkan kamar baru dengan format:
```
{
  "room_number": "101",
  "type": "Deluxe",
  "price": 450000,
  "status": "available"
}
```

### ✏️ PUT /rooms/

Memperbarui data kamar.

### ❌ DELETE /rooms/

Menghapus kamar berdasarkan ID.

### 🏨 POST /check-in

Digunakan oleh Booking Service untuk menandai kamar sebagai "occupied".

### 🏦 POST /check-out

Digunakan untuk mengubah status kamar kembali menjadi "available".

----

## 🧑‍💻 Teknologi yang Digunakan

- 🐍 Python + Flask: Framework utama layanan
- 🔐 Flask-JWT-Extended: Untuk autentikasi JWT
- 🌐 Flask-CORS: Mendukung komunikasi frontend-backend antar-origin
- 🛢️ SQLAlchemy: ORM untuk akses data di PostgreSQL

# 🔐 Auth Service Documentation

## 📄 Deskripsi Layanan

Auth Service adalah layanan autentikasi dan otorisasi untuk sistem manajemen hotel berbasis microservices. Service ini bertanggung jawab untuk menangani registrasi pengguna, login (user dan admin), serta manajemen profil pengguna. Layanan ini dibangun menggunakan Flask, PostgreSQL, JWT, dan Flask-CORS.

----

## 🧾 Konfigurasi (config.py)

File konfigurasi memuat variabel penting seperti:

- SQLALCHEMY_DATABASE_URI: URI koneksi PostgreSQL yang dikonstruksi dari variabel lingkungan (DB_USER, DB_PASSWORD, DB_HOST, DB_NAME).
- JWT_SECRET_KEY: Kunci rahasia yang digunakan untuk menandatangani JWT.
- SQLALCHEMY_TRACK_MODIFICATIONS: Diatur ke False untuk menonaktifkan notifikasi perubahan objek.

----

## 📁 Struktur Direktori
```
auth-service/
├── app.py                   # Entry point aplikasi Flask
├── config.py                # Konfigurasi aplikasi dan database
├── routes/
│   └── auth_routes.py       # Rute untuk autentikasi dan manajemen user
├── models/
│   └── user.py              # Model pengguna (User)
├── database/
│   └── db.py                # Inisialisasi database SQLAlchemy
├── create_tables.py         # Script untuk membuat tabel
├── test_connection.py       # Script untuk menguji koneksi ke DB
├── requirements.txt         # Daftar dependensi Python
```

----

## 🚀 Endpoint API (routes/auth_routes.py)

#### 📝 POST /api/auth/register

Mendaftarkan pengguna baru.

#### 🔐 POST /api/auth/admin/login

Login untuk pengguna dengan peran admin. Mengembalikan JWT token.

#### 🔐 POST /api/auth/user/login

Login untuk pengguna biasa (role user). Mengembalikan JWT token.

#### 👤 GET /api/auth/me

Mengambil profil pengguna berdasarkan JWT.

#### 👥 GET /api/auth/users

Admin-only. Mengambil seluruh daftar user dengan role "user".

#### ✏️ PUT /api/auth/user/<id>

Memperbarui informasi pengguna tertentu.
Hanya dapat dilakukan oleh admin atau user bersangkutan.

####  🗑 DELETE /api/auth/user/<id>

Menghapus pengguna berdasarkan ID. Hanya admin yang dapat menghapus.

----

## 🧑‍💻 Teknologi yang Digunakan

- 🐍 Python + Flask: Framework utama layanan
- 🔐 Flask-JWT-Extended: Untuk autentikasi JWT
- 🔒 Flask-Bcrypt: Untuk hashing password
- 🌐 Flask-CORS: Mendukung komunikasi frontend-backend antar-origin
- 🛢️ SQLAlchemy: ORM untuk akses data di PostgreSQL

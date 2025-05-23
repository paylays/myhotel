# 🔐 Booking Service Documentation

## 📄 Deskripsi Layanan

Booking Service adalah layanan untuk menangani proses pemesanan kamar dalam sistem manajemen hotel berbasis microservices. Layanan ini memungkinkan user untuk memesan kamar, mengecek ketersediaan, melihat riwayat pemesanan, serta melakukan pembatalan atau konfirmasi pemesanan. Booking Service berinteraksi dengan Auth Service dan Hotel Service melalui HTTP request.

----

## 🧾 Konfigurasi (config.py)

File konfigurasi memuat variabel penting seperti:

- SQLALCHEMY_DATABASE_URI: URI koneksi PostgreSQL yang dikonstruksi dari variabel lingkungan (DB_USER, DB_PASSWORD, DB_HOST, DB_NAME).
- JWT_SECRET_KEY: Kunci rahasia yang digunakan untuk menandatangani JWT.
- SQLALCHEMY_TRACK_MODIFICATIONS: Diatur ke False untuk menonaktifkan notifikasi perubahan objek.

----

## 📁 Struktur Direktori
```
booking-service/
├── app.py                    # Entry point aplikasi Flask
├── config.py                 # Konfigurasi aplikasi dan database
├── routes/
│   └── booking_routes.py     # Endpoint API booking
├── models/
│   └── booking.py            # Model Booking
├── database/
│   └── db.py                 # Inisialisasi database SQLAlchemy
├── create_tables.py          # Script untuk membuat tabel
├── test_connection.py        # Script untuk menguji koneksi ke DB
├── requirements.txt          # Daftar dependensi Python
```

----

## 🚀 Endpoint API (booking_routes.py)

### 📋 GET /booking

Mengambil semua data booking beserta data user dan kamar dari Auth & Hotel Service.

### 🛏️ GET /availability?room_id=&check_in_date=&check_out_date=

Memeriksa ketersediaan kamar pada rentang tanggal tertentu.

### 🧾 GET /available-rooms?check_in_date=&check_out_date=

Mengambil daftar kamar yang tersedia berdasarkan tanggal check-in dan check-out.

### 📝 POST /booking

Melakukan pemesanan kamar.
- Mengambil user_id dari JWT.
- Mengecek ketersediaan kamar.
- Mengirim permintaan check-in ke Hotel Service.
- Menyimpan data booking dengan status default pending.

### ❌ DELETE /booking/cancel/

Membatalkan booking dan melakukan check-out kamar di Hotel Service.

### 📖 GET /booking/history/<user_id>

Mengambil riwayat booking berdasarkan user_id.

### ✅ PUT /booking/confirm/<booking_id>

Mengonfirmasi booking dengan mengubah status menjadi confirmed.

----

## 🧑‍💻 Teknologi yang Digunakan

- 🐍 Python + Flask: Framework utama layanan
- 🔐 Flask-JWT-Extended: Untuk autentikasi JWT
- 🌐 Flask-CORS: Mendukung komunikasi frontend-backend antar-origin
- 🛢️ SQLAlchemy: ORM untuk akses data di PostgreSQL
- Requests: Untuk berkomunikasi dengan Auth & Hotel Service

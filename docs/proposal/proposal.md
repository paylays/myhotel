## 📄 Proposal Proyek: Sistem Reservasi Hotel

### 👥 Anggota Tim
1. **Taufik Ilham** – 10221081
2. **Efhy Wati Manalu** – 10221067
3. **Priyo Galih Prasetyo** – 10221037

---

### 📌 Deskripsi Proyek

MyHotel adalah sistem booking hotel berbasis web yang memungkinkan pengguna untuk melakukan pemesanan kamar hotel secara daring. Sistem ini memudahkan proses pengecekan ketersediaan kamar, pemesanan, check-in/check-out, hingga riwayat dan notifikasi pemesanan. Sistem dirancang dengan pendekatan arsitektur microservices agar mudah dikembangkan dan diskalakan.

---

### 🎯 Ruang Lingkup Proyek

- Manajemen pengguna (user & admin)
- Reservasi kamar hotel
- Cek Ketersediaan Kamar
- Proses check-in/check-out
- Riwayat dan pembatalan pemesanan
- Sistem notifikasi (email/sistem)
- Dashboard admin untuk manajemen dan reservasi

---

### 📅 Timeline Pengerjaan

| Pekan | Kegiatan |
|-------|----------|
| 9     | Perancangan dan Inisiasi Proyek |
| 10    | Pengembangan Backend Microservices |
| 11    | Pengembangan Frontend |
| 12    | Integrasi dan Docker Compose |
| 13    | CI/CD Setup dan Cloud Deployment |
| 14    | Monitoring, Logging, dan Scaling |
| 15    | Finalisasi dan Presentasi |

---

### 🧑‍🔧 Pembagian Tugas

| Nama | Tugas |
|------|-------|
| Taufik Ilham | Backend Engineer |
| Efhy Wati Manalu | Frontend Engineer,  |
| Priyo Galih Prasetyo | DevOps/Infrastructure Engineer |

---

### 🧱 Arsitektur Microservices

```
[Frontend React]
       |
[API Gateway]
       |
-----------------------------------------
|            |             |            |
Auth      Booking        Hotel     Notification
Service   Service       Service      Service
```

#### Deskripsi Singkat Microservices:
- **Auth Service**: Login, registrasi, otorisasi
- **Reservation Service**: Booking, cancel, check availability
- **Hotel/Restaurant Service**: Info kamar/meja, check-in/check-out
- **Notification Service**: Email notifikasi konfirmasi & pengingat

---

### 🖼️ Wireframe UI/UX

#### Halaman Utama
- Menu navigasi: Beranda | Login | Booking | Riwayat
- Tombol: "Pesan Sekarang"

![Halaman Utama](/docs/proposal/HalamanUtama.jpg)

Penjelasan Detail : 

##### 🧭 Header (atas):
- MYHOTEL: Logo brand, biasanya klik untuk kembali ke halaman utama.
- Menu:
  - Beranda: Halaman utama.
  - Booking: Buat pemesanan hotel.
  - Riwayat: Lihat histori booking.
  - Sign In: Tombol login pengguna.

##### 🖼️ Konten utama:
- Judul: "Halaman Utama" → penanda halaman awal.
- Deskripsi: Penjelasan singkat tentang sistem.
- Tombol "Pesan Sekarang": Aksi utama untuk mulai booking.

##### 📷 Ilustrasi:
- Kotak besar kanan → Gambar Tampilan sistem.

##### 📌 Footer:
- Tulisan © 2025 MyHotel → hak cipta & tahun.

---

#### Halaman Booking
- Form Input: Tanggal Check-in & Check-out, Jumlah Tamu, Tipe Kamar
- Tombol: "Cek Ketersediaan"

![Halaman Booking](/docs/proposal/HalamanBooking.jpg)

##### 🧾 Judul & Subjudul:
- "Reservasi Sekarang" → Judul utama halaman.
- "Isi detail reservasi Anda" → Instruksi singkat untuk pengguna.

##### 📅 Form Reservasi:
- Tanggal (check-in & check-out): Dua input tanggal.
- Jumlah Tamu: Input angka jumlah tamu.
- Tombol:
  - Batal: Membatalkan input.
  - Cek Ketersediaan: Mengecek apakah kamar tersedia.

---

#### Dashboard Admin
- Tabel daftar booking
- Status check-in/check-out
- Tombol aksi: "Konfirmasi", "Batalkan", "Lihat Detail"

##### 📌 Sidebar (Sebelah Kiri)
- Logo dan nama aplikasi MyHotel
- Menu navigasi:
  - Dashboard
  - Reservasi

##### 🧭 Header (atas):
- Gambar profil admin (ikon bulat abu-abu)
- Teks Admin Dashboard
- Teks sambutan: "Selamat datang, Admin"

##### 🖼️ Konten utama:
- Judul: Tabel Reservasi
- Tombol: Create Reservation
- Tabel dengan kolom:
  - Checkbox (untuk memilih baris)
  - Nama (berisi nama tamu, nomor telepon, atau jabatan)
  - Room Number (nomor kamar)
  - Check-in (tanggal masuk)
  - Check-out (tanggal keluar)
  - Status:
    - Selesai (warna hijau)
    - Terlambat (warna merah)
    - Ongoing (warna kuning)

##### 📌 Footer:
- Tulisan © 2025 MyHotel → hak cipta & tahun.

---

### 📁 Struktur Awal Repository GitHub

```
/myhotel
├── db/
├── docs/
|   ├── proposal/
|   |   ├── proposal.md
├── services/
|   ├── backend/
|   │   ├── auth-service/
|   │   ├── reservation-service/
|   │   ├── hotel-service/
|   │   └── notification-service/
|   ├── frontend/
├── docker-compose.yml
├── README.md
└── docs/
```
# API Documentation MyHotel

## 🔐 Auth Service API Documentation

### 🌐 Base URL

```
http://localhost:5001
```

### 🔑 Authentication

Gunakan JWT token untuk mengakses endpoint yang dilindungi.

Token dikirim melalui header:

```
Authorization: Bearer <your_token>
```

### 📋 Endpoints

#### 📌 POST `/register`

Deskripsi: Mendaftarkan pengguna baru ke sistem.

##### 🔍 Request Headers

Content-Type: application/json

##### 🔍 Request Body

```json
{
  "name": "User 1",
  "email": "user@example.com",
  "password": "user123",
  "role": "user"
}
```

##### 🔁 Response

```json
{
  "msg": "User registered"
}
```

**Status Code: `201 Created`**

##### ⚠️ Error Handling
- 400 Bad Request: Jika data tidak lengkap.
- 409 Conflict: Jika email sudah digunakan.

---

#### 📌 POST `/login`

Deskripsi: Autentikasi pengguna dan menghasilkan JWT token.

##### 🔍 Request Headers

Content-Type: application/json

##### 🔍 Request Body

```json
{
  "email": "user@example.com",
  "password": "user123",
}
```

##### 🔁 Response

```json
{
  "access_token": "<jwt_token>"
}
```

**Status Code: `200 OK`**

##### ⚠️ Error Handling
- 401 Unauthorized: Jika email atau password salah.

---

#### 📌 GET `/me`

Deskripsi: Mengambil data user yang sedang login berdasarkan token.

##### 🔍 Request Headers

Authorization: Bearer <jwt_token>

##### 🔍 Request Body

Tidak perlu body.

##### 🔁 Response

```json
{
  "id": 1,
  "role": "user"
}
```

**Status Code: `200 OK`**

##### ⚠️ Error Handling
- 401 Unauthorized: Jika token tidak valid atau tidak disertakan.

---

## 🏨 Hotel Service API Documentation

### 🌐 Base URL

```
http://localhost:5002
```

### 📋 Endpoints

#### 📌 GET `/rooms`

Deskripsi: Mengambil seluruh daftar kamar.

##### 🔍 Request 
Tidak memerlukan parameter.

##### 🔁 Response

```json
[
  {
    "id": 1,
    "room_number": "101",
    "type": "Deluxe",
    "price": 350000,
    "status": "available"
  },
  ...
]
```

**Status Code: `201 Created`**

---

#### 📌 GET `/rooms/<room_id>`

Deskripsi: Mengambil detail kamar berdasarkan ID.

##### 🔍 Path Parameter

- room_id (int): ID kamar yang ingin dilihat.

##### 🔁 Response

```json
{
  "id": 1,
  "room_number": "101",
  "type": "Deluxe",
  "price": 350000,
  "status": "available"
}
```

**Status Code: `200 OK`**

##### ⚠️ Error Handling

```json
{
  "error": "Room not found"
}
```

- 404 Not Found : Jika kamar tidak ditemukan.

---

#### 📌 POST `/rooms`

Deskripsi: Menambahkan data kamar baru.

##### 🔍 Request Headers

Content-Type: application/json

##### 🔍 Request Body

```json
{
  "room_number": "102",
  "type": "Standard",
  "price": 250000,
  "status": "available"
}
```

##### 🔁 Response

```json
{
  "message": "Room created successfully"
}
```

**Status Code: `201 Created`**

---

#### 📌 PUT `/rooms/<room_id>`

Deskripsi: Memperbarui data kamar berdasarkan ID.

##### 🔍 Path Parameter

- room_id (int): ID kamar yang ingin diperbarui.

##### 🔍 Request Body

```json
{
  "room_number": "103",
  "type": "VIP",
  "price": 500000,
  "status": "occupied"
}
```

Semua field bersifat optional — hanya isi field yang ingin diperbarui.

##### 🔁 Response

```json
{
  "message": "Room updated successfully"
}
```

**Status Code: `200 OK`**

---

#### 📌 DELETE `/rooms/<room_id>`

Deskripsi: Menghapus kamar berdasarkan ID.

##### 🔍 Path Parameter

- room_id (int): ID kamar yang ingin dihapus.

##### 🔁 Response

```json
{
  "message": "Room deleted successfully"
}
```

**Status Code: `200 OK`**
# Clinic Management Backend

Backend aplikasi administrasi klinik yang dibangun menggunakan **NestJS**, **TypeScript**, **TypeORM**, dan **PostgreSQL**. Aplikasi ini digunakan untuk mengelola data pasien, dokter, departemen, janji temu, serta rekam kunjungan pasien.

## 1. Fitur Utama

Aplikasi ini memiliki lima modul utama:

### 1. Patients
Mengelola informasi pasien, meliputi:
- Menambahkan data pasien.
- Menampilkan seluruh data pasien.
- Menampilkan detail pasien berdasarkan ID.
- Memperbarui data pasien.
- Menghapus data pasien (soft delete).

### 2. Doctors
Mengelola informasi dokter, meliputi:
- Menambahkan data dokter.
- Menampilkan seluruh data dokter.
- Menampilkan detail dokter berdasarkan ID.
- Memperbarui data dokter.
- Menghapus data dokter (soft delete).
- Mengatur status aktif dokter.
- Menghubungkan dokter dengan departemen.

### 3. Departments
Mengelola departemen atau bagian layanan klinik, meliputi:
- Menambahkan departemen.
- Menampilkan seluruh departemen.
- Menampilkan detail departemen.
- Memperbarui informasi departemen.
- Menghapus departemen (soft delete).
- Menampilkan dokter berdasarkan departemen.

### 4. Appointments
Mengelola janji temu pasien dengan dokter, meliputi:
- Membuat janji temu.
- Menampilkan seluruh janji temu.
- Menampilkan detail janji temu.
- Memperbarui informasi janji temu.
- Mengubah status janji temu.
- Menghapus janji temu (soft delete).

Status janji temu:
- `pending` – Menunggu konfirmasi.
- `confirmed` – Janji temu telah dikonfirmasi.
- `completed` – Kunjungan telah selesai.
- `cancelled` – Janji temu dibatalkan.

### 5. Medical Records
Mengelola catatan kunjungan pasien, meliputi:
- Menambahkan rekam kunjungan.
- Menampilkan seluruh rekam kunjungan.
- Menampilkan detail rekam kunjungan.
- Memperbarui rekam kunjungan.
- Menghapus rekam kunjungan.

Rekam kunjungan berisi:
- Tanggal kunjungan.
- Keluhan pasien.
- Hasil pemeriksaan.
- Catatan kunjungan.

## 2. Teknologi yang Digunakan

| Teknologi | Keterangan |
|---|---|
| Node.js | JavaScript Runtime |
| NestJS | Backend Framework |
| TypeScript | Bahasa pemrograman |
| TypeORM | Object Relational Mapper |
| PostgreSQL | Database |
| class-validator | Validasi data |
| class-transformer | Transformasi data |
| @nestjs/config | Pengelolaan konfigurasi |
| REST API | Komunikasi client dan server |

## 3. Struktur Project

```text
clinic_management/
├── src/
│   ├── patients/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── patients.controller.ts
│   │   ├── patients.module.ts
│   │   └── patients.service.ts
│   │
│   ├── doctors/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── doctors.controller.ts
│   │   ├── doctors.module.ts
│   │   └── doctors.service.ts
│   │
│   ├── departments/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── departments.controller.ts
│   │   ├── departments.module.ts
│   │   └── departments.service.ts
│   │
│   ├── appointments/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── appointments.controller.ts
│   │   ├── appointments.module.ts
│   │   └── appointments.service.ts
│   │
│   ├── medical_records/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── medical_records.controller.ts
│   │   ├── medical_records.module.ts
│   │   └── medical_records.service.ts
│   │
│   ├── interceptors/
│   │   └── transform-response/
│   │
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
│
├── test/
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

## 4. Relasi Database

Relasi antarentitas yang digunakan:

1. **Departments – Doctors:** One-to-Many. Satu departemen dapat memiliki banyak dokter.
2. **Patients – Appointments:** One-to-Many. Satu pasien dapat memiliki banyak janji temu.
3. **Doctors – Appointments:** One-to-Many. Satu dokter dapat menangani banyak janji temu.
4. **Appointments – Medical Records:** One-to-One. Satu janji temu dapat memiliki maksimal satu rekam kunjungan.

## 5. Instalasi

### Persyaratan
Pastikan perangkat sudah memiliki:
- Node.js dan npm.
- PostgreSQL.
- Git (opsional).
- Postman untuk pengujian API.

### Clone Repository

```bash
git clone <repository-url>
cd clinic_management
```

### Install Dependencies

```bash
npm install
```

### Install Dependencies Tambahan

```bash
npm install @nestjs/config pg
```

## 6. Konfigurasi Environment

Buat file `.env` pada direktori utama project.

```env
PORT=3000
NODE_ENV=development

DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
```

Sesuaikan konfigurasi database dengan PostgreSQL yang digunakan.

Buat database dengan nama:

```sql
CREATE DATABASE clinic_db;
```

## 7. Menjalankan Aplikasi

### Development Mode

```bash
npm run start:dev
```

### Build Project

```bash
npm run build
```

### Production Mode

```bash
npm run start:prod
```

Jika aplikasi berhasil dijalankan, backend dapat diakses melalui:

```text
http://localhost:3000
```

## 8. API Endpoints

Base URL:

```text
http://localhost:3000
```

### Patients

| Method | Endpoint | Keterangan |
|---|---|---|
| POST | /patients | Menambahkan pasien |
| GET | /patients | Menampilkan semua pasien |
| GET | /patients/:id | Detail pasien |
| PATCH | /patients/:id | Memperbarui pasien |
| DELETE | /patients/:id | Menghapus pasien |

### Doctors

| Method | Endpoint | Keterangan |
|---|---|---|
| POST | /doctors | Menambahkan dokter |
| GET | /doctors | Menampilkan semua dokter |
| GET | /doctors/:id | Detail dokter |
| PATCH | /doctors/:id | Memperbarui dokter |
| DELETE | /doctors/:id | Menghapus dokter |

### Departments

| Method | Endpoint | Keterangan |
|---|---|---|
| POST | /departments | Menambahkan departemen |
| GET | /departments | Menampilkan semua departemen |
| GET | /departments/:id | Detail departemen |
| PATCH | /departments/:id | Memperbarui departemen |
| DELETE | /departments/:id | Menghapus departemen |

### Appointments

| Method | Endpoint | Keterangan |
|---|---|---|
| POST | /appointments | Membuat janji temu |
| GET | /appointments | Menampilkan semua janji temu |
| GET | /appointments/:id | Detail janji temu |
| PATCH | /appointments/:id | Memperbarui janji temu |
| PATCH | /appointments/:id/status | Mengubah status |
| DELETE | /appointments/:id | Menghapus janji temu |

### Medical Records

| Method | Endpoint | Keterangan |
|---|---|---|
| POST | /medical-records | Menambahkan rekam kunjungan |
| GET | /medical-records | Menampilkan semua rekam kunjungan |
| GET | /medical-records/:id | Detail rekam kunjungan |
| PATCH | /medical-records/:id | Memperbarui rekam kunjungan |
| DELETE | /medical-records/:id | Menghapus rekam kunjungan |

## 9. Contoh Request API

### Menambahkan Pasien

**POST** `/patients`

```json
{
  "fullName": "Andi Pratama",
  "dateOfBirth": "2002-05-12",
  "gender": "male",
  "address": "Semarang",
  "phone": "081234567890",
  "email": "andi@example.com"
}
```

### Menambahkan Departemen

**POST** `/departments`

```json
{
  "name": "Poli Umum",
  "description": "Pelayanan kesehatan umum"
}
```

### Menambahkan Dokter

**POST** `/doctors`

```json
{
  "fullName": "dr. Budi Santoso",
  "specialization": "Dokter Umum",
  "email": "budi@example.com",
  "phone": "081234567891",
  "licenseNumber": "SIP123456",
  "departmentId": "UUID-DEPARTEMEN"
}
```

### Membuat Janji Temu

**POST** `/appointments`

```json
{
  "patientId": "UUID-PASIEN",
  "doctorId": "UUID-DOKTER",
  "appointmentDate": "2026-12-15T09:00:00",
  "reason": "Pemeriksaan rutin"
}
```

### Mengubah Status Janji Temu

**PATCH** `/appointments/:id/status`

```json
{
  "status": "confirmed"
}
```

### Menambahkan Rekam Kunjungan

**POST** `/medical-records`

```json
{
  "appointmentId": "UUID-JANJI-TEMU",
  "visitDate": "2026-12-15T09:00:00",
  "complaint": "Demam dan batuk",
  "examination": "Pemeriksaan umum",
  "notes": "Catatan kunjungan pasien"
}
```

## 10. Validasi dan Penanganan Error

Aplikasi menggunakan `ValidationPipe` dari NestJS dengan konfigurasi:

- `whitelist`: Menghapus properti yang tidak memiliki decorator validasi.
- `forbidNonWhitelisted`: Menolak request yang memiliki properti tidak dikenal.
- `transform`: Mengubah data request sesuai tipe DTO.
- Pesan validasi menggunakan bahasa Indonesia.

Penanganan error menggunakan HTTP Exception dari NestJS, seperti:

| Status Code | Keterangan |
|---|---|
| 200 | Permintaan berhasil |
| 201 | Data berhasil dibuat |
| 400 | Data atau permintaan tidak valid |
| 404 | Data tidak ditemukan |
| 409 | Terjadi konflik data |
| 500 | Kesalahan server |

## 11. Aturan Bisnis

Beberapa aturan bisnis yang diterapkan:

1. Setiap dokter harus terhubung dengan satu departemen.
2. Setiap janji temu harus memiliki pasien dan dokter yang valid.
3. Janji temu hanya dapat dibuat dengan dokter yang aktif.
4. Tanggal janji temu harus lebih dari waktu sekarang.
5. Janji temu yang sudah selesai atau dibatalkan tidak dapat diubah kembali melalui endpoint perubahan status.
6. Satu janji temu hanya dapat memiliki satu rekam kunjungan.
7. Janji temu yang dibatalkan tidak dapat memiliki rekam kunjungan.
8. Ketika rekam kunjungan dibuat, status janji temu otomatis berubah menjadi `completed`.
9. Data pasien, dokter, departemen, dan janji temu menggunakan mekanisme soft delete.
10. Data rekam kunjungan tidak menggunakan soft delete.

## 12. Catatan

- Data pasien yang digunakan untuk pengujian merupakan data fiktif.
- Aplikasi berfokus pada administrasi klinik.
- Aplikasi tidak mencakup diagnosis klinis, resep elektronik, maupun integrasi layanan medis.
- Konfigurasi `synchronize` hanya digunakan untuk pengembangan. Untuk production, gunakan migration TypeORM.
- Pastikan database PostgreSQL sudah berjalan sebelum menjalankan aplikasi.

---

**Clinic Management Backend**

Built with NestJS, TypeScript, TypeORM, and PostgreSQL.
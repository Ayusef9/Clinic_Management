Clinic Management Backend
Backend aplikasi administrasi klinik yang dibangun menggunakan NestJS, TypeScript, TypeORM, dan PostgreSQL. Aplikasi ini digunakan untuk mengelola data pasien, dokter, departemen, janji temu, serta rekam kunjungan pasien.
1. Fitur Utama
Aplikasi ini memiliki lima modul utama:
1. Patients
Mengelola informasi pasien, meliputi:
Menambahkan data pasien.
Menampilkan seluruh data pasien.
Menampilkan detail pasien berdasarkan ID.
Memperbarui data pasien.
Menghapus data pasien (soft delete).
2. Doctors
Mengelola informasi dokter, meliputi:
Menambahkan data dokter.
Menampilkan seluruh data dokter.
Menampilkan detail dokter berdasarkan ID.
Memperbarui data dokter.
Menghapus data dokter (soft delete).
Mengatur status aktif dokter.
Menghubungkan dokter dengan departemen.
3. Departments
Mengelola departemen atau bagian layanan klinik, meliputi:
Menambahkan departemen.
Menampilkan seluruh departemen.
Menampilkan detail departemen.
Memperbarui informasi departemen.
Menghapus departemen (soft delete).
Menampilkan dokter berdasarkan departemen.
4. Appointments
Mengelola janji temu pasien dengan dokter, meliputi:
Membuat janji temu.
Menampilkan seluruh janji temu.
Menampilkan detail janji temu.
Memperbarui informasi janji temu.
Mengubah status janji temu.
Menghapus janji temu (soft delete).
Status janji temu:
pending – Menunggu konfirmasi.
confirmed – Janji temu telah dikonfirmasi.
completed – Kunjungan telah selesai.
cancelled – Janji temu dibatalkan.
5. Medical Records
Mengelola catatan kunjungan pasien, meliputi:
Menambahkan rekam kunjungan.
Menampilkan seluruh rekam kunjungan.
Menampilkan detail rekam kunjungan.
Memperbarui rekam kunjungan.
Menghapus rekam kunjungan.
Rekam kunjungan berisi:
Tanggal kunjungan.
Keluhan pasien.
Hasil pemeriksaan.
Catatan kunjungan.
2. Teknologi yang Digunakan
TeknologiKeteranganNode.jsJavaScript RuntimeNestJSBackend FrameworkTypeScriptBahasa pemrogramanTypeORMObject Relational MapperPostgreSQLDatabaseclass-validatorValidasi dataclass-transformerTransformasi data@nestjs/configPengelolaan konfigurasiREST APIKomunikasi client dan server
3. Struktur Project
clinic_management/├── src/│   ├── patients/│   │   ├── dto/│   │   ├── entities/│   │   ├── patients.controller.ts│   │   ├── patients.module.ts│   │   └── patients.service.ts│   ││   ├── doctors/│   │   ├── dto/│   │   ├── entities/│   │   ├── doctors.controller.ts│   │   ├── doctors.module.ts│   │   └── doctors.service.ts│   ││   ├── departments/│   │   ├── dto/│   │   ├── entities/│   │   ├── departments.controller.ts│   │   ├── departments.module.ts│   │   └── departments.service.ts│   ││   ├── appointments/│   │   ├── dto/│   │   ├── entities/│   │   ├── appointments.controller.ts│   │   ├── appointments.module.ts│   │   └── appointments.service.ts│   ││   ├── medical_records/│   │   ├── dto/│   │   ├── entities/│   │   ├── medical_records.controller.ts│   │   ├── medical_records.module.ts│   │   └── medical_records.service.ts│   ││   ├── interceptors/│   │   └── transform-response/│   ││   ├── app.controller.ts│   ├── app.module.ts│   ├── app.service.ts│   └── main.ts│├── test/├── .env├── package.json├── tsconfig.json└── README.md
4. Relasi Database
Relasi antarentitas yang digunakan:
Departments – Doctors: One-to-Many. Satu departemen dapat memiliki banyak dokter.
Patients – Appointments: One-to-Many. Satu pasien dapat memiliki banyak janji temu.
Doctors – Appointments: One-to-Many. Satu dokter dapat menangani banyak janji temu.
Appointments – Medical Records: One-to-One. Satu janji temu dapat memiliki maksimal satu rekam kunjungan.
5. Instalasi
Persyaratan
Pastikan perangkat sudah memiliki:
Node.js dan npm.
PostgreSQL.
Git (opsional).
Postman untuk pengujian API.
Clone Repository
git clone <repository-url>cd clinic_management
Install Dependencies
npm install
Install Dependencies Tambahan
npm install @nestjs/config pg
6. Konfigurasi Environment
Buat file .env pada direktori utama project.
PORT=3000NODE_ENV=developmentDB_HOST=localhostDB_PORT=5435DB_USERNAME=rootDB_PASSWORD=secretDB_DATABASE=clinic_db
Sesuaikan konfigurasi database dengan PostgreSQL yang digunakan.
Buat database dengan nama:
CREATE DATABASE clinic_db;
7. Menjalankan Aplikasi
Development Mode
npm run start:dev
Build Project
npm run build
Production Mode
npm run start:prod
Jika aplikasi berhasil dijalankan, backend dapat diakses melalui:
http://localhost:3000
8. API Endpoints
Base URL:
http://localhost:3000
Patients
MethodEndpointKeteranganPOST/patientsMenambahkan pasienGET/patientsMenampilkan semua pasienGET/patients/Detail pasienPATCH/patients/Memperbarui pasienDELETE/patients/Menghapus pasien
Doctors
MethodEndpointKeteranganPOST/doctorsMenambahkan dokterGET/doctorsMenampilkan semua dokterGET/doctors/Detail dokterPATCH/doctors/Memperbarui dokterDELETE/doctors/Menghapus dokter
Departments
MethodEndpointKeteranganPOST/departmentsMenambahkan departemenGET/departmentsMenampilkan semua departemenGET/departments/Detail departemenPATCH/departments/Memperbarui departemenDELETE/departments/Menghapus departemen
Appointments
MethodEndpointKeteranganPOST/appointmentsMembuat janji temuGET/appointmentsMenampilkan semua janji temuGET/appointments/Detail janji temuPATCH/appointments/Memperbarui janji temuPATCH/appointments//statusMengubah statusDELETE/appointments/Menghapus janji temu
Medical Records
MethodEndpointKeteranganPOST/medical-recordsMenambahkan rekam kunjunganGET/medical-recordsMenampilkan semua rekam kunjunganGET/medical-records/Detail rekam kunjunganPATCH/medical-records/Memperbarui rekam kunjunganDELETE/medical-records/Menghapus rekam kunjungan
9. Contoh Request API
Menambahkan Pasien
POST /patients
{  "fullName": "Andi Pratama",  "dateOfBirth": "2002-05-12",  "gender": "male",  "address": "Semarang",  "phone": "081234567890",  "email": "andi@example.com"}
Menambahkan Departemen
POST /departments
{  "name": "Poli Umum",  "description": "Pelayanan kesehatan umum"}
Menambahkan Dokter
POST /doctors
{  "fullName": "dr. Budi Santoso",  "specialization": "Dokter Umum",  "email": "budi@example.com",  "phone": "081234567891",  "licenseNumber": "SIP123456",  "departmentId": "UUID-DEPARTEMEN"}
Membuat Janji Temu
POST /appointments
{  "patientId": "UUID-PASIEN",  "doctorId": "UUID-DOKTER",  "appointmentDate": "2026-12-15T09:00:00",  "reason": "Pemeriksaan rutin"}
Mengubah Status Janji Temu
PATCH /appointments/:id/status
{  "status": "confirmed"}
Menambahkan Rekam Kunjungan
POST /medical-records
{  "appointmentId": "UUID-JANJI-TEMU",  "visitDate": "2026-12-15T09:00:00",  "complaint": "Demam dan batuk",  "examination": "Pemeriksaan umum",  "notes": "Catatan kunjungan pasien"}
10. Validasi dan Penanganan Error
Aplikasi menggunakan ValidationPipe dari NestJS dengan konfigurasi:
whitelist: Menghapus properti yang tidak memiliki decorator validasi.
forbidNonWhitelisted: Menolak request yang memiliki properti tidak dikenal.
transform: Mengubah data request sesuai tipe DTO.
Pesan validasi menggunakan bahasa Indonesia.
Penanganan error menggunakan HTTP Exception dari NestJS, seperti:
Status CodeKeterangan200Permintaan berhasil201Data berhasil dibuat400Data atau permintaan tidak valid404Data tidak ditemukan409Terjadi konflik data500Kesalahan server
11. Aturan Bisnis
Beberapa aturan bisnis yang diterapkan:
Setiap dokter harus terhubung dengan satu departemen.
Setiap janji temu harus memiliki pasien dan dokter yang valid.
Janji temu hanya dapat dibuat dengan dokter yang aktif.
Tanggal janji temu harus lebih dari waktu sekarang.
Janji temu yang sudah selesai atau dibatalkan tidak dapat diubah kembali melalui endpoint perubahan status.
Satu janji temu hanya dapat memiliki satu rekam kunjungan.
Janji temu yang dibatalkan tidak dapat memiliki rekam kunjungan.
Ketika rekam kunjungan dibuat, status janji temu otomatis berubah menjadi completed.
Data pasien, dokter, departemen, dan janji temu menggunakan mekanisme soft delete.
Data rekam kunjungan tidak menggunakan soft delete.
12. Catatan
Data pasien yang digunakan untuk pengujian merupakan data fiktif.
Aplikasi berfokus pada administrasi klinik.
Aplikasi tidak mencakup diagnosis klinis, resep elektronik, maupun integrasi layanan medis.
Konfigurasi synchronize hanya digunakan untuk pengembangan. Untuk production, gunakan migration TypeORM.
Pastikan database PostgreSQL sudah berjalan sebelum menjalankan aplikasi.
Clinic Management Backend
Built with NestJS, TypeScript, TypeORM, and PostgreSQL.
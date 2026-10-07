# Spesifikasi Arsitektur dan Kebutuhan Teknis: ActaFlow

## Teknologi yang Digunakan (Tech Stack)

* **Frontend:** Next.js + React + TypeScript + Tailwind CSS + Shadcn UI
* **Backend:** FastAPI + Python + Pydantic (Untuk validasi data dan auto-dokumentasi)
* **Database Relasional:** MySQL
* **ORM / Query Builder:** SQLAlchemy + Alembic (untuk migrasi database)
* **Object Storage:** MinIO (S3-compatible) untuk penyimpanan dokumen PDF dan struk bukti fisik
* **Cache / Message Broker:** Redis (opsional di versi awal, disiapkan untuk antrean tugas)
* **API Style:** REST API
* **Infrastruktur:** Docker Compose untuk menjalankan MySQL, MinIO, dan Redis secara lokal
* **Konfigurasi Lingkungan:** `.env.example` untuk `DATABASE_URL`, kredensial MinIO, dan `SECRET_KEY`

## Aturan Penulisan Kode (Code Rules)

* Hindari komentar berlebih; gunakan penamaan fungsi dan variabel yang deskriptif.
* Gunakan `PascalCase` untuk penamaan komponen React, Class Python, Model Database, dan skema Pydantic (DTO).
* Gunakan `camelCase` untuk variabel lokal dan nama *file* di Frontend.
* Gunakan `snake_case` untuk variabel lokal dan fungsi di Backend (sesuai standar PEP 8).
* Jaga panjang baris kode agar tidak melebihi 150 karakter jika memungkinkan.
* Gunakan struktur folder yang modular berbasis fitur/domain.

---

## Entitas Utama (Main Entities)

### 1. User
* `Id` (UUID)
* `Name`
* `Email`
* `PasswordHash`
* `Division` (Nama Divisi/Departemen)
* `CreatedAt`

### 2. Proposal (Dokumen Utama)
* `Id` (UUID)
* `AuthorId` (FK -> User)
* `Title`
* `Description`
* `EventStartDate`
* `EventEndDate`
* `Room` (Enum / Option: `RUANGAN_1`, `RUANGAN_2`, `LAINNYA`)
* `Status` (DRAFT, PRE_CHECK, PENDING, APPROVED, REJECTED, ARCHIVED)
* `DocumentUrl` (Tautan file PDF dari MinIO)
* `CreatedAt`
* `UpdatedAt`

### 3. ApprovalLog (Riwayat Persetujuan)
* `Id` (UUID)
* `ProposalId` (FK -> Proposal)
* `ReviewerId` (FK -> User)
* `Action` (APPROVE, REVISE, REJECT)
* `Notes`
* `CreatedAt`

---

## Aturan Basis Data (Database Rules)

* Siklus hidup `Proposal` diatur secara ketat melalui mesin transisi (*State Machine*): Dokumen tidak bisa lompat dari `DRAFT` langsung ke `APPROVED`.
* Catatan pada `ApprovalLog` bersifat *append-only* (tidak boleh dihapus atau diubah setelah di-submit) untuk keperluan jejak audit.
* Berkas PDF dan gambar tidak disimpan di basis data MySQL, melainkan di MinIO. Basis data hanya menyimpan URL atau *Object Key*.
* Gunakan Alembic untuk melacak migrasi dan sertakan data *seed* berupa 1 akun Pembina, 1 akun Pengurus, dan beberapa proposal draf/arsip sebagai contoh.

---

## Fitur Backend (Backend Features)

1. **Autentikasi & RBAC:** Menggunakan JWT. Memvalidasi otorisasi lintas peran (contoh: PANITIA hanya dapat mengedit dokumen miliknya sendiri yang berstatus DRAFT atau REVISE).
2. **CRUD Manajemen Dokumen:** API untuk unggah dokumen (terintegrasi dengan MinIO) dan pencatatan Draf awal sebelum diajukan.
3. **Automated Compliance Scoring:** Saat status berubah dari `DRAFT` ke `PRE_CHECK`, API menghitung kelayakan berdasarkan H-N kegiatan dan validitas anggaran. Jika skor < 75, status otomatis kembali ke `REVISE`.
4. **Hierarchical Approval:** Pemrosesan persetujuan bertingkat dengan validasi urutan eskalasi (misal: harus disetujui Pengurus sebelum masuk ke Pembina).
5. **Dual-Ledger Budget Tracker:** Endpoint pencatatan pengeluaran riil (`ActualAmount`) dan unggah bukti transaksi (`ReceiptUrl`) setelah kegiatan selesai.
6. **Conflict Detector:** Endpoint API kalender yang mengembalikan daftar proposal lain dengan tanggal kegiatan yang saling beririsan.

---

## Halaman Frontend (Frontend Pages)

1. **Dashboard Utama:** Menampilkan *Summary Cards* (Total Proposal, Dokumen Menunggu, Anggaran Terserap) dan Tabel *Recent Activities*. Tampilan menyesuaikan peran (*Role*) pengguna.
2. **Pengajuan Proposal:** Formulir berlapis (*Wizard*) untuk informasi acara, unggah PDF, rancangan RAB, dan indikator *Real-time Scoring* sebelum submit.
3. **Pipeline Persetujuan:** Halaman manajemen dokumen bergaya Kanban/List view yang dikelompokkan berdasarkan tahap persetujuan.
4. **Dual-Ledger Dashboard (LPJ Mode):** Tabel komparasi RAB vs Realisasi secara *side-by-side*, dilengkapi fungsi pelampiran foto struk.
5. **Kalender Organisasi:** Tampilan kalender interaktif dengan *auto-highlight* merah untuk peringatan jadwal yang bertabrakan.

## Kebutuhan UI (UI Requirements)

* Gunakan Bahasa Indonesia baku dan profesional pada seluruh *copywriting* antarmuka.
* Gunakan tabel simpel, *cards*, formulir, dialog konfirmasi sebelum penghapusan, dan *empty states*.
* Skema warna *Badge Status*:
  * **Draft:** Abu-abu (*Gray*)
  * **Pending:** Kuning/Oranye (*Yellow/Orange*)
  * **Approved:** Hijau (*Green*)
  * **Revise / Rejected:** Merah (*Red*)
  * **Archived:** Biru (*Blue*)

---

## Rute API Esensial

* `POST /api/v1/auth/login`
* `GET /api/v1/users/me`
* `GET /api/v1/proposals`
* `POST /api/v1/proposals`
* `GET /api/v1/proposals/{id}`
* `PUT /api/v1/proposals/{id}`
* `POST /api/v1/proposals/{id}/upload-document`
* `POST /api/v1/proposals/{id}/submit`
* `POST /api/v1/proposals/{id}/review`
* `GET /api/v1/proposals/{id}/ledger`
* `POST /api/v1/proposals/{id}/ledger`
* `PUT /api/v1/ledger/{ledger_id}/receipt`
* `GET /api/v1/calendar/conflicts`
* `GET /api/v1/dashboard/summary`

---

## Struktur Direktori Proyek

```text
actaflow/
├── client/                 # Next.js Frontend Workspace
│   ├── src/
│   │   ├── components/     # UI Shadcn & Shared Components
│   │   ├── hooks/          # React Query / SWR hooks
│   │   ├── lib/            # Utility functions & API clients
│   │   ├── app/            # App Router pages
│   │   └── types/          # Generated TS types dari OpenAPI
│   └── package.json
│
├── server/                 # FastAPI Backend Workspace
│   ├── app/
│   │   ├── api/            # API Routers & Endpoints
│   │   ├── core/           # Config, Security, Database session
│   │   ├── models/         # SQLAlchemy DB Models (MySQL)
│   │   ├── schemas/        # Pydantic DTOs
│   │   └── services/       # Bussiness Logic 
│   ├── alembic/            # Database Migrations
│   ├── requirements.txt
│   └── main.py
│
├── .env.example
├── docker-compose.yml      # Berisi service MySQL, MinIO, dan Redis
└── README.md

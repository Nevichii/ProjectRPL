# ActaFlow - Platform Tata Kelola Dokumen & Manajemen Kegiatan Organisasi

ActaFlow adalah platform tata kelola operasional dan dokumen organisasi berbasis web yang memadukan mesin persetujuan bertingkat, sistem pengarsipan terindeks, serta mesin kalkulasi kepatuhan dokumen untuk memastikan seluruh kegiatan organisasi dieksekusi secara tertib administrasi, transparan, dan tepat waktu.

## Tema & Gambaran Umum

"Platform Web Responsif Berbasis *Workflow State-Machine* untuk Otomatisasi Persetujuan Dokumen dan Pengukuran Kelayakan Proposal Kegiatan Organisasi"

Projek ini dikembangkan sebagai solusi praktis atas permasalahan inefisiensi birokrasi dan "document black hole" di dalam organisasi kemahasiswaan/kampus. Aplikasi ini difokuskan pada fitur-fitur inti (*core features*) tata kelola administratif yang realistis untuk diselesaikan dalam durasi pengembangan tahap awal.

## Deskripsi Masalah

* **Masalah Utama:** Pengelolaan program kerja dan birokrasi organisasi sering kali menghadapi inefisiensi sistemik di mana pengaju proposal kehilangan visibilitas terhadap posisi dokumen mereka, serta terjadinya krisis penyusunan LPJ akibat ambiguitas data keuangan dan bukti fisik.
* **Dampak:** Terjadinya "document black hole" (dokumen tersendat tanpa kejelasan status), siklus revisi yang berulang-ulang hanya karena kesalahan format dasar, dan hilangnya preseden data masa lalu (*knowledge loss*) saat terjadi pergantian kepengurusan.

## Profil Target Pengguna

* **Pengguna Utama:** Pengurus Organisasi (Himpunan/BEM), Panitia Pelaksana, dan Pembina/Peninjau (Dosen/Rektorat).
* **Kebutuhan:**
  * Melacak status persetujuan proposal secara *real-time*.
  * Mengetahui standar kelayakan dokumen/RAB sebelum diajukan.
  * Mencatat dan mencocokkan RAB dengan realisasi anggaran riil.
  * Menyimpan arsip dokumen (LPJ/Proposal) untuk panduan kepengurusan tahun berikutnya.
* **Karakteristik:** Terbiasa dengan sistem manajemen tugas (*task management*), membutuhkan antarmuka yang bersih untuk mengelola banyak berkas, dan sering memantau progres melalui perangkat *desktop* maupun *mobile*.

## Manfaat Aplikasi

* **Bagi Pengaju (Panitia/Pengurus):** Mendapatkan panduan *checklist* otomatis dan kepastian alur dokumen tanpa harus mencari tahu posisi peninjau secara fisik atau manual melalui grup obrolan.
* **Bagi Peninjau (Pembina/Pimpinan):** Mendapat kepastian bahwa dokumen yang tiba di sistem mereka sudah lolos ambang batas kelayakan dasar (*pre-checked*) secara administratif, sehingga menghemat waktu peninjauan substansi.

## Fitur Inti

| No | Fitur | Deskripsi |
| :--- | :--- | :--- |
| 1 | **Hierarchical Approval Pipeline** | Alur persetujuan bertingkat berbasis *state machine* dengan riwayat pelacakan status dokumen secara seketika (*real-time tracking*). |
| 2 | **Automated Compliance Scoring** | Mesin kalkulasi otomatis yang mengevaluasi kelengkapan proposal (elemen wajib, keseimbangan anggaran, dan jadwal) sebelum diteruskan ke peninjau. |
| 3 | **Dual-Ledger Budget Tracker** | Dasbor pencatatan perbandingan langsung antara Rencana Anggaran Biaya (RAB) yang disetujui dengan pengeluaran lapangan riil. |
| 4 | **Institutional Knowledge Hub** | Ruang pengarsipan tersentralisasi untuk menyimpan dan mencari referensi dokumen (LPJ, proposal) dari periode-periode sebelumnya. |
| 5 | **Conflict Detector Calendar** | Kalender terpadu yang dapat mendeteksi dan memberikan peringatan otomatis jika terdapat bentrokan jadwal (*clashing*) antar kegiatan divisi. |

## Fitur yang Tidak Dikerjakan

Untuk memastikan proyek selesai tepat waktu sesuai tenggat pengembangan, fitur-fitur berikut tidak termasuk dalam cakupan sistem:

* **Integrasi Payment Gateway/Perbankan:** Tidak ada koneksi API langsung ke rekening bank organisasi untuk pencairan dana otomatis (sistem hanya sebatas pencatatan digital / *ledger* manual).
* **Tanda Tangan Digital Tersertifikasi (e-Meterai/Kominfo):** Persetujuan sistem bersifat verifikasi internal berbasis log akun (*Role-Based*), belum menggunakan sertifikasi kriptografi pihak ketiga yang mengikat secara hukum eksternal.
* **Live Collaborative Editing (Seperti Google Docs):** Tidak menyediakan fitur mengetik dokumen secara bersamaan di dalam *browser* (dokumen diunggah ke sistem dalam format final seperti PDF untuk ditinjau).
* **Aplikasi Native (Android/iOS):** Aplikasi dibangun sebagai antarmuka *Web Responsive* (dan direncanakan sebagai PWA), tidak dipublikasikan ke Google Play Store atau Apple App Store.

## Kriteria Aplikasi Dinyatakan Berhasil

Aplikasi ActaFlow dinyatakan selesai dan sukses dikembangkan jika memenuhi kriteria berikut:

### 1. Fungsionalitas Utama (*Core Flow*) Berjalan Smooth
* Pengguna (Panitia) dapat membuat draf pengajuan baru, mengisi parameter kelayakan dokumen, dan mengunggah berkas pendukung.
* Sistem *Scoring Engine* berhasil melakukan kalkulasi otomatis dan menolak/meneruskan dokumen secara tepat berdasarkan ambang batas skor minimum.
* Pengguna dengan hak akses *Reviewer* dapat menyetujui, menolak, atau meminta revisi, dan status tersebut langsung terefleksikan pada dasbor pengaju dokumen.

### 2. Keberhasilan Teknis
* Logika *Role-Based Access Control* (RBAC) berfungsi sempurna (misalnya, akun panitia tidak memiliki izin untuk menyetujui dokumen yang dibuatnya sendiri).
* Semua operasi CRUD (*Create, Read, Update, Delete*) pada manajemen sesi persetujuan dan pengarsipan tersimpan dengan aman tanpa galat di dalam pangkalan data relasional.

### 3. Pengujian Antarmuka (UI/UX)
* Antarmuka pemantauan status alur kerja (*pipeline board*) dan manajemen dokumen dapat beradaptasi dan tetap mudah dibaca baik melalui layar *desktop* (PC/Laptop) maupun perangkat genggam (*smartphone*).

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
* `Role` (PANITIA, PENGURUS, PEMBINA)
* `Division` (Nama Divisi/Departemen)
* `CreatedAt`

### 2. Proposal (Dokumen Utama)
* `Id` (UUID)
* `AuthorId` (FK -> User)
* `Title`
* `Description`
* `EventStartDate`
* `EventEndDate`
* `ComplianceScore` (Integer, 0-100)
* `Status` (DRAFT, PRE_CHECK, PENDING, APPROVED, REJECTED, ARCHIVED)
* `DocumentUrl` (Tautan file dari MinIO)
* `CreatedAt`
* `UpdatedAt`

### 3. ApprovalLog (Riwayat Persetujuan)
* `Id` (UUID)
* `ProposalId` (FK -> Proposal)
* `ReviewerId` (FK -> User)
* `Action` (APPROVE, REVISE, REJECT)
* `Notes`
* `CreatedAt`

### 4. LedgerItem (Anggaran & Realisasi)
* `Id` (UUID)
* `ProposalId` (FK -> Proposal)
* `ItemName`
* `PlannedAmount` (Anggaran RAB awal)
* `ActualAmount` (Pengeluaran riil)
* `ReceiptUrl` (Tautan bukti struk dari MinIO)
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

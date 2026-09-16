# ActaFlow 📄⚡
> **Smart Workflow for Smart Organizations.**

ActaFlow adalah Platform Tata Kelola Operasional & Dokumen Organisasi Terpadu berbasis *Hierarchical Approval Engine* dan *Automated Document Compliance Scoring*. Sistem ini dirancang khusus untuk memotong hambatan birokrasi, mempercepat eksekusi program kerja himpunan mahasiswa, dan memastikan tidak ada lagi arsip atau LPJ yang hilang saat pergantian kepengurusan.

---

## 🚀 Mengapa ActaFlow Dibuat?

Pengelolaan program kerja organisasi sering kali terhambat oleh inefisiensi administratif:
* **"Document Black Hole":** Proposal tertahan tanpa kejelasan status apakah sedang ditinjau, butuh revisi, atau sudah disetujui.
* **Krisis Laporan Keuangan:** Bukti transaksi fisik sering hilang, membuat penyusunan Laporan Pertanggungjawaban (LPJ) menjadi kacau.
* **Format Tidak Standar:** Waktu terbuang hanya untuk mengoreksi kesalahan struktur dasar dokumen.
* **Knowledge Loss:** Hilangnya arsip berharga dari kepengurusan periode sebelumnya.

## ✨ Fitur Utama

* **Hierarchical Approval Pipeline:** Alur persetujuan bertingkat (Divisi -> BPH -> Pembina) dengan riwayat audit transparan.
* **Automated Compliance Scoring:** Mesin otomatis yang menghitung skor kelengkapan proposal sebelum diizinkan masuk ke tahap peninjauan.
* **Dual-Ledger Budget Tracker:** Dasbor pencatatan alokasi RAB yang disandingkan langsung dengan realisasi pengeluaran riil beserta bukti kuitansi digital.
* **Institutional Knowledge Hub:** Gudang arsip tersentralisasi yang memisahkan dokumen berdasarkan tahun periode dan kategori acara.
* **Conflict Detector Calendar:** Kalender organisasi terpadu untuk mencegah tabrakan jadwal antar program kerja.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js (React), Tailwind CSS, Shadcn UI
* **Backend:** FastAPI (Python) / Spring Boot (Java)
* **Database:** PostgreSQL
* **Object Storage:** MinIO / AWS S3 Compatible (Penyimpanan PDF & Gambar)
* **Caching & Queue:** Redis

---

## 📂 Struktur Proyek

```text
actaflow/
├── client/                 # Frontend (Next.js & UI Components)
├── server/                 # Backend API, Scoring Engine, Models
├── docker-compose.yml      # Konfigurasi container lokal
└── README.md

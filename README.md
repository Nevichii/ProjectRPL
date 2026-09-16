# ActaFlow 📄⚡
> **Smart Workflow for Smart Organizations.**

---

## 📌 Daftar Isi

1. [Penjabaran Judul](#1-penjabaran-judul)
2. [Big Picture Permasalahan](#2-big-picture-permasalahan)
3. [Kenapa Mengambil Judul Ini](#3-kenapa-mengambil-judul-ini)
4. [Manfaat Proyek](#4-manfaat-proyek)
   - [Bagi Pengembang (Saya)](#bagi-pengembang-saya)
   - [Bagi Orang Lain (Pengguna & Konsumen)](#bagi-orang-lain-pengguna--konsumen)
5. [Fitur-Fitur Utama Platform](#5-fitur-fitur-utama-platform)
6. [Arsitektur Sistem & Scoring Engine](#6-arsitektur-sistem--scoring-engine)
7. [Teknologi yang Digunakan](#7-teknologi-yang-digunakan)
8. [Struktur Direktori Proyek](#8-struktur-direktori-proyek)
9. [Panduan Instalasi & Menjalankan](#9-panduan-instalasi--menjalankan)
10. [Rencana Pengembangan (Roadmap)](#10-rencana-pengembangan-roadmap)
11. [Kontributor](#11-kontributor)

---

## 1. Penjabaran Judul

**ActaFlow: Platform Manajemen Kegiatan & Tata Kelola Dokumen Organisasi Terpadu Berbasis Hierarchical Approval Engine dan Automated Document Compliance Scoring**

Secara etimologi dan fungsi teknis, judul **ActaFlow** dirumuskan dari dua pilar utama:

* **Acta (Dokumen Resmi & Akuntabilitas Terverifikasi):**
  Berakar dari bahasa Latin *acta* (catatan resmi, risalah, ketetapan hukum, atau akta dokumentasi). Pilar ini merefleksikan sentralitas dokumen formal dalam entitas organisasi—seperti proposal program kerja, Rencana Anggaran Biaya (RAB), lembar pengesahan bertingkat, hingga Laporan Pertanggungjawaban (LPJ). Setiap berkas tidak diperlakukan sekadar sebagai tumpukan teks pasif, melainkan rekaman legal yang memiliki riwayat integritas, standarisasi isi, dan akuntabilitas institusional.
* **Flow (Aliran Proses & Eksekusi Tanpa Friksi):**
  Merepresentasikan otomatisasi alur kerja (*workflow*) yang dinamis, bergerak, dan transparan. *Flow* menghilangkan hambatan birokrasi konvensional: dokumen tidak lagi tersendat di meja peninjau tanpa kejelasan status, melainkan mengalir secara bertahap melalui sistem perutean terpadu—lengkap dengan batas waktu (*SLA*), pelacakan revisi seketika, dan eskalasi persetujuan otomatis.

Secara konseptual, **ActaFlow** adalah platform tata kelola operasional dan dokumen organisasi berbasis web yang memadukan mesin persetujuan bertingkat (*hierarchical workflow state-machine*), sistem pengarsipan terindeks (*institutional knowledge preservation*), serta mesin kalkulasi kepatuhan dokumen (*document compliance scoring*) untuk memastikan seluruh kegiatan organisasi dieksekusi secara tertib administrasi, transparan, dan tepat waktu.

---

## 2. Big Picture Permasalahan

Pengelolaan program kerja dan birokrasi organisasi sering kali menghadapi inefisiensi sistemik:

* **"Document Black Hole" (Status Persetujuan Tidak Transparan):** Pengaju proposal kerap kehilangan visibilitas terhadap posisi dokumen mereka. Berkas fisik atau pesan obrolan sering tenggelam di antara rantai peninjauan tanpa indikasi jelas.
* **Krisis Penyusunan LPJ & Ambiguitas Keuangan:** Penyusunan Laporan Pertanggungjawaban (LPJ) sering menjadi momok di akhir kegiatan karena bukti transaksi fisik hilang dan realisasi anggaran melenceng.
* **Format Dokumen Tidak Standar & Siklus Revisi:** Proposal ditolak berulang kali hanya karena kesalahan administratif dasar yang membuang waktu peninjau.
* **Hilangnya Preseden (*Knowledge Loss*):** Siklus pergantian kepengurusan mengakibatkan data masa lalu terputus, memaksa panitia baru memulai perencanaan dari nol.

---

## 3. Kenapa Mengambil Judul Ini

* **Menjawab Titik Temu Birokrasi dan Kecepatan:** *ActaFlow* memosisikan diri tepat di tengah: mempertahankan disiplin tata kelola (*Acta*) sembari menjamin kelincahan kolaborasi (*Flow*).
* **Beyond Cloud Storage:** Judul ini menegaskan bahwa sistem memiliki peran aktif melalui *engine* yang memeriksa kelengkapan, menghitung kelayakan dokumen, dan memandu pengguna, bukan sekadar ruang penyimpanan pasif.

---

## 4. Manfaat Proyek

### Bagi Pengembang (Saya)
* Mengimplementasikan logika *Finite State Machine* (FSM) pada siklus persetujuan.
* Merancang skema *Role-Based Access Control* (RBAC) pada *database* PostgreSQL.
* Mengasah pengembangan UI/UX agar sistem mudah dioperasikan oleh sesama mahasiswa.

### Bagi Orang Lain (Pengguna & Konsumen)
* **Panitia Pelaksana:** Panduan checklist otomatis sebelum submit & alur jelas.
* **Pengurus Harian:** Dasbor pemantauan kesehatan organisasi dan manajemen dokumen efisien.
* **Pembina/Peninjau:** Kepastian bahwa dokumen yang tiba sudah memenuhi kelayakan dasar administratif.

---

## 5. Fitur-Fitur Utama Platform

* **Hierarchical Approval Pipeline:** Alur persetujuan bertingkat dengan riwayat audit.
* **Automated Compliance Scoring:** Mesin otomatis yang menghitung skor kelengkapan proposal.
* **Dual-Ledger Budget Tracker:** Dasbor pencatatan alokasi RAB bersanding dengan realisasi riil dan struk digital.
* **Institutional Knowledge Hub:** Gudang arsip tersentralisasi lintas-periode.
* **Conflict Detector Calendar:** Kalender terpadu pencegah tabrakan jadwal antar divisi.

---

## 6. Arsitektur Sistem & Scoring Engine

Aplikasi ini menggunakan siklus hidup dokumen berbasis *State Machine* (DRAFT -> PRE_CHECK -> PENDING -> APPROVED -> ARCHIVED). 

**Document Compliance Scoring Engine** 
Sebelum diajukan, proposal dievaluasi menggunakan pembobotan dengan kriteria:
* Kelengkapan Elemen Wajib (Bobot 35%)
* Integritas & Keseimbangan Anggaran (Bobot 30%)
* Kepatuhan Jadwal / H-N (Bobot 20%)
* Administrasi Pendukung (Bobot 15%)
*(Threshold Minimum: Skor 75 dari 100 untuk bisa diteruskan ke tahap peninjauan).*

---

## 7. Teknologi yang Digunakan

* **Frontend:** Next.js (React), Tailwind CSS, Shadcn UI
* **Backend:** FastAPI (Python) atau Spring Boot (Java)
* **Database:** PostgreSQL
* **Storage:** MinIO / AWS S3 Compatible (Penyimpanan Dokumen)
* **Cache:** Redis

---

## 8. Struktur Direktori Proyek

```text
actaflow/
├── client/                 # Frontend (Next.js, UI Components, Pages)
├── server/                 # Backend (API, Scoring Engine, Models)

## 11. Kontributor

Proyek ini dirancang dan dikembangkan oleh:

* **Nevichi** — Pengembang Utama ([@nevichi](https://github.com/nevichi))
├── docker-compose.yml      # Infrastruktur lokal (DB, Redis, MinIO)
└── README.md

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
| 2 | **Institutional Knowledge Hub** | Ruang pengarsipan tersentralisasi untuk menyimpan dan mencari referensi dokumen (LPJ, proposal) dari periode-periode sebelumnya. |
| 3 | **Conflict Detector Calendar** | Kalender terpadu yang mendeteksi dan memberikan peringatan otomatis jika terdapat bentrokan jadwal maupun penggunaan ruangan (Audi 1, Audi 2, lainnya) antar kegiatan divisi. |

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



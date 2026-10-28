

# Checklist Fitur MVP & Status Pengujian (ActaFlow)

Dokumen ini mencatat seluruh cakupan fitur inti (*Core Features*) Minimum Viable Product (MVP) pada aplikasi ActaFlow beserta status pengujian fungsional dan unit test.

## Tabel Status Fitur MVP

| No | Modul / Fitur Inti | Deskripsi Pengujian | Status |
| :--- | :--- | :--- | :--- |
| 1 | **Autentikasi & RBAC** | Verifikasi login akun berbasis peran (*Role*) antara Himpunan (IT/SI) dan Kemahasiswaan melalui penyimpanan sesi lokal (*localStorage*) dan database MySQL. | ✅ **PASSED** |
| 2 | **Manajemen Draf & Pengajuan** | Pengujian tombol *"Simpan sebagai Draft"* (bersifat privat) dan kemampuan pengaju untuk memeriksa kembali serta menekan tombol *"Kirim"* untuk mengubah status menjadi *Pending*. | ✅ **PASSED** |
| 3 | **Hierarchical Approval Pipeline** | Pengujian alur peninjauan eksklusif oleh akun Kemahasiswaan terhadap proposal berstatus *Pending* dengan opsi aksi **Setujui (Approved)**, **Revisi (Revise)**, atau **Tolak (Rejected)**. | ✅ **PASSED** |
| 4 | **File Storage & Direct Viewer** | Pengujian unggah berkas fisik (PDF/DOCX) ke direktori server (`public/uploads/`) serta tautan interaktif pada tabel dasbor untuk membuka dokumen langsung di tab baru *browser*. | ✅ **PASSED** |
| 5 | **Dashboard Monitoring & Filter** | Pengujian fitur penyaringan data multi-kriteria secara *real-time* berdasarkan pencarian teks, status dokumen, lokasi ruangan, dan divisi pengaju. | ✅ **PASSED** |
| 6 | **Penanganan Error & Validasi** | Pengujian penanganan data kosong, input tidak valid, indikator status *loading*, serta penanganan kegagalan koneksi API/Database. | ✅ **PASSED** |

---

## Status Pengujian Unit Test
* **Framework Pengujian:** Jest / Next.js Testing Environment
* **Hasil Pengujian Keseluruhan:** **ALL TESTS PASSED** (100% Berhasil)
* **Catatan Regresi:** Seluruh bug penghambat terkait tabrakan ID primer, sinkronisasi email kreator, dan pembacaan direktori file telah diperbaiki dan diuji ulang (*regression tested*).
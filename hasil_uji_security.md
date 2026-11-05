## Hasil Uji Security dan Catatan Perubahan
### 1.Pengamanan Berbasis Peran
Uji & Hasil: Akses rute API dan tombol aksi dibatasi secara ketat. Akun Himpunan (IT/SI) hanya dapat membuat draf dan mengirim proposal miliknya sendiri, sementara akun Kemahasiswaan memiliki hak eksklusif untuk menyetujui (Approved), merevisi (Revise), atau menolak (Rejected).

### 2.Pencegahan Eksploitasi Data
Uji & Hasil: Query ke database MySQL menggunakan parameter terikat, yang efektif mencegah celah keamanan SQL Injection.

### 3.Validasi Berkas Unggahan
Uji & Hasil: Sistem membatasi ekstensi file yang masuk (hanya .pdf dan .docx) serta menamai ulang file menggunakan stempel waktu (Date.now()) untuk menghindari konflik nama file atau eksekusi skrip berbahaya di sisi server.
# Panduan Menjalankan ActaFlow (How to Run)

Dokumen ini berisi panduan langkah demi langkah untuk menyiapkan dan menjalankan aplikasi **ActaFlow** secara lokal di komputer Anda.

## Prasyarat Sistem
Sebelum menjalankan aplikasi, pastikan perangkat Anda telah terinstal:
* **Node.js** (Versi 18+ atau yang lebih baru)
* **npm** (Manajer paket bawaan Node.js)
* **MySQL / XAMPP** (Untuk pangkalan data relasional)

---

## Langkah-Langkah Instalasi & Eksekusi

### 1. Kloning Repositori atau Buka Folder Proyek
Buka terminal/command prompt pada direktori proyek **ActaFlow**:
```bash
git clone [https://github.com/Nevichii/actaflow.git](https://github.com/Nevichii/actaflow.git)
cd actaflow
```
### 2. Konfigurasi Basis Data 
1. Nyalakan layanan MySQL (melalui XAMPP Control Panel atau layanan lokal).

2. Buat pangkalan data baru dengan nama actaflow_db.

3. Pastikan tabel-tabel utama (users dan proposals) sudah terkonfigurasi dengan skema yang sesuai.

### 3. Menjalankan sisi Client
1. Masuk ke dalam folder client dengan cd client di terminal

2. Install  seluruh dependensi yang diperlukan dengan npm install

3. Jalankan server dengan npm run dev 

4. Buka browser dan akses http://localhost:3000 untukk membuka website di browser
# Doodle Jump Game dengan Backend PHP

Game Doodle Jump sederhana dengan backend PHP untuk menyimpan skor dan menampilkan leaderboard. Proyek ini menggabungkan game HTML5 yang menyenangkan dengan sistem backend untuk melacak dan menampilkan skor tertinggi pemain.

## Fitur

- Game Doodle Jump klasik dengan kontrol keyboard dan sentuh untuk pengalaman bermain yang responsif
- Karakter yang melompat dengan animasi yang halus dan platform yang dihasilkan secara acak
- Sistem penyimpanan skor dengan database MySQL yang aman dan efisien
- Leaderboard real-time untuk menampilkan 10 skor tertinggi
- Antarmuka yang responsif dan kompatibel dengan berbagai perangkat

## Persyaratan

- Server web (Apache/Nginx)
- PHP 7.0 atau lebih tinggi
- MySQL/MariaDB
- Browser web modern dengan dukungan HTML5 dan JavaScript

## Instalasi

1. Clone atau unduh repositori ini ke direktori web server Anda
2. Buat database MySQL baru bernama `doodle_jump`
3. Import file `php/setup_database.sql` ke database Anda:
   ```
   mysql -u username -p doodle_jump < php/setup_database.sql
   ```
4. Edit file `php/db_connect.php` dan sesuaikan parameter koneksi database:
   ```php
   $host = 'localhost'; // Host database Anda
   $dbname = 'doodle_jump'; // Nama database
   $username = 'root'; // Username database
   $password = ''; // Password database
   ```
5. Akses game melalui browser web dengan membuka `index.html`

## Penggunaan

- Gunakan tombol panah kiri/kanan atau tombol di layar untuk menggerakkan karakter
- Karakter akan melompat secara otomatis - fokus pada mendarat di platform
- Hindari jatuh dari layar - game akan berakhir jika karakter jatuh
- Setelah game over, masukkan nama Anda untuk menyimpan skor
- Klik tautan "Leaderboard" untuk melihat skor tertinggi
- Tekan tombol "Play Again" untuk memulai permainan baru

## Struktur File

- `index.html` - Halaman utama game dengan antarmuka pengguna
- `js/game.js` - Kode JavaScript untuk logika dan mekanika game
- `css/style.css` - Stylesheet untuk tampilan dan animasi game
- `php/db_connect.php` - File koneksi database untuk backend
- `php/save_score.php` - API untuk menyimpan skor pemain ke database
- `php/leaderboard.php` - Halaman untuk menampilkan tabel skor tertinggi
- `php/setup_database.sql` - Script SQL untuk membuat struktur database

## Pengembangan Lanjutan

Beberapa ide untuk pengembangan lebih lanjut:

- Menambahkan power-up dan rintangan untuk gameplay yang lebih menarik
- Implementasi sistem level dengan tingkat kesulitan yang meningkat
- Menambahkan efek suara dan musik latar
- Sistem login pengguna untuk melacak statistik pemain

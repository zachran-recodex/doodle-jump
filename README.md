# Doodle Jump Game dengan Backend PHP

Game Doodle Jump sederhana dengan backend PHP untuk menyimpan skor dan menampilkan leaderboard.

## Fitur

- Game Doodle Jump klasik dengan kontrol keyboard dan sentuh
- Sistem penyimpanan skor dengan database MySQL
- Leaderboard untuk menampilkan 10 skor tertinggi

## Persyaratan

- Server web (Apache/Nginx)
- PHP 7.0 atau lebih tinggi
- MySQL/MariaDB

## Instalasi

1. Salin semua file ke direktori web server Anda
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
5. Akses game melalui browser web

## Penggunaan

- Gunakan tombol panah kiri/kanan atau tombol di layar untuk menggerakkan karakter
- Setelah game over, masukkan nama Anda untuk menyimpan skor
- Klik tautan "Leaderboard" untuk melihat skor tertinggi

## Struktur File

- `index.html` - Halaman utama game
- `js/game.js` - Kode JavaScript untuk game
- `css/style.css` - Stylesheet untuk game
- `php/db_connect.php` - File koneksi database
- `php/save_score.php` - API untuk menyimpan skor
- `php/leaderboard.php` - Halaman leaderboard
- `php/setup_database.sql` - Script SQL untuk membuat database
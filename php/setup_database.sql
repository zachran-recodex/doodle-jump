-- Create database if not exists
CREATE DATABASE IF NOT EXISTS doodle_jump;

-- Use the database
USE doodle_jump;

-- Create scores table
CREATE TABLE IF NOT EXISTS scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(50) NOT NULL,
    score INT NOT NULL,
    date_created DATETIME NOT NULL
);

-- Add index for faster queries
CREATE INDEX idx_score ON scores(score DESC);
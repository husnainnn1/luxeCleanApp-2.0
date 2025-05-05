CREATE DATABASE IF NOT EXISTS luxeCleanDB;
USE luxeCleanDB;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,    -- Unique identifier for each user
    username VARCHAR(50) NOT NULL UNIQUE, -- Username must be unique and not null
    password VARCHAR(255) NOT NULL,       -- Password (hashed), cannot be null
    firstname VARCHAR(255) NOT NULL,      -- First name, cannot be null
    lastname VARCHAR(255) NOT NULL,       -- Last name, cannot be null
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Last updated timestamp
);

ALTER TABLE Users 
ADD COLUMN createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price VARCHAR(20) NOT NULL
);
ALTER TABLE services ADD COLUMN category VARCHAR(100) NOT NULL;

# Create the app user
CREATE USER IF NOT EXISTS 'luxecleanUser'@'localhost' IDENTIFIED BY 'Abdulhadi123'; 
GRANT ALL PRIVILEGES ON luxeCleanDB.* TO 'luxecleanUser'@'localhost';

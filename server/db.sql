-- Create the database
CREATE DATABASE IF NOT EXISTS ecampus;

-- Use the database
USE ecampus;

CREATE TABLE student_login_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  rollno VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE faculty_login_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL
);

ALTER TABLE student_login_details MODIFY COLUMN `name` VARCHAR(255) NULL DEFAULT NULL;







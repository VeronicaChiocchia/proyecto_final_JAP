CREATE DATABASE IF NOT EXISTS ecommerce_JAP;

USE ecommerce_JAP;


-- CREATE TABLE json_data (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     data JSON
-- );



-- Crear tabla con columnas específicas (si es necesario)
CREATE TABLE IF NOT EXISTS cart (
    -- id INT AUTO_INCREMENT PRIMARY KEY,
    pruductId INT,
    name VARCHAR(100) NOT NULL,
    -- description VARCHAR(100) NOT NULL,
    productCount INT,
    -- imgSrc VARCHAR(100),
    totalPrice INT
);
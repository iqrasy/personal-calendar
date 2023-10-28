CREATE DATABASE calendar;

CREATE TABLE events (
    id VARCHAR(255) PRIMARY KEY,
    date VARCHAR(300),
    user_email VARCHAR(255),
    title VARCHAR(30),
);

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);
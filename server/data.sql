CREATE DATABASE calendar;

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    start_datetime TIMESTAMPTZ NOT NULL,
    end_datetime TIMESTAMPTZ NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    location VARCHAR(100),
    repeat_id INT REFERENCES repeat_options(id),
    category_id INT REFERENCES categories(id),
    user_id INT REFERENCES users(id)
);


CREATE TABLE repeat_options (
    id SERIAL PRIMARY KEY,
    option_name VARCHAR(50) NOT NULL
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

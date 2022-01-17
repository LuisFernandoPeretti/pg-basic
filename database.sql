CREATE DATABASE pgregister;

--\c into pgregister database

CREATE TABLE register(
    email VARCHAR PRIMARY KEY,
    name VARCHAR(255),
)
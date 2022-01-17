CREATE DATABASE pgRegister;

CREATE TABLE register(
    email VARCHAR(255) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    cpf BIGINT NOT NULL,
    birth_date DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_changetimestamp_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now(); 
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_register_changetimestamp BEFORE UPDATE
    ON register FOR EACH ROW EXECUTE PROCEDURE 
    update_changetimestamp_column();